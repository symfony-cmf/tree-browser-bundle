<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Functional\Form;

use PHPCR\PropertyType;
use Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Functional\BaseTestCase;
use Symfony\Cmf\Bundle\TreeBrowserBundle\Form\PhpcrNodeType;
use Symfony\Cmf\Bundle\TreeBrowserBundle\Model\PhpcrNode;

class PhpcrNodeTypeTest extends BaseTestCase
{
    public function setUp()
    {
        self::$kernel = self::createKernel();
        self::$kernel->init();
        self::$kernel->boot();

        $session = self::$kernel->getContainer()->get('doctrine_phpcr.session');
        $this->node = $session->getRootNode()->addNode('form_test', 'nt:unstructured');
        $this->node->setProperty('string', 'val', PropertyType::STRING);
        $this->node->setProperty('boolean', 'val', PropertyType::BOOLEAN);
        $this->node->setProperty('long', '123', PropertyType::LONG);
        $this->node->setProperty('double', '123.12', PropertyType::DOUBLE);
        $this->node->setProperty('decimal', '123', PropertyType::DECIMAL);
        $this->node->setProperty('date', '2013/01/30', PropertyType::DATE);
        $this->node->setProperty('name', 'val', PropertyType::NAME);
        $this->node->setProperty('path', 'val', PropertyType::PATH);
        // $this->node->setProperty('reference', 'val', PropertyType::REFERENCE);
        // $this->node->setProperty('weakreference', 'val', PropertyType::WEAKREFERENCE);
        $this->node->setProperty('uri', 'val', PropertyType::URI);
        $this->node->setProperty('undefined', 'val', PropertyType::UNDEFINED);

        // multiple
        $this->node->setProperty('multiple', array('val'), PropertyType::STRING);

        $this->formFactory = self::$kernel->getContainer()->get('form.factory');
    }

    public function testForm()
    {
        $wrapppedNode = new PhpcrNode($this->node);
        $form = $this->formFactory->create(new PhpcrNodeType, $wrapppedNode);
    }

    public function tearDown()
    {
        self::$kernel->shutdown();
    }
}
