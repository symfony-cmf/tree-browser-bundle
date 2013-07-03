<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Tree;

use PHPCR\Util\NodeHelper;

use Symfony\Component\Translation\TranslatorInterface;
use Symfony\Component\Templating\Helper\CoreAssetsHelper;
use Symfony\Cmf\Bundle\TreeBrowserBundle\Tree\TreeInterface;

use Doctrine\Common\Util\ClassUtils;
use Doctrine\ODM\PHPCR\DocumentManager;
use Doctrine\ODM\PHPCR\Document\Generic;

/**
 * A tree implementation to work with Doctrine PHPCR-ODM
 *
 * Your documents need to map all children with an Children mapping for the
 * tree to see its children. Not having the Children annotation is a
 * possibility to not show children you do not want to show.
 *
 * @author David Buchmann <david@liip.ch>
 * @author Uwe Jäger <uwej711@googlemail.com>
 */
class PhpcrOdmTree implements TreeInterface
{
    const VALID_CLASS_ALL = 'all';

    protected $icons = array(
        'undefined' => 'bundles/cmftreebrowser/images/folder.png',
        'folder' => 'bundles/cmftreebrowser/images/folder.png',
    );

    /**
     * @var DocumentManager
     */
    private $dm;

    /**
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * @var CoreAssetsHelper
     */
    private $assetHelper;

    /**
     * List of the valid class names that may be used as tree "ref" fields
     * @var array
     */
    private $mapping;

    public function __construct(
        DocumentManager $dm, 
        TranslatorInterface $translator, 
        CoreAssetsHelper $assetHelper, 
        array $mapping
    )
    {
        $this->dm = $dm;
        $this->translator = $translator;
        $this->assetHelper = $assetHelper;
        $this->mapping = $mapping;
    }

    /**
     * {@inheritDoc}
     */
    public function getChildren($path)
    {
        $children = array();
        $root = $this->dm->find(null, $path);

        if (!$root) {
            return $children;
        }

        foreach ($this->dm->getChildren($root) as $child) {

            // ignore system nodes
            if (
                $child instanceof Generic &&
                NodeHelper::isSystemItem($child->getNode())
            ) {
                continue;
            }

            // ignore classes not found in mapping
            if (false === $this->isValidDocumentChild($root, $child)) {
                continue;
            }

            $child = $this->documentToArray($child);

            // can probably optimize this with fetch depth above
            // somehow.
            $grandChildren = $this->dm->getChildren($child);

            foreach ($grandChildren as $grandChild) {
                $child['children'][] = $this->documentToArray($grandChild);
            }

            $children[] = $child;
        }

        return $children;
    }

    /**
     * {@inheritDoc}
     */
    public function move($sourcePath, $targetPath)
    {
        $targetBasePath = $targetPath.'/'.basename($sourcePath);

        $document = $this->dm->find(null, $sourcePath);

        if (null === $document) {
            return sprintf('No document found at "%s"', $sourcePath);
        }

        $this->dm->move($document, $targetBasePath);
        $this->dm->flush();

        return $targetBasePath;
    }

    /**
     * Returns an array representation of the document
     *
     * @param object $document
     *
     * @return array
     */
    private function documentToArray($document)
    {
        $className = ClassUtils::getClass($document);
        $node = $this->dm->getNodeForDocument($document);
        $id = $node->getIdentifier();
        $urlSafeId = $id;
        $label = $this->getDocumentLabel($document);

        $rel = in_array($className, array_keys($this->mapping)) ? $className : 'undefined';
        $rel = $this->normalizeClassname($rel);

        return array(
            'data'  => $label,
            'attr'  => array(
                'id' => $id,
                'url_safe_id' => $urlSafeId,
                'rel' => $rel
            ),
            'state' => $node->hasNodes() ? 'closed' : null,
        );
    }

    private function getDocumentLabel($document)
    {
        $label = '';

        if (method_exists($document, '__toString')) {
            $label = (string)$document;
        }

        if (strlen($label) > 18) {
            // TODO: tooltip with full name?
            $label = substr($label, 0, 17) . '...';
        }

        $label .= ' <not editable>';

        return $label;
    }


    /**
     * @param $document - Parent document
     * @param $child    - Child document
     *
     * @return bool TRUE if valid, FALSE if not vaild
     */
    private function isValidDocumentChild($parent, $child)
    {
        $parentClassName = ClassUtils::getClass($parent);
        $childClassName = ClassUtils::getClass($child);

        if (!isset($this->mapping[$parentClassName])) {
            // no mapping means no valid children
            return false;
        }

        $validClass = $this->mapping[$parentClassName];

        $showAll = false;
        if (isset($validClass['valid_children'][0])) {
            $showAll = $validClass['valid_children'][0] === self::VALID_CLASS_ALL;
        }

        $isValidChild = in_array($childClassName, $validClass['valid_children']);

        return $showAll || $isValidChild;
    }

    /**
     * {@inheritDoc}
     */
    public function reorder($parentPath, $sourcePath, $targetPath, $before)
    {
        $parentDocument = $this->dm->find(null, $parentPath);

        $this->dm->reorder(
            $parentDocument, 
            basename($sourcePath), 
            basename($targetPath), 
            $before
        );

        $this->dm->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getAlias()
    {
        return 'phpcr_odm_tree';
    }

    /**
     * {@inheritDoc}
     */
    public function getNodeTypes()
    {
        $result = array();
        
        $result['undefined'] = array(
            'icon' => array(
                'image' => $this->assetHelper->getUrl($this->icons['undefined']),
            ),
            'valid_children' => 'all',
            'routes' => array(),
        );

        foreach ($this->mapping as $className => $classConfig) {

            $normalizedClassName = $this->normalizeClassname($className);

            $mapping = array();

            if (isset($classConfig['valid_children'])) {
                foreach ($classConfig['valid_children'] as $validChild) {
                    $mapping[] = $this->normalizeClassname($validChild);
                }
            }

            $icon = $this->icons['folder'];;

            if (!empty($classConfig['image'])) {
                $icon = $classConfig['image'];
            }

            $routes = array();

            $result[$normalizedClassName] = array(
                'icon' => array('image' => $this->assetHelper->getUrl($icon)),
                'label' => $className,
                'valid_children' => $mapping,
                'routes' => $routes
            );
        }

        return $result;
    }

    /**
     * {@inheritDoc}
     *
     * @note: what is this for??
     */
    public function getLabels()
    {
        return array(
            'createItem' => $this->translator->trans(
                'create_item', array(), 'CmfTreeBrowserBundle'
            ),
            'deleteItem' => $this->translator->trans(
                'delete_item', array(), 'CmfTreeBrowserBundle'
            ),
        );
    }

    private function normalizeClassname($className)
    {
        return str_replace('\\', '_', $className);
    }
}
