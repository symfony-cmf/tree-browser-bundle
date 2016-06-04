<?php

/*
 * This file is part of the Symfony CMF package.
 *
 * (c) 2011-2015 Symfony CMF
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Cmf\Bundle\TreeBrowserbundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * A form type to select a node based on a tree browser.
 *
 * The widget option provides 2 different ways to display the form type:
 *
 * - browser
 *     Displays only the tree browsers;
 * - text
 *     Displays a text field with a button to select using the tree browser
 *     (just like a file browser).
 *
 * @author Wouter de Jong <wouter@wouterj.nl>
 */
class TreeSelectType extends AbstractType
{
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        parent::buildView($view, $form, $options);

        $view->vars['type'] = ('text' === $options['widget']) ? 'text' : 'hidden';
        $view->vars['root_path'] = '/'.ltrim($options['root_path']);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefault('widget', 'text');
        $resolver->setAllowedValues('widget', ['browser', 'text']);

        $resolver->setDefault('root_path', '/');
    }

    public function getBlockPrefix()
    {
        return 'cmf_tree_select';
    }

    public function getParent()
    {
        return TextType::class;
    }
}
