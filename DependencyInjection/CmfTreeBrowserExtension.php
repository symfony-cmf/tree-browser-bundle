<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\XmlFileLoader;

/**
  * @author Lukas Kahwe Smith <smith@pooteeweet.org>
  */
class CmfTreeBrowserExtension extends Extension
{
    /**
     * Loads the services based on your application configuration.
     *
     * @param array $configs
     * @param ContainerBuilder $container
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $config = $this->processConfiguration(new Configuration(), $configs);
        $loader = new XmlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));

        $bundles = $container->getParameter('kernel.bundles');
        if (isset($bundles['DoctrinePHPCRBundle'])
            && $config['persistence']['phpcr']['enabled']
        ) {

            $loader->load('tree-phpcr.xml');
            $phpcrTree = $container->getDefinition('cmf_tree_browser.phpcr_tree');
            $phpcrTree->replaceArgument(1, $config['persistence']['phpcr']['session_name']);
        }

        $loader->load('tree.xml');
    }

    /**
     * Returns the base path for the XSD files.
     *
     * @return string The XSD base path
     */
    public function getXsdValidationBasePath()
    {
        return __DIR__.'/../Resources/config/schema';
    }

    public function getNamespace()
    {
        return 'http://cmf.symfony.com/schema/dic/treebrowser';
    }
}
