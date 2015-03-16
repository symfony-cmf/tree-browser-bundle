describe('The cmfTree plugin', function () {

    it('has a constructor called cmfTree', function () {
        expect(jQuery.fn.cmfTree).toBeDefined();
    });

    it('requires a data url to make requests to', function() {
        expect(function () { $('#foo').cmfTree() }).toThrow('cmfTree needs an AJAX URL to lazy load the tree, pass it using the `request.load` option.');
    });

    it('defaults to fancytree if no adapter is given', function () {
        expect($('#foo').cmfTree({
            request: {
                load: function () {
                    return 'api/';
                }
            }
        }) instanceof FancytreeAdapter).toBe(true);
    });

    it('accepts other adapters using the adapter option', function () {
        var CustomAdapter = function () { };
        CustomAdapter.prototype.bindToElement = function () {};

        expect($('#foo').cmfTree({
            request: {
                load: function () {
                    return 'api/';
                }
            },
            adapter: new CustomAdapter()
        }) instanceof CustomAdapter).toBe(true);
    });

    it('binds to the selected element', function () {
        var spyAdapter = {
            bindToElement: function (elem) { }
        };

        spyOn(spyAdapter, 'bindToElement');

        $('#foo').cmfTree({
            adapter: spyAdapter,
            request: {
                load: function () {
                    return 'api/';
                }
            }
        });

        expect(spyAdapter.bindToElement).toHaveBeenCalled();
    });

    it('binds to the configured path output', function () {
        var spyAdapter = {
            bindToElement: function (elem) { },
            bindToInput: function (elem) { }
        };

        spyOn(spyAdapter, 'bindToInput');

        $('#foo').cmfTree({
            adapter: spyAdapter,
            request: {
                load: function () {
                    return 'api/';
                }
            },
            path_output: '#output'
        });

        expect(spyAdapter.bindToInput).toHaveBeenCalledWith(jasmine.objectContaining({selector: '#output'}));
    });

    describe('custom adapters', function () {

        it('have to have a bindToElement function', function () {
            var CustomAdapter = function () { };
            var createCmfTree = function () {
                $('#foo').cmfTree({
                    request: {
                        load: function () {
                            return 'api/';
                        }
                    },
                    adapter: new CustomAdapter()
                })
            };

            expect(createCmfTree).toThrow('cmfTree adapters must have a bindToElement() method to specify the output element of the tree.');

            CustomAdapter.prototype.bindToElement = function () { };

            expect(createCmfTree).not.toThrow('cmfTree adapters must have a bindToElement() method to specify the output element of the tree.');
        });

        it('have to have a bindToInput method when tree is bound to input element', function () {
            var CustomAdapter = function () { };
            CustomAdapter.prototype.bindToElement = function () { };
            var createCmfTree = function () {
                $('#foo').cmfTree({
                    request: {
                        load: function () {
                            return 'api/';
                        }
                    },
                    adapter: new CustomAdapter(),
                    path_output: '#bar'
                })
            };

            expect(createCmfTree).toThrow('The configured cmfTree adapter does not support binding to an input field, implement the bindToInput() method or use another adapter.');

            CustomAdapter.prototype.bindToInput = function () { };

            expect(createCmfTree).not.toThrow('The configured cmfTree adapter does not support binding to an input field, implement the bindToInput() method or use another adapter.');
        });

    });

});
