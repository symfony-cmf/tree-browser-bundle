<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Unit\Tree;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Form\Type\TreeModelType;

class TreeModelTypeTest extends \PHPUnit_Framework_TestCase
{
    public function setUp()
    {
        $this->formView = $this->getMock('Symfony\Component\Form\FormView');
        $this->formBuilder = $this->getMockBuilder(
            'Symfony\Component\Form\FormBuilder'
        )->disableOriginalConstructor()->getMock();

        $this->form = $this->getMockBuilder(
            'Symfony\Component\Form\Form'
        )->disableOriginalConstructor()->getMock();

        $this->optionsResolver = $this->getMock('Symfony\Component\OptionsResolver\OptionsResolverInterface');

        $this->type = new TreeModelType;
    }

    public function testBuildForm()
    {
        $this->formBuilder->expects($this->once())
            ->method('addModelTransformer');

        $this->formBuilder->expects($this->exactly(2))
            ->method('setAttribute');

        $options = array();
        $this->type->buildForm($this->formBuilder, $options);
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
