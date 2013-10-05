/**
 * define a tree used to select a node
 */
var SelectTree = (function () {

    'use strict';

    var my = {};

    my.initTree = function (config) {
        jQuery.extend({
            rootNode:         '/',
        }, config);

        jQuery(config.selector)
            .jstree({
                "core": {
                    "initially_load": config.path.expanded,
                    "initially_open": config.path.preloaded
                },
                "plugins": ["themes", "types", "ui", "json_data"],
                "json_data": {
                    "ajax": {
                        "url":  config.ajax.children_url,
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
                    "max_depth":      -1,
                    "max_children":   -1,
                    "valid_children": ["all"],
                    "types":          config.types
                },
                "ui": {
                    "initially_select" : [config.selected]
                }

            })
            .bind("select_node.jstree", function (event, data) {
                jQuery(config.output).val(data.rslt.obj.attr("id"));
                jQuery(config.output).trigger('change');
            })
            .on("click", "a", function (event, data) {
                event.preventDefault();
            })
        ;

        jQuery(config.reset).on("click", function (e) {
            e.preventDefault();

            jQuery(config.selector).jstree("deselect_all");
            jQuery(config.output).val("");

            if (config.selectRootNode) {
                jQuery(config.selector).jstree("select", config.rootNode);
                jQuery(config.output).val(config.rootNode);
            }
        });
    };

    return my;

}());
