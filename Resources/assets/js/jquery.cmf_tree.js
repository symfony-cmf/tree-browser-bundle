/*
 * This file is part of the Symfony CMF package.
 *
 * (c) 2011-2015 Symfony CMF
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import jQuery from 'jquery';
import {FancytreeAdapter} from './adapter/fancytree';

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
        request: {
            load: null
        },
        actions: {}
    }, options);

    // configure options
    var $treeOutput = jQuery(this);
    var selectElement = function (selector) {
        if ('string' == typeof(selector)) {
            return jQuery(selector);
        } else if (selector instanceof jQuery) {
            return selector;
        }

        throw 'Cannot handle selector ' + selector + '. You may want to pass a jQuery object or a jQuery selector.';
    };

    if (!options.request.load) {
        throw 'cmfTree needs an AJAX URL to lazy load the tree, pass it using the `request.load` option.';
    }

    if (!options.adapter) {
        options.adapter = new FancytreeAdapter(options);
    }
    var adapter = options.adapter;
    
    if (!adapter.bindToElement) {
        throw 'cmfTree adapters must have a bindToElement() method to specify the output element of the tree.';
    }

    for (let actionName in options.actions) {
        if (!options.actions.hasOwnProperty(actionName)) {
            continue;
        }

        if (!adapter.addAction) {
            throw 'The configured cmfTree adapter does not support actions, implement the addAction() method or use another adapter.';
        }
        var action = options.actions[actionName];

        if (!action.url) {
            throw 'actions should have a url defined, "' + actionName + '" does not.';
        }

        adapter.addAction(actionName, action.url, action.icon);
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

    return adapter;
};
