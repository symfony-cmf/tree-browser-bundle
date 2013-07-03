<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Unit\Tree;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Tree\PhpcrOdmTree;
use Symfony\Cmf\Bundle\TreeBrowserBundle\Form\Type\TreeManagerType;

class TreeManagerTypeTest extends \PHPUnit_Framework_TestCase
{
    public function setUp()
    {
        $this->formView = $this->getMock('Symfony\Component\Form\FormView');

        $this->form = $this->getMockBuilder(
            'Symfony\Component\Form\Form'
        )->disableOriginalConstructor()->getMock();

        $this->optionsResolver = $this->getMock('Symfony\Component\OptionsResolver\OptionsResolverInterface');

        $this->type = new TreeManagerType;
    }

    public function testBuildView()
    {
        $options = array(
            'root' => '/',
            'create_in_overlay' => false,
            'edit_in_overlay' => false,
        );

        $this->type->buildView($this->formView, $this->form, $options);
    }

    public function testDefaultOptions()
    {
        $this->type->setDefaultOptions($this->optionsResolver);
    }
}
