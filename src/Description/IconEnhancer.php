<?php

/*
 * This file is part of the Symfony CMF package.
 *
 * (c) 2011-2017 Symfony CMF
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Description;

use Symfony\Cmf\Component\Resource\Description\Description;
use Symfony\Cmf\Component\Resource\Description\DescriptionEnhancerInterface;
use Symfony\Cmf\Component\Resource\Puli\Api\PuliResource;
use Symfony\Cmf\Component\Resource\Repository\Resource\CmfResource;

/**
 * A description enhancer to add custom tree node icons.
 *
 * @author Wouter de Jong <wouter@wouterj.nl>
 */
class IconEnhancer implements DescriptionEnhancerInterface
{
    private $iconMap;
    private $classMap = [];

    public function __construct(array $iconMap)
    {
        $this->iconMap = $iconMap;
    }

    public function enhance(Description $description)
    {
        $class = get_class($description->getResource()->getPayload());
        if (isset($this->classMap[$class])) {
            $class = $this->classMap[$class];
        }

        $description->set('icon', $this->iconMap[$class]);
    }

    public function supports(PuliResource $resource)
    {
        if (!$resource instanceof CmfResource) {
            return false;
        }

        $payload = $resource->getPayload();
        $payloadClass = get_class($payload);

        if (isset($this->iconMap[$payloadClass]) || isset($this->classMap[$payloadClass])) {
            return true;
        }

        foreach (array_keys($this->iconMap) as $class) {
            if (is_a($payload, $class) || is_subclass_of($payload, $class)) {
                $this->classMap[$payloadClass] = $class;

                return true;
            }
        }

        return false;
    }
}
