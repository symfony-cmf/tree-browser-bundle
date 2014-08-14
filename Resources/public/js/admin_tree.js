/**
 * define a tree used to see all content, move nodes and select things to edit
 */
var AdminTree = (function () {

    'use strict';

    var my = {};

    var generateDialog = function (url, closeCallback) {
        // iframe is needed because the delivered form might need some additional JS
        var treeDialog = jQuery("<iframe id='tree_dialog'></iframe>");
        treeDialog.attr('src', url);
        treeDialog.css('min-width', '100%');// we set the min-width because the treeDialog plugin overrides the width set

        jQuery(document.body).append(treeDialog);

        treeDialog.dialog({
            width:     800,
            height:     500,
            modal:     true,
            autoOpen:  true,
            resizable: true,
            zIndex:    9999,
            close:     function (e, ui) {
                if (closeCallback) {
                    closeCallback(e, ui);
                }
            }
        });

        return treeDialog;
    };

    my.generateTreeStateArray = function (path) {

        var curItem;
        var curSegment = '';
        var segments   = [];
        var start      = 1;
        var pos        = path.indexOf('/', start);

        while (pos > 0) {
            curItem = path.substr(start, pos - start);
            if ('' !== curItem) {
                curSegment = curSegment + '/' + curItem;

                segments.push(curSegment);
            }

            start = pos + 1;
            pos = path.indexOf('/', start);
        }

        curItem = path.substr(start);

        if ('' !== curItem) {
            curSegment = curSegment + '/' + curItem;

            segments.push(curSegment);
        }

        return segments;
    };

    my.initTree = function (config) {
        jQuery.extend({
            rootNode:         '/',
            selected:         null, // will be set to the rootNode by default
        }, config);

        if (!config.hasOwnProperty('selected')) {
            config.selected = config.rootNode;
        }

        var treeInst = jQuery(config.selector).jstree({
            "plugins": ["dnd", "themes"],
            "core": {
                "check_callback": true,
                "themes": {
                    name: "default",
                    url: true
                },
                "data": {
                    "url": config.ajax.children_url,
                    "data": function(node) {
                        return {
                            root: node.id !== '#' ? node.id : config.rootNode
                        };
                    }
                },
                "dnd" : {
                    "copy": false
                }
            }
        });
        /*
        var treeInst = jQuery(config.selector).jstree({
            "core": {
                "initially_load": config.path.expanded,
                "initially_open": config.path.preloaded,
                "data": {
                    "url": config.ajax.children_url,
                    "data": function (node) {
                        console.dir(node);
                        return {
                            id: node.id,
                            root: node.id !== '#' ? node.id : config.rootNode,
                            text: 'foo'
                        };
                    }
                }
            },
            "plugins": ["contextmenu", "themes", "types", "ui", "json_data", "crrm", "dnd", "cookies"],
            "types": config.types,
            "ui": {
                "initially_select" : [config.selected]
            },
            "contextmenu": {
                "items": function (node) {
                    var result = {};
                    var nodetype = node.attr("rel");

                    if (config.types.hasOwnProperty(nodetype)) {
                        var createItem = {};
                        var found = false;

                        createItem.label = config.labels.createItem;
                        createItem.submenu = {};

                        jQuery.each(config.types[nodetype].valid_children, function (i, val) {
                            if (config.types.hasOwnProperty(val)) {
                                createItem.submenu[val] = {};
                                createItem.submenu[val].label = config.types[val].label;
                                createItem.submenu[val].action = function (node) {
                                    var routing_defaults = config.routing_defaults;
                                    routing_defaults.parent = node.attr("url_safe_id");

                                    if (config.createInOverlay) {
                                        generateDialog(
                                            Routing.generate(
                                                config.types[val].routes.create_route,
                                                routing_defaults
                                            ),
                                            function () {
                                                treeInst.jstree('refresh', node);
                                            }
                                        );
                                    } else {
                                        window.location = Routing.generate(config.types[val].routes.create_route, routing_defaults);
                                    }
                                };
                                found = true;
                            }
                        });

                        if (found) {
                            result.createItem = createItem;
                        }
                    }

                    if (undefined !== config.types[node.attr("rel")].routes.delete_route) {
                        result.deleteItem = {};
                        result.deleteItem.label = config.labels.deleteItem;
                        result.deleteItem.action = function (node) {
                            var routing_defaults = config.routing_defaults;
                            routing_defaults.id = node.attr("url_safe_id");

                            if (config.deleteInOverlay != undefined && config.deleteInOverlay === true) {
                                generateDialog(
                                    Routing.generate(
                                        config.types[node.attr("rel")].routes.delete_route,
                                        routing_defaults
                                    ),
                                    function () {
                                        treeInst.jstree('refresh');
                                    }
                                );

                            } else {
                                window.location = Routing.generate(config.types[node.attr("rel")].routes.delete_route, routing_defaults);
                            }
                        };
                    }

                    return result;
                }
            },
            "dnd" : {
                "drop_target" : false,
                "drag_target" : false
            },
            "crrm": {
                "move": { }
            },
            "cookies": {
                "save_selected": false
            }
        });
        */

        treeInst.bind("select_node.jstree", function (event, data) {
            if (data.rslt.obj.attr("rel") in config.types
                && data.rslt.obj.attr("id") !== config.selected
                && undefined !== config.types[data.rslt.obj.attr("rel")].routes.select_route
            ) {
                var routing_defaults = config.routing_defaults;
                routing_defaults.id = data.rslt.obj.attr("url_safe_id");

                if (config.editInOverlay) {
                    if (2 < data.args.length){ // only generateDialog() when the tree has received a click, not on refresh
                        generateDialog(
                            Routing.generate(
                                config.types[data.rslt.obj.attr("rel")].routes.select_route,
                                routing_defaults
                            ),
                            function () {
                                treeInst.jstree('refresh');
                            }
                        );
                    }
                } else {
                    window.location = Routing.generate(config.types[data.rslt.obj.attr("rel")].routes.select_route, routing_defaults);
                }
            } else {
                // TODO: overlay?
                console.log('This node is not editable'); // note this will break lte IE8
            }
        })
        .bind("before.jstree", function (e, data) {
            if ("move_node" === data.func && "crrm" === data.plugin && false === data.args[1]) {
                var confirmEvent = jQuery.Event('cmf_tree.move', data.inst);

                jQuery(this).trigger(confirmEvent);

                if (confirmEvent.isDefaultPrevented()) {
                    e.stopImmediatePropagation();

                    return false;
                }
            }
        })
        .bind("move_node.jstree", function (event, data) {
            var instance  = data.instance;
            var node      = data.node;
            var dropped   = $(instance.get_node(node, true));
            var target    = data.node;
            var position  = data.position;
            var oldParent = data.old_parent;
            var newParent = data.parent;

            // FIXME: Better way of determining if this is the root node?
            var parentId = newParent == '#' ? config.rootNode : newParent;

            // Move the node
            if (oldParent != newParent) {
                jQuery.post(
                    config.ajax.move_url,
                    { "dropped": node.id, "target": parentId },
                    function (data) {
                        dropped.attr("id", data.id);
                        dropped.attr("url_safe_id", data.url_safe_id);
                    }
                );
            // Re-order
            } else {
                // FIXME: Not sure if there is an easy way to get the target before or after which the node should be moved
                jQuery.post(
                    config.ajax.reorder_url,
                    { "dropped": node.id, "target": target.attr("id"), "parent": parentId, "position": position }
                );
            }
        })
        .on("click", "a", function (e) {
            e.preventDefault();
        });
    };

    return my;

}());
