/**
 * define a tree used to select a node
 */
var SelectTree = (function () {

    var my = {};

    my.initTree = function (config) {
        if (! 'rootNode' in config) {
            config.rootNode = "/";
        }
        jQuery(config.selector).jstree({
            "core": {
                "initially_load": config.path.expanded,
                "initially_open": config.path.preloaded
            },
            "plugins": [ "themes", "types", "ui", "json_data"],
            "json_data": {
                "ajax": {
                    "url":    config.ajax.children_url,
                    "data":   function (node) {
                        if (node == -1) {
                            return { 'root' : config.rootNode };
                        } else {
                            return { 'root' : jQuery(node).attr('id') };
                        }
                    }
                }
            },
            "types": {
                "max_depth":        -2,
                "max_children":     -2,
                "valid_children":  [ "folder" ],
                "types": {
                    "default": {
                        "valid_children": "none",
                        "icon": {
                            "image": config.icon.document
                        }
                    },
                    "folder": {
                        "valid_children": [ "default", "folder" ],
                        "icon": {
                            "image": config.icon.folder
                        }
                    }
                }
            }
        })
        .bind("select_node.jstree", function (event, data) {
            jQuery(config.output).val(data.rslt.obj.attr("id"));
        })
        .delegate("a", "click", function (event, data) { event.preventDefault(); });
    };

    return my;

}());
