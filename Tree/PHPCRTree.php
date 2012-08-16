<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tree;

use Doctrine\Bundle\PHPCRBundle\ManagerRegistry;

use PHPCR\Util\NodeHelper;
use PHPCR\PropertyType;

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

    public function getProperties($path)
    {
        $node = $this->session->getNode($path);
        $properties = array();

        foreach ($node->getProperties() as $name => $property) {
            $entry = array(
                "name" => $name,
                "type" => PropertyType::nameFromValue($property->getType())
            );
            switch ($property->getType()) {
                case PropertyType::BINARY:
                    break;
                case PropertyType::BOOLEAN:
                case PropertyType::DATE:
                case PropertyType::DECIMAL:
                case PropertyType::DOUBLE:
                case PropertyType::LONG:
                case PropertyType::NAME:
                case PropertyType::STRING:
                case PropertyType::URI:
                    $entry['value'] = $property->getString();
                    break;
                case PropertyType::PATH:
                case PropertyType::WEAKREFERENCE:
                case PropertyType::REFERENCE:
                    $entry['value'] = $property->getPath();
            }

            // TODO: handle PATH/(WEAK)REFERENCE in frontend
            // TODO: handle BINARY in frontend (no value)
            $properties[] = $entry;
        }

        return $properties;
    }

    // TODO: this should be part of the interface. and the target should include the name to allow renames
    public function move($moved_path, $target_path)
    {
        $resulting_path = $target_path.'/'.basename($moved_path);

        $workspace = $this->session->getWorkspace();
        $workspace->move($moved_path, $target_path.'/'.basename($moved_path));

        return $resulting_path;
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
     *
     * @todo Some fixes: see comments inline
     */
    private function nodeToArray($name, $node)
    {
        $has_children = $node->hasNodes();
        return array(
            'data'  => $name,
            'attr'  => array(
                'id' => $node->getPath(),
                // TODO having children has nothing to do with being a folder node.
                'rel' => $has_children ? 'folder' : 'default',
                'classname' => $node->hasProperty('phpcr:class') ? $node->getProperty('phpcr:class')->getString() : null
            ),
            'state' => $has_children ? 'closed' : null,
        );
    }

}
