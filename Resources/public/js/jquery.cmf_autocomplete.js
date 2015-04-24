/**
* A small plugin to add autocompletion features for paths
* in browsers.
*
* @author Wouter J <wouter@wouterj.nl>
*/
jQuery.fn.cmfAutoComplete = function (options) {
    options = jQuery.extend({
        /**
         * The element used to show the suggestions.
         *
         * This has to be a <datalist> element.
         *
         * @var string|null A selector or use the selector in
         *                  the `list` attribute (when null is used)
         */
        datalist_selector: null,

        /**
         * A callback to retrieve the data.
         *
         * @return array
         */
        data: function (path) { return []; },
    }, options);

    var $input = $(this);
    var $autocompleteList;
    var previousBase;

    // find datalist
    if (options.datalist_selector) {
        $autocompleteList = $(options.datalist_selector);
    } else if ($(this).attr('list')) {
        $autocompleteList = $('#' + $(this).attr('list'));
    } else {
        throw 'No datalist selected';
    }

    if ('DATALIST' !== $autocompleteList.prop('tagName')) {
        throw 'The configured datalist element should be a <datalist> element, <' + $autocompleteList.prop('tagName').toLowerCase() + '> given.';
    }

    // find autocompletion values
    $input.on('keyup', function (e) {
        // arrows are used to navigate through the data list, don't update it then
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            return;
        }

        var path = $(this).val();
        var base = path.substr(0, path.lastIndexOf('/') + 1); // get everything except the child

        // skip if still in same node
        if (base === previousBase) {
            return;
        }
        previousBase = base;

        // cache node
        if (!cache[base]) {
            cache[base] = options.data(path);
        }

        // clear datalist
        $autocompleteList.empty();

        // add new autocomplete values
        cache[base].forEach(function (child) {
            $autocompleteList.append('<option label="' + child + '" value="' + base + child + '">');
        });
    });
};
