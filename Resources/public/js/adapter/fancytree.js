/**
 * A tree browser adapter for the Fancytree library.
 *
 * @author Wouter J <wouter@wouterj.nl>
 * @see https://github.com/mar10/fancytree
 */
var FancytreeAdapter = function (requestData) {
    if (!window.jQuery || !jQuery.fn.fancytree) {
        throw 'The FancytreeAdapter requires both jQuery and the FancyTree library.';
    }

    var actions = {};
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

        for (actionName in actions) {
            if (!actions.hasOwnProperty(actionName)) {
                continue;
            }

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
    // FancyTree instance
    var tree;
    // jQuery instance of the tree output element
    var $tree;

    return {
        bindToElement: function ($elem) {
            if (!$elem instanceof jQuery) {
                throw  'FancytreeAdapter can only be adapted to a jQuery object.';
            }

            $tree = $elem;

            $tree.fancytree({
                // the start data (root node + children)
                source: requestData.load('/'),

                // lazy load the children when a node is collapsed
                lazyLoad: function (event, data) {
                    data.result = jQuery.extend({
                        data: {}
                    }, requestData.load(data.node.getKeyPath()));
                },

                // transform the JSON response into a data structure that's supported by FancyTree
                postProcess: function (event, data) {
                    if (null == data.error) {
                        data.result = requestNodeToFancytreeNode(data.response).children;
                        if (data.result.length == 1) {
                            data.result[0].expanded = true;
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

            if (actions) {
                $tree.cmfContextMenu({
                    delegate: 'span.fancytree-title',
                    wrapperTemplate: '<ul class="dropdown-menu" style="display:block;"></ul>',
                    actionTemplate: '<li role="presentation"><a role="menuitem" href="{{ url }}"><i class="{{ iconClass }}"></i> {{ label }}</li>',
                    actions: function ($node) {
                        return jQuery.ui.fancytree.getNode($node).data.actions;
                    }
                });
            }

            tree = $tree.fancytree('getTree');
        },

        bindToInput: function ($input) {
            // output active node to input field
            $tree.fancytree('option', 'activate', function(event, data) {
                $input.val(data.node.getKeyPath());
            });

            var showKey = function (key) {
                tree.loadKeyPath(key, function (node, status) {
                    if ('ok' == status) {
                        node.setExpanded();
                        node.setActive();
                    }
                });
            };

            // use initial input value as active node
            $tree.bind('fancytreeinit', function (event, data) {
                showKey($input.val());
            });

            // change active node when the value of the input field changed
            $input.on('change', function (e) {
                showKey($(this).val());
            });
        },

        addAction: function (name, url, icon) {
            actions[name] = { url: url, icon: icon };
        }
    };
};

function getPropertyFromString(propertyPath, list) {
    var isOptional = propertyPath.substr(0, 1) === '?';
    var props = propertyPath.substr(1).split('.');
    var currentNode = list;
    for (prop in props) {
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
