<?php

$container->setParameter('cmf_testing.bundle_fqn', 'Symfony\Cmf\Bundle\TreeBrowserBundle');
$loader->import(CMF_TEST_CONFIG_DIR.'/default.php');
$loader->import(CMF_TEST_CONFIG_DIR.'/phpcr_odm.php');
$loader->import(__DIR__.'/cmf_tree_browser.yml');

