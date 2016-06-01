/*
 * This file is part of the Symfony CMF package.
 *
 * (c) 2011-2015 Symfony CMF
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Map from 'core-js/es6/map'
import '../jquery.cmf_context_menu'
import 'fancytree/jquery.fancytree.js'
import 'fancytree/skin-win8/ui.fancytree.css'
import '../../css/fontawesome-style.css'

var cache = new Map();

function getPropertyFromString(propertyPath, list) {
    var isOptional = propertyPath.substr(0, 1) === '?';
    var props = propertyPath.substr(1).split('.');
    var currentNode = list;
    for (let prop in props) {
        currentNode = currentNode[props[prop]];

        if (undefined === currentNode) {
            if (isOptional) {
                break;
            }

            throw 'Attribute "' + props[prop] + '" does not exists';
        }
    }

    return currentNode;
}

/**
 * A tree browser adapter for the Fancytree library.
 *
 * @author Wouter J <wouter@wouterj.nl>
 * @see https://github.com/mar10/fancytree
 */
export class FancytreeAdapter {
    constructor(options) {
        if (!window.jQuery || !jQuery.fn.fancytree) {
            throw 'The FancytreeAdapter requires both jQuery and the FancyTree library.';
        }

        if (!options.request) {
            throw 'The FancytreeAdapter requires a request option.';
        }

        this.requestData = options.request;
        this.rootNode = options.root_node || '/';
        this.useCache = undefined === options.use_cache ? true : options.use_cache;

        // available actions (array)
        this.actions = new Array();
        // the Fancytree instance (FancytreeTree)
        this.tree = null;
        // the tree element (jQuery)
        this.$tree = null;
    }

    bindToElement($elem) {
        if (this.$tree) {
            throw 'Cannot bind to multiple elements.';
        }

        if (!$elem instanceof jQuery) {
            throw  'FancytreeAdapter can only be adapted to a jQuery object.';
        }

        this.$tree = $elem;
        var actions = this.actions;
        var requestNode = this.requestNode;
        var requestNodeToFancytreeNode = function (requestNode) {
            if (requestNode.length === 0) {
                return;
            }

            var fancytreeNode = {
                title: requestNode.label,
                key: requestNode.node_name,
                children: [],
                actions: {}
            };

            for (let actionName in actions) {
                var action = actions[actionName];
                var url = action.url;
                if (typeof action.url == 'object' && action.url.hasOwnProperty('data')) {
                    url = getPropertyFromString(action.url.data, requestNode);
                }

                if (url === undefined) {
                    continue;
                }
                fancytreeNode['actions'][actionName] = { label: actionName, iconClass: action.icon, url: url };
            }

            var childrenCount = 0;
            for (name in requestNode.children) {
                if (!requestNode.children.hasOwnProperty(name)) {
                    continue;
                }

                var child = requestNodeToFancytreeNode(requestNode.children[name]);
                if (child) {
                    fancytreeNode.children.push(child);
                }
                childrenCount++;
            }

            if (childrenCount) {
                fancytreeNode.folder = true;
                fancytreeNode.lazy = true;
            }

            return fancytreeNode;
        };

        var requestData = this.requestData;
        var useCache = this.useCache;
        this.$tree.fancytree({
            // the start data (root node + children)
            source: (useCache && cache.has(this.rootNode)) ? cache.get(this.rootNode) : requestData.load(this.rootNode),

            // lazy load the children when a node is collapsed
            lazyLoad: function (event, data) {
                var path = data.node.getKeyPath();
                if (useCache && cache.has(path)) {
                    data.result = cache.get(path);
                } else {
                    var loadData = requestData.load(path);

                    if (Array.isArray(loadData)) {
                        data.result = loadData;
                    } else {
                        data.result = jQuery.extend({
                            data: {}
                        }, loadData);
                    }
                }
            },

            // transform the JSON response into a data structure that's supported by FancyTree
            postProcess: function (event, data) {
                if (null == data.error) {
                    data.result = requestNodeToFancytreeNode(data.response).children;
                    if (data.result.length == 1) {
                        data.result[0].expanded = true;
                    }

                    if (useCache) {
                        cache.set(data.node.getKeyPath(), data.result);
                    }
                } else {
                    data.result = {
                        // todo: maybe use a more admin friendly error message in prod?
                        error: 'An error occured while retrieving the nodes: ' + data.error
                    };
                }
            },

            // always show the active node
            activeVisible: true
        });

        if (this.actions) {
            this.$tree.cmfContextMenu({
                delegate: 'span.fancytree-title',
                wrapperTemplate: '<ul class="dropdown-menu" style="display:block;"></ul>',
                actionTemplate: '<li role="presentation"><a role="menuitem" href="{{ url }}"><i class="{{ iconClass }}"></i> {{ label }}</li>',
                actions: function ($node) {
                    return jQuery.ui.fancytree.getNode($node).data.actions;
                }
            });
        }

        this.tree = this.$tree.fancytree('getTree');
    }

    bindToInput($input) {
        // output active node to input field
        this.$tree.fancytree('option', 'activate', function(event, data) {
            $input.val(data.node.getKeyPath());
        });

        var tree = this.tree;
        var showKey = function (key) {
            tree.loadKeyPath(key, function (node, status) {
                if ('ok' == status) {
                    node.setExpanded();
                    node.setActive();
                }
            });
        };

        // use initial input value as active node
        this.$tree.bind('fancytreeinit', function (event, data) {
            showKey($input.val());
        });

        // change active node when the value of the input field changed
        $input.on('change', function (e) {
            showKey($(this).val());
        });
    }

    addAction(name, url, icon) {
        this.actions[name] = { url: url, icon: icon };
    }

    static _resetCache() {
        cache.clear();
    }
}
