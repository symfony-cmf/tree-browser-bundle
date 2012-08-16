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
        $client = $this->createClient();

        $crawler = $client->request('GET', '/children');

        $this->assertEquals(
            $crawler->text(),
            '[{"text":"jcr:system","id":"\/jcr:system","hasChildren":true},{"text":"cms","id":"\/cms","hasChildren":true},{"text":"menus","id":"\/menus","hasChildren":true}]'
        );
    }

    public function testGetChildrenListFromInnerNode()
    {
        $client = $this->createClient();

        $crawler = $client->request('GET', '/children?root=%2Fcms%2Fcontent');

        $this->assertEquals(
            $crawler->text(),
            '[{"text":"static","id":"\/cms\/content\/static","hasChildren":true}]'
        );
    }

    public function testGetNodeProperties()
    {
        $client = $this->createClient();

        $crawler = $client->request('GET', '/properties?root=%2Fcms%2Fcontent%2Fstatic%2Fhome');

        $this->assertStringStartsWith(
            '[{"name":"title","value":"Homepage"},{"name":"name","value":"home"}',
            $crawler->text()
        );
    }


}