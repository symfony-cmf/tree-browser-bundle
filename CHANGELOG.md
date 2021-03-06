Changelog
=========

2.1.1
-----

* **2019-01-29**: Adjust Twig template reference syntax for Symfony 4.2

2.1.0
-----

* **2018-08-18**: Allow Symfony 4

2.0.1
-----

* **2017-07-31**: Fix reorder on client side. No reorder call on droping an node on an other. Better error handling

2.0.0
-----

2.0.0-RC2
---------
 * Added Drag&Drop to move nodes.
 * The `cmf_tree_browser.fancytree.js`/`cmf_tree_browser.fancytree.css` files
   are now only loaded once (even when the `Base:scripts.html.twig` template is
   included multiple times).

2.0.0-RC1
---------

 * Added IconEnhancer for custom node icons
 * Added TreeSelectType to use in forms
 * Rewrote all front-end tools to use Fancytree
 * Removed TreeInterface implementations in favor of the CmfResourceRestBundle

1.2.0
-----

 * Symfony 3 compatibility

1.1.0-RC1
---------

 * **2014-06-06**: Updated to PSR-4 autoloading

1.0.3
-----

 * **2014-04-11**: drop Symfony 2.2 compatibility

1.0.0-RC3
---------

 * **2013-10-05**: Renamed and cleaned up the javascript files

1.0.0-RC1
---------

 * **2013-08-23**: [DependencyInjection] restructured config into `persistence` -> `phpcr` to match other Bundles
