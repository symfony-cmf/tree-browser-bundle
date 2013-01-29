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
     * @var SonataAdminPool
     */
    protected $adminPool;

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
        SonataAdminPool $adminPool
    )
    {
        $this->tree = $tree;
        $this->templating = $templating;
        $this->formFactory = $formFactory;
        $this->router = $router;
        $this->phpcr = $phpcr;
        $this->adminPool = $adminPool;
    }

    public function indexAction(Request $request)
    {
        return new Response($this->templating->render(
            'SymfonyCmfTreeBrowserBundle:PHPCRTreeBrowser:index.html.twig', array(
                // NOTE: This seemss like a good way to get the admin template
                //       but it couples this controller to Sonata.
                'admin_pool' => $this->adminPool
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
        $path = $request->query->get('root');
        $node = $this->tree->getSession()->getNode($path);
        $model = new PhpcrNode($node);

        $form = $this->formFactory->create(new PhpcrNodeType, $model);

        $html = $this->templating->render('SymfonyCmfTreeBrowserBundle:PHPCRTreeBrowser:form.html.twig', array(
            'form' => $form->createView(),
            'node' => $node,
        ));

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
