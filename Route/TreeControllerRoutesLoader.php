<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Route;

use Symfony\Component\Config\Loader\FileLoader;
use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\Routing\Route;

/**
 * Load routes for all existing tree controllers
 */
class TreeControllerRoutesLoader extends FileLoader
{
    /** @var array */
    protected $treeControllers;

    /**
     * @param array $trees
     */
    public function __construct(array $treeControllers)
    {
        $this->treeControllers = $treeControllers;
    }

    /**
     * Loads a resource.
     *
     * @param mixed  $resource The resource
     * @param string $type     The resource type
     */
    public function load($resource, $type = null)
    {
        $collection = new RouteCollection();
        foreach ($this->treeControllers as $controller) {
            foreach ($this->getRoutesDefinitions() as $name => $definition) {
                $defaults = array(
                    '_controller' => $controller['id'].':'.$definition['action']
                );
                $requirements = array(
                    '_method' => $definition['method']
                );
                $pattern = '_cmf_tree/'.$controller['alias'].'/'.$definition['pattern'];

                $route = new Route($pattern, $defaults, $requirements, array('expose' => true));
                $collection->add('_cmf_tree_'.$controller['alias'].'_'.$name, $route);
            }
        }
        return $collection;

    }

    /**
     * Returns true if this class supports the given resource.
     *
     * @param mixed  $resource A resource
     * @param string $type     The resource type
     *
     * @return Boolean true if this class supports the given resource, false otherwise
     */
    public function supports($resource, $type = null)
    {
        if ($type == 'cmf_tree') {
            return true;
        }

        return false;
    }

    protected function getRoutesDefinitions()
    {
        return array(
            'children' => array(
                'pattern' => 'children',
                'method' => 'GET',
                'action' => 'childrenAction'
            ),
            'move' => array(
                'pattern' => 'move',
                'method' => 'POST',
                'action' => 'moveAction'
            ),
            'reorder' => array(
                'pattern' => 'reorder',
                'method' => 'POST',
                'action' => 'reorderAction'
            ),
        );
    }
}