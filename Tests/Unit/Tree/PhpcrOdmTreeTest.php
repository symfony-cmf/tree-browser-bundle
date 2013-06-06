<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Unit\Tree;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Tree\PhpcrOdmTree;

class PhpcrOdmTreeTest extends \PHPUnit_Framework_TestCase
{
    public function setUp()
    {
        $this->dm = $this->getMockBuilder(
            'Doctrine\ODM\PHPCR\DocumentManager'
        )->disableOriginalConstructor()->getMock();

        $this->translator = $this->getMock(
            'Symfony\Component\Translation\TranslatorInterface'
        );

        $this->assetsHelper = $this->getMockBuilder(
            'Symfony\Component\Templating\Helper\CoreAssetsHelper'
        )->disableOriginalConstructor()->getMock();

        $this->document1 = new \stdClass;
        $this->document2 = new \stdClass;
        $this->document3 = new FoobarClass;
    }


    protected function getTreeInstance($validClasses = array())
    {
        return new PhpcrOdmTree(
            $this->dm,
            $this->translator,
            $this->assetsHelper,
            $validClasses
        );
    }

    public function testGetChildrenPathNotFound()
    {
        $this->dm->expects($this->once())
            ->method('find')
            ->with(null, '/foobar')
            ->will($this->returnValue(null));
        $res = $this->getTreeInstance()->getChildren('/foobar');
        $this->assertEquals(array(), $res);
    }

    public function provideGetChildren()
    {
        return array(

            // return 1 document with no valid classes
            array(array(
                'children' => array('document2'),
                'valid_classes' => array(
                ),
                'nb_expected' => 0,
            )),

            // return 1 document which is in the valid classes
            array(array(
                'children' => array('document2'),
                'valid_classes' => array(
                    'stdClass' => array(
                        'valid_children' => array(
                            'stdClass'
                        ),
                    ),
                ),
                'nb_expected' => 1,
            )),

            // return 2 documents, only document2 is valid
            array(array(
                'children' => array('document2', 'document3'),
                'valid_classes' => array(
                    'stdClass' => array(
                        'valid_children' => array(
                            'stdClass'
                        ),
                    ),
                ),
                'nb_expected' => 1,
            )),

            // return 2 documents, documents 2 and 3 are valid
            array(array(
                'children' => array('document2', 'document3'),
                'valid_classes' => array(
                    'stdClass' => array(
                        'valid_children' => array(
                            'stdClass',
                            'Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Unit\Tree\FoobarClass',
                        ),
                    ),
                ),
                'nb_expected' => 2,
            )),
        );
    }

    /**
     * @dataProvider provideGetChildren
     */
    public function testGetChildren($options)
    {
        $options = array_merge(array(
            'children' => array(),
            'valid_classes' => array(),
            'nb_expected' => 0,
        ), $options);

        $me = $this;

        $children = array();
        foreach ($options['children'] as $childVarName) {
            $children[] = $this->$childVarName;
        }

        $this->dm->expects($this->once())
            ->method('find')
            ->with(null, '/foobar')
            ->will($this->returnValue($this->document1));

        $this->dm->expects($this->any())
            ->method('getChildren')
            ->will($this->returnCallback(function ($document) use ($me, $children) {
                if ($document === $me->document1) {
                    return $children;
                }

                return array();
            }));

        $this->dm->expects($this->exactly($options['nb_expected']))
            ->method('getNodeForDocument')
            ->will($this->returnCallback(function ($document) use ($me) {
                $node = $me->getMockBuilder('Jackalope\Node')
                    ->disableOriginalConstructor()
                    ->getMock();
                return $node;
            }));

        $res = $this->getTreeInstance($options['valid_classes'])
            ->getChildren('/foobar');

        $this->assertCount($options['nb_expected'], $res);
    }

    public function provideMove()
    {
        return array(
            array('/path/to/source', '/path/to/destination', 'source'),
            array('/source', '/path/to/destination', 'source'),
        );
    }

    /**
     * @dataProvider provideMove
     */
    public function testMove($sourcePath, $targetPath, $name)
    {
        $this->dm->expects($this->once())
            ->method('find')
            ->with(null, $sourcePath)
            ->will($this->returnValue($this->document1));

        $this->dm->expects($this->once())
            ->method('move')
            ->with($this->document1, $targetPath.'/'.$name);

        $res = $this->getTreeInstance()->move($sourcePath, $targetPath);
        $this->assertEquals($targetPath.'/'.$name, $res);
    }

    public function testMoveNotFound()
    {
        $this->dm->expects($this->once())
            ->method('find')
            ->will($this->returnValue(null));

        $res = $this->getTreeInstance()->move('foo', 'bar');

        // this should surely be an exception
        $this->assertEquals(
            'No document found at "foo"', $res
        );
    }

    public function provideReorder()
    {
        return array(
            array('/foobar', '/foobar/source', '/foobar/target', false),
        );
    }

    /**
     * @dataProvider provideReorder
     */
    public function testReorder($parentPath, $sourcePath, $targetPath, $before)
    {
        $me = $this;
        $this->dm->expects($this->once())
            ->method('find')
            ->with(null, $parentPath)
            ->will($this->returnCallback(function ($path) use ($me) {
                if ($path == 'not_exist') {
                    return null;
                }

                return $me->document1;
            }));

        $this->dm->expects($this->once())
            ->method('reorder')
            ->with($this->document1, 'source', 'target', $before);

        $this->dm->expects($this->once())
            ->method('flush');

        $this->getTreeInstance()->reorder($parentPath, $sourcePath, $targetPath, $before);
    }

    public function testGetNodeTypes()
    {
        $this->markTestIncomplete();
    }
}

class FoobarClass extends \stdClass{
}
