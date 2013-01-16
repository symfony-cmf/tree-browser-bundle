<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Tree\TreeInterface;

/**
 * Frontend to the TreeInterface, allowing to fetch children, get an edit form
 * and do move operations.
 *
 * @author Jacopo Jakuza Romei <jromei@gmail.com>
 * @author Lukas Kahwe Smith <smith@pooteeweet.org>
 */
class TreeBrowserController
{
    /**
     * @var TreeInterface
     */
    protected $tree;

    /**
     * Create the controller
     *
     * @param TreeInterface $tree the tree to operate on
     */
    public function __construct(TreeInterface $tree)
    {
        $this->tree = $tree;
    }

    /**
     * Helper method to deliver a json node
     *
     * @param string $path Node to process
     * @param string $method Method to execute on the node
     *
     * @return Response
     */
    protected function processNode($path, $method)
    {
        if (empty($path)) {
            $path = '/';
        }

        return new Response(json_encode($this->tree->$method($path)),
            200,
            array('Content-Type' => 'application/json')
        );
    }

    /**
     * Get a json encoded list of children the specified node has
     *
     * @param Request $request containing the parameter 'root' for which to get
     *      the children
     *
     * @return Response json encoded list of child nodes of the specified root
     *      node.
     */
    public function childrenAction(Request $request)
    {
        $path = $request->query->get('root');
        return $this->processNode($path, "getChildren");
    }

    /**
     * TODO: make this formAction to get an edit form for the node specified in root
     *
     * @param Request $request containing the parameter 'root' for which to get
     *      the children
     *
     * @return Response
     */
    public function propertiesAction(Request $request)
    {
        $path = $request->query->get('root');
        return $this->processNode($path, "getProperties");
    }

    /**
     * Handle request to move a node from src to target path.
     *
     * Should only be configured for POST requests to avoid manipulations.
     *
     * @param Request $request with the parameters dropped and target,
     *      containing the path to move from resp. to
     *
     * @return Response returning a plain text result with the new path of the
     *      node.
     */
    public function moveAction(Request $request)
    {
        $moved = $request->request->get('dropped');
        $target = $request->request->get('target');

        return new Response(json_encode($this->tree->move($moved, $target)), 200, array('Content-Type' => 'application/json'));
    }

    /**
     * Handle request to reorder a node from src to target path.
     *
     * Should only be configured for POST requests to avoid manipulations.
     *
     * @param Request $request with the parameters dropped and target,
     *      containing the path to move from resp. to
     *
     * @return Response returning a plain text result with the new path of the
     *      node.
     */
    public function reorderAction(Request $request)
    {
        $parent = $request->request->get('parent');
        $moved = $request->request->get('dropped');
        $target = $request->request->get('target');
        $position = $request->request->get('position');

        $this->tree->reorder($parent, $moved, $target, 'before' == $position);

        return new Response();
    }
}
