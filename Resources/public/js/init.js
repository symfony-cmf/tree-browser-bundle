/**
 * define a tree used to see all content, move nodes and select things to edit
 */
var AdminTree = (function () {

    var my = {},
        generateDialog;

    generateDialog = function (url, closeCallback) {
        var treeDialog = jQuery("<iframe id='tree_dialog'></iframe>");// iframe is needed because the delivered form might need some additional JS

        jQuery(document.body).append(treeDialog);
        treeDialog.attr('src', url);

        treeDialog.dialog({
            width: 800,
            modal: true,
            autoOpen: true,
            resizable: true,
            close: function(event, ui) {
                if (closeCallback) {
                    closeCallback(event, ui);
                }
            },
            zIndex: 9999
        });

        treeDialog.attr('style', 'height: 500px');

        return treeDialog;
    };

    my.generateTreeStateArray = function (path) {

        var start, pos, segments, curSegment, curItem;

        curSegment = '';
        segments = [];
        start = 1;
        pos = path.indexOf('/', start);

        while (pos > 0) {
            curItem = path.substr(start, pos - start);
            if (curItem !== '') {
                curSegment = curSegment + '/' + curItem;
                segments.push(curSegment);
            }
            start = pos + 1;
            pos = path.indexOf('/', start);
        }

        curItem = path.substr(start);

        if (curItem !== '') {
            curSegment = curSegment + '/' + curItem;
            segments.push(curSegment);
        }

        return segments;
    };

    my.initTree = function (config) {
        if (! 'rootNode' in config) {
            config.rootNode = "/";
        }
        if (! 'selected' in config) {
            config.selected = config.rootNode;
        }
        if (! 'routing_defaults' in config) {
            config.routing_defaults = {};
        }
        var treeInst = jQuery(config.selector).jstree({
            "core": {
                "initially_load": config.path.expanded,
                "initially_open": config.path.preloaded
            },
            "plugins": [ "contextmenu", "themes", "types", "ui", "json_data", "dnd", "crrm", "cookies" ],
            "json_data": {
                "ajax": {
                    "url": config.ajax.children_url,
                    "data": function (node) {
                        if (node == -1) {
                            return { 'root' : config.rootNode };
                        } else {
                            return { 'root' : jQuery(node).attr('id') };
                        }
                    }
                }
            },
            "types": {
                "max_depth":        -1,
                "max_children":     -1,
                "valid_children":  [ "all"],
                "types": config.types
            },
            "ui": {
                "initially_select" : [ config.selected ]
            },
            "contextmenu": {
                "items": function(node) {
                    var result = {};
                    var nodetype = node.attr("rel");
                    if (nodetype in config.types) {
                        var createItem = {};
                        var found = false;
                        createItem.label = config.labels.createItem;
                        createItem.submenu = {};
                        $.each(config.types[nodetype].valid_children, function(i, val) {
                            if (val in config.types) {
                                createItem.submenu[val] = {};
                                createItem.submenu[val].label = config.types[val].label;
                                createItem.submenu[val].action = function (node) {
                                    routing_defaults = config.routing_defaults;
                                    routing_defaults["parent"] = node.attr("url_safe_id");

                                    if (config.createInOverlay) {
                                        generateDialog(
                                            Routing.generate(config.types[val].routes.create_route, routing_defaults),
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
                            routing_defaults = config.routing_defaults;
                            routing_defaults["id"] = node.attr("url_safe_id");
                            window.location = Routing.generate(config.types[node.attr("rel")].routes.delete_route, routing_defaults);
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
                && data.rslt.obj.attr("id") != config.selected
                && undefined != config.types[data.rslt.obj.attr("rel")].routes.select_route
            ) {
                routing_defaults = config.routing_defaults;
                routing_defaults["id"] = data.rslt.obj.attr("url_safe_id");

                if (config.editInOverlay) {
                    generateDialog(
                        Routing.generate(config.types[data.rslt.obj.attr("rel")].routes.select_route, routing_defaults),
                        function () {
                            treeInst.jstree('refresh');
                        }
                    );
                } else {
                    window.location = Routing.generate(config.types[data.rslt.obj.attr("rel")].routes.select_route, routing_defaults);
                }
            } else {
                // TODO: overlay?
                console.log('This node is not editable');
            }
        })
        .bind("before.jstree", function (e, data) {
            if (data.func === "move_node" && data.plugin === "crrm" && data.args[1] == false) {
                var confirmEvent = jQuery.Event('symfony_cmf_tree.move', data.inst);
                $(this).trigger(confirmEvent);
                if (confirmEvent.isDefaultPrevented()) {
                    e.stopImmediatePropagation();
                    return false;
                }
            }
        })
        .bind("move_node.jstree", function (event, data) {
            var dropped = data.rslt.o;
            var target = data.rslt.r;
            var position = data.rslt.p;
            var oldParent = data.rslt.op;
            var newParent = data.rslt.np;

            if (!oldParent.is(newParent)) {
                $.post(
                    config.ajax.move_url,
                    { "dropped": dropped.attr("id"), "target": newParent.attr("id") },
                    function (data) {
                        dropped.attr("id", data.id);
                        dropped.attr("url_safe_id", data.url_safe_id);
                    }
                );
            } else {
                $.post(
                    config.ajax.reorder_url,
                    { "dropped": dropped.attr("id"), "target": target.attr("id"), "parent": newParent.attr("id"), "position": position }
                );
            }
        })

        .delegate("a", "click", function (event, data) { event.preventDefault(); });
    };

    return my;

}());
