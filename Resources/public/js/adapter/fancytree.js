/**
 * A tree browser adapter for the Fancytree library.
 *
 * @author Wouter J <wouter@wouterj.nl>
 * @see https://github.com/mar10/fancytree
 */
var FancytreeAdapter = function (dataUrl) {
    if (!window.jQuery || !jQuery.fn.fancytree) {
        throw 'The FancytreeAdapter requires both jQuery and the FancyTree library.';
    }

    var requestNodeToFancytreeNode = function (requestNode) {
        var fancytreeNode = {
            // fixme: remove ugly replacing by just not putting stuff like this in the JSON response
            title: requestNode.data.replace(' (not editable)', ''),
            // fixme: also put the current node name in the JSON response, not just the complete path
            key: requestNode.attr.id.match(/\/([^\/]+)$/)[1]
        };
        
        // fixme: have more descriptive JSON keys to determine if it has children
        if (null != requestNode.state) {
            fancytreeNode.folder = true;
        }

        if ('closed' == requestNode.state) {
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
                source: { url: dataUrl },

                // lazy load the children when a node is collapsed
                lazyLoad: function (event, data) {
                    data.result = {
                        url: dataUrl,
                        data: { root: data.node.getKeyPath() }
                    };
                },

                // transform the JSON response into a data structure that's supported by FancyTree
                postProcess: function (event, data) {
                    if (null == data.error) {
                        data.result = []

                        data.response.forEach(function (node) {
                            var sourceNode = requestNodeToFancytreeNode(node);

                            if (node.children) {
                                sourceNode.children = [];

                                node.children.forEach(function (leaf) {
                                    sourceNode.children.push(requestNodeToFancytreeNode(leaf));
                                });
                            }

                            data.result.push(sourceNode);
                        });
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

            tree = $tree.fancytree('getTree');
        },

        bindToInput: function ($input) {
            // output active node to input field
            $tree.fancytree('option', 'activate', function(event, data) {
                $input.val(data.node.getKeyPath());
            });

            // change active node when the value of the input field changed
            var tree = this.tree;
            $input.on('change', function (e) {
                tree.loadKeyPath($(this).val(), function (node, status) {
                    if ('ok' == status) {
                        node.setExpanded();
                        node.setActive();
                    }
                });
            });
        }
    };
};
