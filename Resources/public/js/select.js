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
                "max_depth":        -1,
                "max_children":     -1,
                "valid_children":  [ "all"],
                "types": config.types
            },
            "ui": {
                "initially_select" : [ config.selected ]
            }

        })
        .bind("select_node.jstree", function (event, data) {
            jQuery(config.output).val(data.rslt.obj.attr("id"));
        })
        .delegate("a", "click", function (event, data) { event.preventDefault(); });

        jQuery(config.reset).bind("click", function(e) {
            jQuery(config.selector).jstree("deselect_all");
            jQuery(config.output).val("");
            if (config.selectRootNode) {
                jQuery(config.selector).jstree("select", config.rootNode);
                jQuery(config.output).val(config.rootNode);
            }
            e.preventDefault();
        });
    };

    return my;

}());
