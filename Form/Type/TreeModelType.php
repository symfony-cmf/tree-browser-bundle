<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;

use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\OptionsResolver\Options;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Tree\TreeInterface;

use Doctrine\Bundle\PHPCRBundle\Form\DataTransformer\DocumentToPathTransformer;

class TreeModelType extends AbstractType
{
    protected $tree;

    public function __construct(DocumentManager $dm, TreeInterface $tree)
    {
        $this->dm = $dm;
        $this->tree = $tree;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->addModelTransformer(new DocumentToPathTransformer($options['document_manager']));
    }

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        parent::buildView($view, $form, $options);
        $view->vars['tree'] = $this->tree;
        $view->vars['root_node'] = $form->getAttribute('root_node');
        $view->vars['select_root_node'] = $form->getAttribute('select_root_node');
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'template'          => 'doctrine_phpcr_odm_tree',
            'compound'          => false,
            'document_manager'     => null,
            'root_node'         => '/',
            'select_root_node'  => false,
        ));
    }

    public function getName()
    {
        return 'cmf_phpcr_odm_tree';
    }
}
