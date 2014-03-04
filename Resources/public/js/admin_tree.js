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
            "core": {
                "initially_load": config.path.expanded,
                "initially_open": config.path.preloaded
            },
            "plugins": ["contextmenu", "themes", "types", "ui", "json_data", "crrm", "dnd", "cookies"],
            "json_data": {
                "ajax": {
                    "url": config.ajax.children_url,
                    "data": function (node) {
                        if (-1 === node) {
                            return { 'root' : config.rootNode };
                        } else {
                            return { 'root' : jQuery(node).attr('id') };
                        }
                    }
                }
            },
            "types": {
                "max_depth":       -1,
                "max_children":    -1,
                "valid_children": "all",
                "types":          config.types
            },
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
            var dropped   = data.rslt.o;
            var target    = data.rslt.r;
            var position  = data.rslt.p;
            var oldParent = data.rslt.op;
            var newParent = data.rslt.np;

            // parent could be the tree
            var parent = newParent.attr("id");
            if (treeInst.is(newParent)) {
                parent = config.rootNode;
            }

            if (!oldParent.is(newParent)) {
                jQuery.post(
                    config.ajax.move_url,
                    { "dropped": dropped.attr("id"), "target": parent },
                    function (data) {
                        dropped.attr("id", data.id);
                        dropped.attr("url_safe_id", data.url_safe_id);
                    }
                );
            } else {
                jQuery.post(
                    config.ajax.reorder_url,
                    { "dropped": dropped.attr("id"), "target": target.attr("id"), "parent": parent, "position": position }
                );
            }
        })
        .on("click", "a", function (e) {
            e.preventDefault();
        });
    };

    return my;

}());
