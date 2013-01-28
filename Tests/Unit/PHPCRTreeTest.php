<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Unit;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Tree\PHPCRTree;

use PHPCR\PropertyType;

/**
 * Unit test for PHPCRTree class
 *
 * @author Jacopo Jakuza Romei <jromei@gmail.com>
 * @see \Symfony\Cmf\Bundle\TreeBrowserBundle\Tree\PHPCRTree
 *
 */
class PHPCRTreeTest extends \PHPUnit_Framework_TestCase
{
    public function setUp()
    {
        $this->com = $this->getMockBuilder('Jackalope\Node')->
            disableOriginalConstructor()->
            getMock();

        $this->session = $this->getMockBuilder('PHPCR\SessionInterface')->
            disableOriginalConstructor()->
            getMock();

        $this->session->expects($this->any())->
                method('getNode')->
                with('/com')->
                will($this->returnValue($this->com));

        $this->registry = $this->getMockBuilder('Doctrine\Bundle\PHPCRBundle\ManagerRegistry')->
            disableOriginalConstructor()->
            getMock();

        $this->registry->expects($this->any())->
            method('getConnection')->
            with('default')->
            will($this->returnValue($this->session));

        $this->tree = new PHPCRTree($this->registry, 'default');
    }

    public function testPHPCRChildren()
    {
        $node_mock_prototype = $this->getMockBuilder('Jackalope\Node')->
            disableOriginalConstructor()->
            setMethods(array('getPath', 'getNodes'));

        $grandson = $node_mock_prototype->getMock();
        $grandson->expects($this->any())->
                method('getPath')->
                will($this->returnValue('/com/anonimarmonisti/grandson'));
        $grandson->expects($this->any())->
                method('getNodes')->
                will($this->returnValue(array()));

        $grandchildren = array(
            'grandson'   => $grandson,
        );

        $anonimarmonisti = $node_mock_prototype->getMock();
        $anonimarmonisti->expects($this->any())->
                method('getPath')->
                will($this->returnValue('/com/anonimarmonisti'));
        $anonimarmonisti->expects($this->any())->
                method('getNodes')->
                will($this->returnValue($grandchildren));

        $romereview = $node_mock_prototype->getMock();
        $romereview->expects($this->any())->
                method('getPath')->
                will($this->returnValue('/com/romereview'));
        $romereview->expects($this->any())->
                method('getNodes')->
                will($this->returnValue(array()));

        $_5etto = $node_mock_prototype->getMock();
        $_5etto->expects($this->any())->
                method('getPath')->
                will($this->returnValue('/com/5etto'));
        $_5etto->expects($this->any())->
                method('getNodes')->
                will($this->returnValue(array()));

        $wordpress = $node_mock_prototype->getMock();
        $wordpress->expects($this->any())->
                method('getPath')->
                will($this->returnValue('/com/wordpress'));
        $wordpress->expects($this->any())->
                method('getNodes')->
                will($this->returnValue(array()));

        $children = array(
            'anonimarmonisti'   => $anonimarmonisti,
            'romereview'        => $romereview,
            '5etto'             => $_5etto,
            'wordpress'         => $wordpress,
        );

        $this->com->expects($this->exactly(1))->
                method('getNodes')->
                will($this->returnValue($children));

        $expected = array (
            array (
                'data'      => 'anonimarmonisti',
                'attr'      => array(
                                'id'            => '/com/anonimarmonisti',
                                'url_safe_id'   => 'com/anonimarmonisti',
                                'rel'           => 'node',
                            ),
                'state'     =>  null,
                'children'  => array(
                    array(
                        'data'      => 'grandson',
                        'attr'      => array(
                                        'id'            => '/com/anonimarmonisti/grandson',
                                        'url_safe_id'   => 'com/anonimarmonisti/grandson',
                                        'rel'           => 'node',
                                    ),
                        'state' =>  null,
                    ),
                ),
            ),
            array (
                'data' => 'romereview',
                'attr' => array(
                    'id'            => '/com/romereview',
                    'url_safe_id'   => 'com/romereview',
                    'rel'           => 'node',
                ),
                'state' => null,
            ),
            array (
                'data' => '5etto',
                'attr' => array(
                    'id'            => '/com/5etto',
                    'url_safe_id'   => 'com/5etto',
                    'rel'           => 'node',
                ),
                'state' => null,
            ),
            array (
                'data' => 'wordpress',
                'attr' => array(
                    'id'            => '/com/wordpress',
                    'url_safe_id'   => 'com/wordpress',
                    'rel'           => 'node',
                ),
                'state' => null,
            )
        );

        $this->assertEquals($expected, $this->tree->getChildren('/com'));
    }

    public function testMoveNodes()
    {
        $workspace = $this->getMockBuilder('Jackalope\Workspace')->
            disableOriginalConstructor()->
            setMethods(array('move'))->
            getMock();

        $workspace->expects($this->once())
            ->method('move')
            ->with('/mother/litigated_son', '/father/litigated_son');

        $this->session->expects($this->once())
            ->method('getWorkspace')
            ->will($this->returnValue($workspace));

        $this->tree->move('/mother/litigated_son', '/father');
    }

}
