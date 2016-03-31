<?php

/*
 * This file is part of the Symfony CMF package.
 *
 * (c) 2011-2015 Symfony CMF
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

$file = __DIR__.'/../vendor/autoload.php';
if (!file_exists($file)) {
    throw new RuntimeException('Run "composer update --dev" to run test suite.');
}

require_once $file;

if (!class_exists('Symfony\\Component\\ClassLoader\\UniversalClassLoader')) {
    throw new RuntimeException('Run "composer update --dev" to run test suite. (You seem to have missed the --dev part.)');
}

use Doctrine\Common\Annotations\AnnotationRegistry;
use Symfony\Component\ClassLoader\UniversalClassLoader;

$loader = new UniversalClassLoader();
AnnotationRegistry::registerLoader(function ($class) use ($loader) {
    $loader->loadClass($class);

    return class_exists($class, false);
});
AnnotationRegistry::registerFile(__DIR__.'/../vendor/doctrine/phpcr-odm/lib/Doctrine/ODM/PHPCR/Mapping/Annotations/DoctrineAnnotations.php');
