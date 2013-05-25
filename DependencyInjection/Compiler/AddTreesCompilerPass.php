<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\DefinitionDecorator;
use Symfony\Component\DependencyInjection\Reference;

class AddTreesCompilerPass implements CompilerPassInterface
{
    /**
     * You can modify the container here before it is dumped to PHP code.
     *
     * @param ContainerBuilder $container
     *
     * @api
     */
    public function process(ContainerBuilder $container)
    {
        $trees = $container->findTaggedServiceIds('cmf.tree');
        $controllers = array();
        foreach ($trees as $treeId => $tag) {
            $tree = $container->getDefinition($treeId);
            $alias = isset($tag[0]['alias'])
                ? $tag[0]['alias']
                : $treeId;

            $controller = new DefinitionDecorator('cmf_tree_browser.controller_prototype');
            $controller->replaceArgument(0, $tree);
            $container->setDefinition($alias.'.cmf_tree_controller', $controller);
            $controllers[] = array('id' => $alias.'.cmf_tree_controller', 'alias' => $alias);
        }
        $container->setParameter('cmf_tree_browser.tree_controllers', $controllers);
    }

}