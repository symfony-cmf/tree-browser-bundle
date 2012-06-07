# Symfony Tree Browser Bundle

This is part of the Symfony Cmf: <https://github.com/symfony-cmf/symfony-cmf>

This bundle consists of two parts:

1. Generic Tree Browser with a TreeInterface
1. PHPCR tree implementation and GUI for a PHPCR browser


## Documentation

TODO: make this more detailed.

You have select.js and init.js which are a wrapper to build a jquery tree. Use
them with SelectTree.initTree resp. AdminTree.initTree

* SelectTree in select.js is a tree to select a node to put its id into a field
* AdminTree in init.js is a tree to create, move and edit nodes

Both have the following options when creating:

* config.rootNode: id to the root node of your tree, defaults to "/"
* config.path.expanded: tree path where the tree should be expanded to at the
    moment
* config.path.preloaded: tree path what node should be preloaded for faster
    user experience
* config.ajax.children_url: Url to the controller that provides the children of
    a node
* config.selector: jquery selector where to hook in the js tree


### select.js only

* config.output: where to write the id of the selected node


### init.js only

* config.ajax.move_url: Url to the controller that handles the move operation
* config.doctypes: array to manage creating new nodes
* config.routecollection: array indexed with the className attribute of nodes
    that maps to route prefix that get appended .routes.edit and .routes.delete


## Samples

Look at the templates in the Sonata Admin Bundle for examples how to build the tree:

* [init.js](https://github.com/sonata-project/SonataDoctrinePhpcrAdminBundle/blob/master/Resources/views/Tree/tree.html.twig)
* [select.js](https://github.com/sonata-project/SonataDoctrinePhpcrAdminBundle/blob/master/Resources/views/Form/form_admin_fields.html.twig) (look for doctrine_phpcr_type_tree_model_widget)


## Links

- GitHub: <https://github.com/symfony-cmf/symfony-cmf>
- Sandbox: <https://github.com/symfony-cmf/cmf-sandbox>
- Web: <http://cmf.symfony.com/>
- Wiki: <http://github.com/symfony-cmf/symfony-cmf/wiki>
- IRC: irc://freenode/#symfony-cmf
- Users mailing list: <http://groups.google.com/group/symfony-cmf-users>
- Devs mailing list: <http://groups.google.com/group/symfony-cmf-devs>
