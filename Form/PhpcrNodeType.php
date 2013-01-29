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
        $names = $builder->create('namespaces', 'form');
        $names->setPropertyPath('[namespaces]');

        $props = $builder->getData()->getProperties();

        foreach ($props['namespaces'] as $ns => $keyVal) {
            if (!$names->has($ns)) {
                $nsForm = $builder->create($ns, 'form');
                $nsForm->setPropertyPath('['.$ns.']');
                $names->add($nsForm);
            }

            $nsForm = $names->get($ns);
            foreach ($keyVal as $key => $val) {
                if (is_scalar($val)) {
                    $nsForm->add($key);
                }
            }
        }

        $builder->add($names);

        $localForm = $builder->create('local', 'form');
        $localForm->setPropertyPath('[local]');

        foreach ($props['local'] as $key => $val) {
            if (is_scalar($val)) {
                $localForm->add($key);
            }
        }

        $builder->add($localForm);
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
