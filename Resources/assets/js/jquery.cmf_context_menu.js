/*
 * This file is part of the Symfony CMF package.
 *
 * (c) 2011-2015 Symfony CMF
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import jQuery from 'jquery';

/**
 * A very flexible and simple jQuery context menu plugin.
 *
 * @author Wouter J <wouter@wouterj.nl>
 */
jQuery.fn.cmfContextMenu = function (options) {
    var options = jQuery.extend({
        /**
         * The selector used to delegate the contextmenu event too.
         *
         *     $('#tree').cmfContextMenu({ delegate: '.hasMenu' })
         *
         * Will delegate the contextmenu event to all `.hasMenu`
         * childs in `#tree`.
         *
         * @var string|null
         */
        delegate: null,

        /**
         * A list of actions in the context menu or a callback.
         *
         * In case of a callback, it will be called with the target
         * element. This means the action list can be build dynamically
         * based on the target.
         *
         * The contextmenu will not be shown if this list is empty or if
         * the callback returned `false`.
         *
         * @var object|function
         */
        actions: [],

        /**
         * A callback that's called when an action is selected.
         *
         * The callback will be provided with the element the contextmenu was
         * bound to and the click event.
         *
         * @var function
         */
        select: function ($action, event) { },

        /**
         * The template to use for the wrapper element.
         *
         * @var string
         */
        wrapperTemplate: '<ul id="cmf-context-menu"></ul>',

        /**
         * The template to use for each action element.
         *
         * You can include vars with the `{{ varName }}` syntax. The available
         * vars are the properties of the action object set in `actions`.
         *
         * @var string
         */
        actionTemplate: '<li><i class="{{ iconClass }}"></i> {{ label }}</li>'
    }, options);

    var $body = jQuery('body');
    var $menu;

    // respond to right click
    jQuery(this).on('contextmenu', options.delegate, function (e) {
        e.preventDefault();

        var $target = jQuery(this);

        // remove already shown menu
        $menu && $menu.remove();

        // generate actions
        var actions = options.actions;
        if (typeof actions === 'function') {
            actions = actions($target);
        }

        if (false === actions || jQuery.isEmptyObject(actions)) {
            return;
        }

        // generate the menu element
        $menu = (function () {
            var $wrapper = jQuery(options.wrapperTemplate);
            var $menu = $wrapper.is('ul') ? $wrapper : $wrapper.find('ul');
            for (var cmd in actions) {
                var action = actions[cmd];
                var $action = jQuery((function () {
                    var tmp = options.actionTemplate;
                    for (var prop in action) {
                        if (!action.hasOwnProperty(prop)) {
                            continue;
                        }

                        tmp = tmp.replace('{{ ' + prop + ' }}', action[prop]);
                    }

                    return tmp;
                })());

                $action.data('cmd', cmd);

                $menu.append($action);
            }

            return $wrapper;
        })();

        // align it on the page
        $menu.css({
            top: e.pageY,
            left: e.pageX
        });

        $body.append($menu);

        var select = options.select;
        // respond to a click on an action
        $menu.on('click', 'li', function (e) {
            e.stopPropagation();

            select($target, e);
        });
    });

    // when clicked anywhere outside of the contextmenu, hide the menu
    jQuery('html').on('click', function (e) {
        $menu && $menu.remove();
    });
};
