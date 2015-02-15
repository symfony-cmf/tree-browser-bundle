/**
 * A simple layer between the jQuery front-end and the JS tree library used.
 *
 * By default, it uses the FancytreeAdapter. You can pass other adapters by
 * changing the `adapter` setting.
 *
 * @author Wouter J <wouter@wouterj.nl>
 */
jQuery.fn.cmfTree = function (options) {
    options = jQuery.extend({
        adapter: null,
    }, options);

    // configure options
    var $treeOutput = $(this);
    var selectElement = function (selector) {
        if ('string' == typeof(selector)) {
            return $(selector);
        } else if (selector instanceof jQuery) {
            return selector;
        }

        throw 'Cannot handle selector ' + selector + '. You may want to pass a jQuery object or a jQuery selector.';
    };

    if (!options.data_url) {
        throw 'cmfTree needs an AJAX URL to lazy load the tree, pass it using the `data_url` option.';
    }

    if (!options.adapter) {
        options.adapter = new FancytreeAdapter(options.data_url);
    }
    var adapter = options.adapter;
    
    if (!adapter.bindToElement) {
        throw 'cmfTree adapters must have a bindToElement() method to specify the output element of the tree.';
    }

    // render tree
    adapter.bindToElement($treeOutput);

    // optionally bind the tree to an input element
    if (options.path_output) {
        if (!adapter.bindToInput) {
            throw 'The configured cmfTree adapter does not support binding to an input field, implement the bindToInput() method or use another adapter.';
        }

        adapter.bindToInput(selectElement(options.path_output));
    }
};
