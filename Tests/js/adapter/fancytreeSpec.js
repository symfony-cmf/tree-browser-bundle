describe('The Fancytree adapter', function() {

    beforeEach(function () {
        this.$tree = $('<div id="tree"></div>');
        this.adapter = new FancytreeAdapter({
            request: {
                load: function (path) {
                    return {
                        url: '/api',
                        data: { path: path }
                    };
                }
            }
        });

        jasmine.Ajax.install();

        jasmine.Ajax.stubRequest(/^\/api/).andReturn({
            status: 200,
            contentType: 'text/plain',
            responseText: JSON.stringify({
                node_name: '',
                label: '\/',
                path: '\/',
                children: {
                    cms: {
                        node_name: 'cms',
                        label: 'cms',
                        path: '\/cms',
                        children: {
                            content: {
                                node_name: 'content',
                                label: 'Content',
                                path: '/cms/content',
                                children: {
                                    some_article: [],
                                    other_article: []
                                }
                            }
                        }
                    }
                }
            })
        });
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    it('binds to a tree output', function () {
        this.adapter.bindToElement(this.$tree);

        expect(this.$tree).toBeMatchedBy(':ui-fancytree');
    });

    it('cannot be bound to multiple elements', function () {
        this.adapter.bindToElement(this.$tree);

        var adapter = this.adapter;
        expect(function () { adapter.bindToElement($('<div></div>')) }).toThrow('Cannot bind to multiple elements.');
    });

    it('automatically expands nodes when root is one folder', function () {
        this.adapter.bindToElement(this.$tree);

        var tree = this.$tree.fancytree('getTree');

        expect(tree.getNodeByKey('cms').isExpanded()).toBe(true);
    });

    it('lazy loads not yet loaded children', function () {
        jasmine.Ajax.stubRequest(/^\/api/, 'path=/cms/content').andReturn({
            responseText: JSON.stringify([{
                data: 'homepage',
                attr: { id: '/cms/content/home' },
                state: null,
                children: []
            }])
        });

        this.adapter.bindToElement(this.$tree);

        var tree = this.$tree.fancytree('getTree');

        tree.getNodeByKey('content').setExpanded();

        expect(jasmine.Ajax.requests.mostRecent().url).toMatch(/^\/api\?path=%2Fcms%2Fcontent/);
    });

    it('can have another path as root node', function () {
        jasmine.Ajax.stubRequest(/^\/api/, 'path=/cms/content').andReturn({
            responseText: JSON.stringify([{
                data: 'homepage',
                attr: { id: '/cms/content/home' },
                state: null,
                children: []
            }])
        });

        var adapter = new FancytreeAdapter({
            request: {
                load: function (path) {
                    return {
                        url: '/api',
                        data: { path: path }
                    };
                },
            },
            root_node: '/cms/content'
        });
        adapter.bindToElement(this.$tree);

        expect(jasmine.Ajax.requests.mostRecent().url).toMatch(/^\/api\?path=%2Fcms%2Fcontent/);
    });

    it('updates the path output with the current active node', function () {
        var $input = $('<input type=text/>');
        this.adapter.bindToElement(this.$tree);
        this.adapter.bindToInput($input);

        var tree = this.$tree.fancytree('getTree');

        tree.getNodeByKey('cms').setActive();
        expect($input).toHaveValue('/cms');

        tree.getNodeByKey('content').setActive();
        expect($input).toHaveValue('/cms/content');
    });

    it('updates the active node based on the value of the path ouput', function () {
        var $input = $('<input type=text value="/cms/content"/>');
        this.adapter.bindToElement(this.$tree);
        this.adapter.bindToInput($input);

        var tree = this.$tree.fancytree('getTree');
        // fixme: why is this not called automatically?
        this.$tree.trigger('fancytreeinit');

        expect(tree.getNodeByKey('content').isActive()).toBe(true);

        $input.val('/cms');
        $input.trigger('change');
        expect(tree.getNodeByKey('cms').isActive()).toBe(true);
    });

});
