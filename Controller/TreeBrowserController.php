<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

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

        if (empty($path)) {
            $path = '/';
        }

        return new JsonResponse($this->tree->getChildren($path));
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

        return new JsonResponse($this->tree->move($moved, $target));
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
