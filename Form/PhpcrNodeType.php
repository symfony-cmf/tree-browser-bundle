<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Form;

/**
 * Form type for a PHPCR node
 *
 * @author Daniel Leech <daniel@dantleech.com>
 */
class PhpcrNodeType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $named = $builder->create('named', 'form');
        $local = $builder->create('local', 'form');
        foreach($builder->getData()->getProperties() as $name => $property) {

            if (preg_match('&^(.*?):(.*)$&', $name, $matches)) {
                list($namespace, $localName) = array($matches[1], $matches[2]);
                if (!$named->has($namespace)) {
                    $nsForm = $builder->create($namespace, 'form');
                }

                $nsForm = $named->get($namespace);
                $nsForm->add($localName);
            } else {
                $local->add($field);
                //$field->setPropertyPath('['.$name.']');
            }
        }

        $builder->add($named);
        $builder->add($local);
    }

    public function getDefaultOptions(array $options)
    {
        $options = parent::getDefaultOptions($options);
        return $options;
    }

    public function getName()
    {
        return 'phpcr_node';
    }
}
