<?php

namespace Symfony\Cmf\Bundle\TreeBrowserBundle\Controller;

use Sonata\AdminBundle\Admin\Pool as SonataAdminPool;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Routing\RouterInterface;
use PHPCR\SessionInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

use Symfony\Cmf\Bundle\TreeBrowserBundle\Tree\PHPCRTree;
use Symfony\Cmf\Bundle\TreeBrowserBundle\Form\PhpcrNodeType;
use Symfony\Cmf\Bundle\TreeBrowserBundle\Model\PhpcrNode;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


/**
 * @author David Buchmann <mail@davidbu.ch>
 * @author Daniel Leech <daniel@dantleech.com>
 */
class PHPCRTreeBrowserController
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
     * @var BaseTemplate
     */
    protected $baseTemplate;

    /**
     * @param EngineInterface $templating the templating instance to render the
     *      template
     *
     * @param SessionInterface $phpcr
     */
    public function __construct(
        PHPCRTree $tree, 
        EngineInterface $templating, 
        FormFactoryInterface $formFactory, 
        RouterInterface $router, 
        SessionInterface $phpcr,
        $baseTemplate
    )
    {
        $this->tree = $tree;
        $this->templating = $templating;
        $this->formFactory = $formFactory;
        $this->router = $router;
        $this->phpcr = $phpcr;
        $this->baseTemplate = $baseTemplate;
    }

    protected function getNode(Request $request)
    {
        $id = $request->get('id');
        if (!$id) {
            throw new NotFoundHttpException('Missing parameter "id" parameter');
        }

        $node = $this->phpcr->getNode($id);
        if (!$node) {
            throw new NotFoundHttpException(sprintf('Cannot find node with id "%s"', $id));
        }

        return $node;
    }

    protected function createNodeForm($node)
    {
        $model = new PhpcrNode($node);
        $form = $this->formFactory->create(new PhpcrNodeType, $model);

        return $form;
    }

    public function indexAction(Request $request)
    {
        return new Response($this->templating->render(
            'SymfonyCmfTreeBrowserBundle:PHPCRTreeBrowser:index.html.twig', array(
                'base_template' => $this->baseTemplate
            )
        ));
    }

    /**
     * Action for the ajax subrequest of the tree to get the edit form.
     *
     * @param Request $request
     */
    public function nodeFormAction(Request $request)
    {
        $node = $this->getNode($request);
        $form = $this->createNodeForm($node);

        $html = $this->templating->render('SymfonyCmfTreeBrowserBundle:PHPCRTreeBrowser:form.html.twig', array(
            'form' => $form->createView(),
            'node' => $node,
        ));

        return new Response($html);
    }

    public function submitAction(Request $request)
    {
        $node = $this->getNode($request);

        $form = $this->createForm($node);

        // @todo handle  changing node types / primary node types

        $form->bindRequest($request);

        if ($form->isValid()) {

        }

        // $this->phpcr->save();

        return new RedirectResponse($this->router->generate('symfony_cmf_phpcr_browser_frontend', array('id'=>$id)));
    }
}
