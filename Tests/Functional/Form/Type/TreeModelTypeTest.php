<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Functional\Form\Type;


use Symfony\Cmf\Component\Testing\Functional\BaseTestCase;

class TreeModelTypeTest extends BaseTestCase
{
    public function testCreate()
    {
        $fb = $this->getContainer()
            ->get('form.factory')
            ->createBuilder('form');

        $fb->add('tree', 'cmf_phpcr_odm_tree')
            ->getForm();

    }
}
