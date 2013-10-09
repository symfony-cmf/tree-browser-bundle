<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tree;

use Doctrine\Bundle\PHPCRBundle\ManagerRegistry;

use PHPCR\PropertyType;
use PHPCR\Util\NodeHelper;
use PHPCR\Util\PathHelper;

/**
 * A simple class to get PHPCR trees in JSON format
 *
 * @author Jacopo 'Jakuza' Romei <jromei@gmail.com>
 * @author Lukas Kahwe Smith <smith@pooteeweet.org>
 * @author Nacho Martín <nitram.ohcan@gmail.com>
 * @author David Buchmann <david@liip.ch>
 */
class PHPCRTree implements TreeInterface
{
    /**
     * @var \PHPCR\SessionInterface
     */
    private $session;

    public function __construct(ManagerRegistry $manager, $sessionName)
    {
        $this->session = $manager->getConnection($sessionName);
    }

    public function getChildren($path)
    {
        $root = $this->session->getNode($path);

        $children = array();

        foreach ($root->getNodes() as $name => $node) {
            if (NodeHelper::isSystemItem($node)) {
                continue;
            }
            $child = $this->nodeToArray($name, $node);

            foreach ($node->getNodes() as $childname => $grandson) {
                $child['children'][] = $this->nodeToArray($childname, $grandson);
            }

            $children[] = $child;
        }

        return $children;
    }

    /**
     * @param string $moved_path
     * @param string $target_path
     *
     * @return array
     */
    public function move($moved_path, $target_path)
    {
        $resulting_path = $target_path.'/'.PathHelper::getNodeName($moved_path);

        $workspace = $this->session->getWorkspace();
        $workspace->move($moved_path, $target_path.'/'.PathHelper::getNodeName($moved_path));

        return array('id' => $resulting_path, 'url_safe_id' => ltrim($resulting_path, '/'));
    }

    /**
     * Reorder $moved (child of $parent) before or after $target
     *
     * @param string $parent the id of the parent
     * @param string $moved the id of the child being moved
     * @param string $target the id of the target node
     * @param bool $before insert before or after the target
     * 
     * @return void
     */
    public function reorder($parent, $moved, $target, $before)
    {
        $parentNode = $this->session->getNode($parent);
        $targetName = PathHelper::getNodeName($target);
        if (!$before) {
            $nodesIterator = $parentNode->getNodes();
            $nodesIterator->rewind();
            while ($nodesIterator->valid()) {
                if ($nodesIterator->key() == $targetName) {
                    break;
                }
                $nodesIterator->next();
            }
            $targetName = null;
            if ($nodesIterator->valid()) {
                $nodesIterator->next();
                if ($nodesIterator->valid()) {
                    $targetName = $nodesIterator->key();
                }
            }
        }
        $parentNode->orderBefore(PathHelper::getNodeName($moved), $targetName);
        $this->session->save();
    }


    /**
     * Get the phpcr session this tree is using.
     *
     * This is not part of the API
     *
     * @return \PHPCR\SessionInterface
     */
    public function getSession()
    {
        return $this->session;
    }

    /**
     *
     * Returns an array representation of a PHPCR node
     *
     * @param string $name
     * @param \PHPCR\NodeInterface $node
     *
     * @return array
     */
    private function nodeToArray($name, $node)
    {
        $has_children = $node->hasNodes();
        return array(
            'data'  => $name,
            'attr'  => array(
                'id' => $node->getPath(),
                'url_safe_id' => substr($node->getPath(), 1),
                'rel' => 'node'
            ),
            'state' => $has_children ? 'closed' : null,
        );
    }

    /**
     * Get the alias for this tree
     *
     * @return string
     */
    public function getAlias()
    {
        return 'phpcr_tree';
    }

    /**
     * Get an array describing the available node types
     *
     * @return array
     */
    public function getNodeTypes()
    {
        return array(
            'node' => array(
                'valid_children' => array('node'),
                'label' => 'Node',
            )
        );
    }

    /**
     * Get an array for labels.
     *
     * @return array
     */
    public function getLabels()
    {
        return array();
    }

}
