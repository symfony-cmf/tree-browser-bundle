describe('The cmfAutoComplete plugin', function () {

    beforeEach(function () {
        setFixtures('<input type=text id=field list=suggestion-list><datalist id="suggestion-list"></datalist>');
        this.$field = $('#field');
        this.$list = $('#suggestion-list');
    });

    function type($field, value) {
        $field.val(value);
        $field.trigger('keyup');
    }

    it('has a constructor named cmfAutoComplete', function () {
        expect(jQuery.fn.cmfAutoComplete).toBeDefined();
    });

    it('updates the datalist with possible elements', function () {
        this.$field.cmfAutoComplete({
            data: function (path, next) {
                next(['some suggestion', 'another suggestion']);
            }
        });

        type(this.$field, 'value');

        expect(this.$list.find('option')).toHaveLength(2);
    });

    it('calls the data function with the base node', function () {
        var spy = jasmine.createSpy('data');

        this.$field.cmfAutoComplete({
            data: spy
        });

        type(this.$field, '/cms/cont');
        type(this.$field, '/cms/content/h');

        expect(spy.calls.count()).toBe(2);
        expect(spy.calls.argsFor(0)[0]).toBe('/cms');
        expect(spy.calls.argsFor(1)[0]).toBe('/cms/content');
    });

    it('caches previous data', function () {
        var spy = jasmine.createSpy('data');

        this.$field.cmfAutoComplete({
            data: spy
        });

        type(this.$field, '/cms/cont');
        type(this.$field, '/cms/me');

        expect(spy.calls.count()).toBe(1);
    });

});
