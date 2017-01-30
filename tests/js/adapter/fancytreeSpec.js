import {FancytreeAdapter} from 'bundle/adapter/fancytree'

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

        FancytreeAdapter._resetCache();
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

        tree.init = () => {
            expect(tree.getNodeByRefPath('/cms').isExpanded()).toBe(true);
        }
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

        tree.init = () => {
            tree.getNodeByRefPath('/cms/content').setExpanded();

            expect(jasmine.Ajax.requests.mostRecent().url).toMatch(/^\/api\?path=%2Fcms%2Fcontent/);
        }
    });

    xit('caches the nodes globally', function () {
        var adapter = new FancytreeAdapter({
            request: {
                load: function (path) {
                    return {
                        url: '/api',
                        data: { path: path }
                    };
                }
            }
        });

        this.adapter.bindToElement(this.$tree);

        var $tree = $('<div></div>');
        adapter.bindToElement($tree);

        expect(jasmine.Ajax.requests.count()).toBe(1);
    });

    it('does not cache when use_cache is set to false', function () {
        var adapter = new FancytreeAdapter({
            request: {
                load: function (path) {
                    return {
                        url: '/api',
                        data: { path: path }
                    };
                }
            },
            use_cache: false
        });

        this.adapter.bindToElement(this.$tree);

        var $tree = $('<div></div>');
        adapter.bindToElement($tree);

        expect(jasmine.Ajax.requests.count()).toBe(2);
    });

    it('accepts direct results by the data loader', function () {
        var adapter = new FancytreeAdapter({
            request: {
                load: function (path) {
                    return [
                        { title: 'Hello', key: 'hello' }
                    ];
                }
            }
        });

        adapter.bindToElement(this.$tree);

        expect(jasmine.Ajax.requests.count()).toBe(0);

        var tree = this.$tree.fancytree('getTree');
        expect(tree.getRootNode().children[0].key).toBe('hello');
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

        tree.init = () => {
            tree.getNodeByRefPath('/cms').setActive();
            expect($input).toHaveValue('/cms');

            tree.getNodeByRefPath('/cms/content').setActive();
            expect($input).toHaveValue('/cms/content');
        };
    });

    it('updates the active node based on the value of the path ouput', function () {
        var $input = $('<input type=text value="/cms/content"/>');
        this.adapter.bindToElement(this.$tree);
        this.adapter.bindToInput($input);

        var tree = this.$tree.fancytree('getTree');

        tree.init = () => {
            expect(tree.getNodeByRefPath('/cms/content').isActive()).toBe(true);

            $input.val('/cms');
            $input.trigger('change');
            expect(tree.getNodeByRefPath('/cms/content').isActive()).toBe(true);
        }
    });

    it('prefixes the root node to path output when configured', function () {
        jasmine.Ajax.stubRequest(/^\/root_api/).andReturn({
            responseText: JSON.stringify({
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
                    },
                    routes: {
                        node_name: 'routes',
                        label: 'Routes',
                        path: '/cms/routes',
                        children: {}
                    }
                }
            })
        });

        var adapter = new FancytreeAdapter({
            request: {
                load: function (path) {
                    return {
                        url: '/root_api'
                    };
                },
            },
            root_node: '/cms'
        });

        adapter.bindToElement(this.$tree);

        var $input = $('<input type=text value="/cms/routes"/>');
        adapter.bindToInput($input);

        var tree = this.$tree.fancytree('getTree');

        tree.init = () => {
            tree.getNodeByRefPath('/cms/content').setActive();

            expect($input).toHaveValue('/cms/content');
        }
    });

});
