<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Routing\RouterInterface;
use PHPCR\SessionInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Tree\PHPCRTree;

/**
 * @author David Buchmann <mail@davidbu.ch>
 */
class BrowserController
{
    /**
     * @var PHPCRTree
     */
    protected $tree;
    /**
     * @var EngineInterface
     */
    protected $templating;
    /**
     * @var FormFactoryInterface
     */
    protected $formFactory;
    /**
     * @var RouterInterface
     */
    protected $routing;
    /**
     * @var SessionInterface
     */
    protected $phpcr;

    /**
     * @param EngineInterface $templating the templating instance to render the
     *      template
     *
     * @param SessionInterface $phpcr
     */
    public function __construct(PHPCRTree $tree, EngineInterface $templating, FormFactoryInterface $formFactory, RouterInterface $router, SessionInterface $phpcr)
    {
        $this->tree = $tree;
        $this->templating = $templating;
        $this->formFactory = $formFactory;
        $this->router = $router;
        $this->phpcr = $phpcr;
    }

    public function indexAction(Request $request)
    {
        return new Response($this->templating->render('SymfonyCmfTreeBrowserBundle:Browser:index.html.twig'));
    }

    /**
     * Action for the ajax subrequest of the tree to get the edit form.
     *
     * @param Request $request
     */
    public function formAction(Request $request)
    {
        $path = $request->query->get('root');
        $node = $this->tree->getSession()->getNode($path);

        $formBuilder = $this->formFactory->createBuilder('form', $node->getPropertiesValues());
        foreach($node->getProperties() as $name => $property) {
            $formBuilder->add($name);
        }
        $formBuilder->add('/new_property');

        $html = $this->templating->render('SymfonyCmfTreeBrowserBundle:Browser:form.html.twig', array('node'=>$node));

        return new Response($html);
    }

    public function submitAction(Request $request)
    {
        if (! $request->request->has('/id')) {
            throw new \Symfony\Component\HttpKernel\Exception\HttpException(400, 'missing parameter /id');
        }
        $id = $request->request->get('/id');
        $request->request->remove('/id');
        $node = $this->phpcr->getNode($id);
        $expecting = array();
        foreach ($node->getProperties() as $name => $value) {
            $expecting[$name] = true;
        }
        foreach ($request->request as $name => $value) {
            if ('jcr:primaryType' == $name) {
                if ($node->getPrimaryNodeType()->getName() != $value) {
                    $node->setPrimaryType($value);
                }
            } elseif ('jcr:mixinTypes' == $name) {
                // TODO: handle mixins
            } else {
                $type = null;
                if ($node->hasProperty($name)) {
                    // preserve type of existing properties (i.e. (weak)reference )
                    $type = $node->getProperty($name)->getType();
                }
                if ($node->hasProperty($name) && $node->getProperty($name)->isMultiple() && is_string($value) && 'true' == $value ) {
                    // if an empty multivalue property is edited, the value will be the non-array "true"
                    $value = array();
                }
                $node->setProperty($name, $value, $type);
            }
            unset($expecting[$name]);
        }
        foreach ($expecting as $name => $dummy) {
            $node->setProperty($name, null);
        }
        $this->phpcr->save();

        return new RedirectResponse($this->router->generate('symfony_cmf_phpcr_browser_frontend', array('id'=>$id)));
    }
}
