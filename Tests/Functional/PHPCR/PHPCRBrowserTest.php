<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Functional\PHPCR;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Functional\BaseTestCase;

/**
 * Functional test for PHPCRBrowser
 *
 * @author Jacopo Jakuza Romei <jromei@gmail.com>
 */
class PHPCRBrowserTest extends BaseTestCase
{

    public function testGetChildrenListFromRoot()
    {
        $this->loadFixtures();

        $client = $this->createClient();

        $client->request('GET', '/_symfony_cmf_tree/phpcr_tree/children');

        $this->assertEquals(
            $client->getResponse()->getContent(),
            '[{"data":"cms","attr":{"id":"\/cms","url_safe_id":"cms","rel":"node"},"state":"closed","children":[{"data":"content","attr":{"id":"\/cms\/content","url_safe_id":"cms\/content","rel":"node"},"state":"closed"}]},{"data":"menus","attr":{"id":"\/menus","url_safe_id":"menus","rel":"node"},"state":"closed","children":[{"data":"test","attr":{"id":"\/menus\/test","url_safe_id":"menus\/test","rel":"node"},"state":null}]}]'
        );
    }

    public function testGetChildrenListFromInnerNode()
    {
        $this->loadFixtures();

        $client = $this->createClient();

        $crawler = $client->request('GET', '/_symfony_cmf_tree/phpcr_tree/children?root=%2Fcms%2Fcontent');

        $this->assertEquals(
            $client->getResponse()->getContent(),
            '[{"data":"static","attr":{"id":"\/cms\/content\/static","url_safe_id":"cms\/content\/static","rel":"node"},"state":"closed","children":[{"data":"test","attr":{"id":"\/cms\/content\/static\/test","url_safe_id":"cms\/content\/static\/test","rel":"node"},"state":null}]}]'
        );
    }

    protected function loadFixtures()
    {
        self::$kernel = self::createKernel();
        self::$kernel->init();
        self::$kernel->boot();

        $session = self::$kernel->getContainer()->get('doctrine_phpcr.session');
        if ($session->nodeExists("/cms")) {
            $session->getNode("/cms")->remove();
        }
        if ($session->nodeExists("/menus")) {
            $session->getNode("/menus")->remove();
        }

        $node = $session->getRootNode()->addNode('cms', 'nt:unstructured');
        $node = $node->addNode('content', 'nt:unstructured');
        $node = $node->addNode('static', 'nt:unstructured');
        $node->addNode('test', 'nt:unstructured');

        $node = $session->getRootNode()->addNode('menus', 'nt:unstructured');
        $node->addNode('test', 'nt:unstructured');

        $session->save();
    }

}