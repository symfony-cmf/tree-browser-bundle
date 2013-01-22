<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tree;

/**
 * The Tree interface describes how a class feeding data for a tree representation of a PHPCR repository shall look like.
 *
 * @author Jacopo Jakuza Romei <jromei@gmail.com>
 * @author cirpo <alessandro.cinelli@gmail.com>
 * @author Lukas Kahwe Smith <smith@pooteeweet.org>
 * @author Uwe Jäger <uwej711@googlemail.com>
*/
interface TreeInterface
{
    /**
     * Returns an array representation of children nodes of a node
     *
     * @param string $path The path of any PHPCR node
     * @return array children list
     */
    public function getChildren($path);

    /**
     * Move the node at $path to $target
     *
     * @param string $path
     * @param string $target
     * @return array the new id of the moved node at $target and the url_safe_id
     */
    public function move($path, $target);

    /**
     * Reorder $moved (child of $parent) before or after $target
     *
     * @param string $parent the id of the parent
     * @param string $moved the id of the child being moved
     * @param string $target the id of the target node
     * @param bool $before insert before or after the target
     * @return void
     */
    public function reorder($parent, $moved, $target, $before);

    /**
     * Get the alias for this tree
     *
     * @return string
     */
    public function getAlias();

    /**
     * Get an array describing the available node types
     *
     * Example:
     *
     *
     * @return array
     */
    public function getNodeTypes();

    /**
     * Get an array for labels.
     *
     * @return array
     */
    public function getLabels();
}

