<?php

declare(strict_types=1);

/*
 * This file is part of the Symfony CMF package.
 *
 * (c) Symfony CMF
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('cmf_tree_browser');

        $rootNode
            ->children()
                ->arrayNode('icons')
                    ->useAttributeAsKey('class')
                    ->prototype('scalar')->end()
                    ->info('A mapping of classes/interfaces and icon classes or icon URLs used by the tree browser.')
                ->end()
            ->end()
        ;

        return $treeBuilder;
    }
}
