<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Unit\Model;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Model\PhpcrNode;

class PhpcrNodeTest extends \PHPUnit_Framework_TestCase
{
    public function setUp()
    {
        $this->node = $this->getMockBuilder('Jackalope\Node')
            ->disableOriginalConstructor()
            ->getMock();
    }

    protected function createProp($value)
    {
        $prop = $this->getMockBuilder('Jackalope\Property')
            ->disableOriginalConstructor()
            ->getMock();
        $prop->expects($this->any())
            ->method('getValue')
            ->will($this->returnValue($value));

        return $prop;
    }

    public function getProps()
    {
        return array(
            array(
                array(
                    'foo:test1' => 'val1',
                    'foo:test2' => 'val2',
                    'bar:test3' => 'val3',
                    'foobar' => 'val4',
                ),
                array(
                    'namespaces' => array(
                        'foo' => array(
                            'test1' => 'val1',
                            'test2' => 'val2',
                        ),
                        'bar' => array(
                            'test3' => 'val3',

                        ),
                    ),
                    'local' => array(
                        'foobar' => 'val4'
                    )
                )
            ),
        );
    }

    /**
     * @dataProvider getProps
     */
    public function testNode($propKeyValues, $expected)
    {
        $props = array();
        foreach ($propKeyValues as $propName => $propVal) {
            $props[$propName] = $this->createProp($propVal);
        }

        $this->node->expects($this->once())
            ->method('getProperties')
            ->will($this->returnValue($props));
        $this->phpcrNode = new PhpcrNode($this->node);
        $res = $this->phpcrNode->getProperties();

        $this->assertEquals($expected, $res);
    }
}
