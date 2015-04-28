describe('The cmfContextMenu plugin', function () {

    beforeEach(function () {
        setFixtures('<div id="wrapper"><a id="contextMenuLink">Something</a><a>Different</a></div>');
        this.$link = $('#contextMenuLink');
    });

    afterEach(function () {
        $('#cmf-context-menu').remove();
    });

    it('has a constructor named cmfContextMenu', function () {
        expect(jQuery.fn.cmfContextMenu).toBeDefined();
    });

    it('shows list of actions on right click', function () {
        this.$link.cmfContextMenu({
            actions: {
                edit: { iconClass: 'fa  fa-pencil', label: 'Edit' },
                delete: { iconClass: 'fa  fa-trash', label: 'Delete' }
            },
        });

        this.$link.trigger('contextmenu');

        expect($('ul#cmf-context-menu')).toExist();
        var $menu = $('ul#cmf-context-menu');
        expect($menu).toContainElement('li:contains("Edit") i.fa.fa-pencil');
        expect($menu).toContainElement('li:contains("Delete") i.fa.fa-trash');
    });

    it('hides the contextmenu after a click outside the menu', function () {
        this.$link.cmfContextMenu({
            actions: { edit: { iconClass: 'fa  fa-pencil', label: 'Edit' } }
        });

        this.$link.trigger('contextmenu');
        expect($('#cmf-context-menu')).toExist();

        $('body').trigger('click');
        expect($('#cmf-context-menu')).not.toExist();
    });

    it('does not show contextmenu if action list is empty', function () {
        this.$link.cmfContextMenu();

        this.$link.trigger('contextmenu');
        expect($('#cmf-context-menu')).not.toExist();
    });

    it('can delegate event to children', function () {
        var $wrapper = $('<div><a>Something</a></div>');
        $wrapper.append(this.$link);

        $wrapper.cmfContextMenu({
            delegate: 'a',
            actions: { edit: { iconClass: 'fa  fa-pencil', label: 'Edit' } }
        });

        this.$link.trigger('contextmenu');

        expect($('#cmf-context-menu')).toExist();
    });

    it('supports flexible menus with an actions callback', function () {
        this.$link.cmfContextMenu({
            actions: function ($elem) {
                return {
                    edit: { iconClass: 'fa  fa-pencil', label: 'Edit' }
                };
            }
        });

        this.$link.trigger('contextmenu');

        var actions = $('#cmf-context-menu').find('li');
        expect(actions).toHaveLength(1);
        expect(actions).toHaveText('Edit');
    });

    it('executes the select callback when action is clicked', function () {
        var a = {
            func: function () {
            }
        };
        spyOn(a, 'func');

        this.$link.cmfContextMenu({
            actions: { edit: { iconClass: 'fa  fa-pencil', label: 'Edit' } },
            select: function () {
                a.func();
            }
        });

        this.$link.trigger('contextmenu');
        $('#cmf-context-menu li:contains("Edit")').click();

        expect(a.func).toHaveBeenCalled();
    });

});
