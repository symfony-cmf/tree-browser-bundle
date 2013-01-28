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

    public function __construct(NodeInterface $node)
    {
        $this->node = $node;
    }

    public function getProperties()
    {
        return $this->node->getProperties();
    }

    public function offsetExists($offset)
    {
        return $this->node->hasProperty($offset);
    }

    public function offsetGet($offset)
    {
        $val = $this->node->getProperty($offset)->getValue();
        if (is_object($val)) {
            return null;
        }
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
