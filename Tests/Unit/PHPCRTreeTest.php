<?php

/*
 * This file is part of the Symfony CMF package.
 *
 * (c) 2011-2015 Symfony CMF
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Unit;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Tree\PHPCRTree;

/**
 * Unit test for PHPCRTree class.
 *
 * @author Jacopo Jakuza Romei <jromei@gmail.com>
 *
 * @see \Symfony\Cmf\Bundle\TreeBrowserBundle\Tree\PHPCRTree
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
            setMethods(['getPath', 'getNodes']);

        $grandson = $node_mock_prototype->getMock();
        $grandson->expects($this->any())->
                method('getPath')->
                will($this->returnValue('/com/anonimarmonisti/grandson'));
        $grandson->expects($this->any())->
                method('getNodes')->
                will($this->returnValue([]));

        $grandchildren = [
            'grandson'   => $grandson,
        ];

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
                will($this->returnValue([]));

        $_5etto = $node_mock_prototype->getMock();
        $_5etto->expects($this->any())->
                method('getPath')->
                will($this->returnValue('/com/5etto'));
        $_5etto->expects($this->any())->
                method('getNodes')->
                will($this->returnValue([]));

        $wordpress = $node_mock_prototype->getMock();
        $wordpress->expects($this->any())->
                method('getPath')->
                will($this->returnValue('/com/wordpress'));
        $wordpress->expects($this->any())->
                method('getNodes')->
                will($this->returnValue([]));

        $children = [
            'anonimarmonisti'   => $anonimarmonisti,
            'romereview'        => $romereview,
            '5etto'             => $_5etto,
            'wordpress'         => $wordpress,
        ];

        $this->com->expects($this->exactly(1))->
                method('getNodes')->
                will($this->returnValue($children));

        $expected =  [
             [
                'data'      => 'anonimarmonisti',
                'attr'      => [
                                'id'            => '/com/anonimarmonisti',
                                'url_safe_id'   => 'com/anonimarmonisti',
                                'rel'           => 'node',
                            ],
                'state'     => null,
                'children'  => [
                    [
                        'data'      => 'grandson',
                        'attr'      => [
                                        'id'            => '/com/anonimarmonisti/grandson',
                                        'url_safe_id'   => 'com/anonimarmonisti/grandson',
                                        'rel'           => 'node',
                                    ],
                        'state' => null,
                    ],
                ],
            ],
             [
                'data' => 'romereview',
                'attr' => [
                    'id'            => '/com/romereview',
                    'url_safe_id'   => 'com/romereview',
                    'rel'           => 'node',
                ],
                'state' => null,
            ],
             [
                'data' => '5etto',
                'attr' => [
                    'id'            => '/com/5etto',
                    'url_safe_id'   => 'com/5etto',
                    'rel'           => 'node',
                ],
                'state' => null,
            ],
             [
                'data' => 'wordpress',
                'attr' => [
                    'id'            => '/com/wordpress',
                    'url_safe_id'   => 'com/wordpress',
                    'rel'           => 'node',
                ],
                'state' => null,
            ],
        ];

        $this->assertEquals($expected, $this->tree->getChildren('/com'));
    }

    public function testMoveNodes()
    {
        $workspace = $this->getMockBuilder('Jackalope\Workspace')->
            disableOriginalConstructor()->
            setMethods(['move'])->
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
