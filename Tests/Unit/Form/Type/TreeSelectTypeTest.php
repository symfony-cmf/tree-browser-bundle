<?php

/*
 * This file is part of the Symfony CMF package.
 *
 * (c) 2011-2015 Symfony CMF
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tests\Unit\Form\Type;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Form\Type\TreeSelectType;
use Symfony\Component\Form\Test\TypeTestCase;

class TreeSelectTypeTest extends TypeTestCase
{
    public function testSubmitText()
    {
        $form = $this->factory->create(TreeSelectType::class);

        $form->submit('/cms/content/about');

        $this->assertEquals('/cms/content/about', $form->getData());
    }

    /**
     * @expectedException \Symfony\Component\OptionsResolver\Exception\InvalidOptionsException
     */
    public function testInvalidWidgetValue()
    {
        $this->factory->create(TreeSelectType::class, null, [
            'widget' => 'fake',
        ]);
    }

    public function testBrowserWidget()
    {
        $form = $this->factory->create(TreeSelectType::class, null, [
            'widget' => 'browser',
        ]);

        $view = $form->createView();

        $this->assertEquals('hidden', $view->vars['type']);
    }

    public function testTextWidget()
    {
        $form = $this->factory->create(TreeSelectType::class, null, [
            'widget' => 'text',
        ]);

        $view = $form->createView();

        $this->assertEquals('text', $view->vars['type']);
    }
}
