<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Form;
use PHPCR\PropertyType;

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
                $this->addFieldToForm($key, $ns.':'.$key, $nsForm, $builder);
            }
        }

        $builder->add($names);

        $localForm = $builder->create('local', 'form');
        $localForm->setPropertyPath('[local]');

        foreach ($props['local'] as $key => $val) {
            $this->addFieldToForm($key, $key, $localForm, $builder);
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

    private function addFieldToForm($key, $propName, $form, $builder)
    {
        $property = $this->getProperty($builder, $propName);
        $multiple = $property->isMultiple();

        if ($multiple) {
            $field = $this->getTypeParams($propName, $builder);
            $form->add($key, 'collection', array(
                'type' => $field[0],
                'options' => $field[1],
            ));
        } else {
            $field = $this->getTypeParams($propName, $builder);
            if ($field) {
                $form->add($key, $field[0], $field[1]);
            }
        }

    }

    private function getProperty($builder, $name)
    {
        $property = $type = $builder->getData()->getNode()->getProperty($name);
        return $property;
    }

    private function getTypeParams($name, $builder)
    {
        $type = $this->getProperty($builder, $name)->getType();

        switch ($type) {
        case PropertyType::STRING :
            return array('text', array());
        case PropertyType::BINARY :
            return null;
        case PropertyType::BOOLEAN :
            return array('checkbox', array());
        case PropertyType::LONG :
            return array('integer', array());
        case PropertyType::DOUBLE :
            return array('number', array('precision' => 2));
        case PropertyType::DECIMAL :
            return array('integer', array());
        case PropertyType::DATE :
            return array('datetime', array());
        case PropertyType::NAME :
            return array('text', array());

        case PropertyType::PATH :
            return array('text', array());
        case PropertyType::URI :
            return array('url', array());
        case PropertyType::UNDEFINED :
        case PropertyType::WEAKREFERENCE :
        case PropertyType::REFERENCE :
            return null;
        default:
            throw new \InvalidArgumentException('Unknown type (' . $type . ') given.');
        }
    }
}
