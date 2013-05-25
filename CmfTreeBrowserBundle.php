<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\PassConfig;

use Symfony\Cmf\Bundle\TreeBrowserBundle\DependencyInjection\Compiler\AddTreesCompilerPass;

class CmfTreeBrowserBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);
        $container->addCompilerPass(new AddTreesCompilerPass(), PassConfig::TYPE_BEFORE_OPTIMIZATION);
    }

}
