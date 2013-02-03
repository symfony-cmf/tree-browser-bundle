<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Model;

use PHPCR\NodeInterface;

/**
 * Class to model wrap a PHPCR node for form updates
 *
 * @author Daniel Leech <daniel@dantleech.com>
 */
class PhpcrNode implements \ArrayAccess
{
    protected $node;

    protected $properties = array(
        'namespaces' => array(),
        'local' => array(),
    );

    public function __construct(NodeInterface $node)
    {
        $this->node = $node;
        $this->groupProperties($node);
    }

    private function groupProperties($node)
    {
        $properties = $node->getProperties();
        foreach ($properties as $name => $property) {
            $val = $property->getValue();

            if (preg_match('&^(.*?):(.*)$&', $name, $matches)) {

                list($namespace, $localName) = array($matches[1], $matches[2]);

                if (!isset($this->properties['namespaces'][$namespace])) {
                    $this->properties['namespaces'][$namespace] = array();
                }

                if ($val instanceOf NodeInterface) {
                    continue;
                }
               
                $this->properties['namespaces'][$namespace][$localName] = $val;
            } else {
                $this->properties['local'][$name] = $val;
            }
        }
    }

    public function getProperties()
    {
        return $this->properties;
    }

    public function getNode()
    {
        return $this->node;
    }

    public function offsetExists($offset)
    {
        return isset($this->properties[$offset]);
    }

    public function offsetGet($offset)
    {
        $val = $this->properties[$offset];
        return $val;
    }

    public function offsetSet($offset, $value)
    {
        return $this->node->setProperty($offset, $value);
    }

    public function offsetUnset($offset)
    {
        throw new \Exception('Not implemented');
    }
}
