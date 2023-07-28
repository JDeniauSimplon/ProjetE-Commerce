<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use App\Entity\Order;
use App\Entity\Product;
use App\Entity\Promo;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(UserCrudController::class)->generateUrl());
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('BackOffice')
            // ->setFaviconPath('favicon.svg')
            // ->renderSidebarMinimized()
            ;
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::section('Utilisateurs');
        yield MenuItem::linkToCrud('Liste', 'fas fa-user', User::class);

        yield MenuItem::section('Boutique');
        yield MenuItem::subMenu('Gestion boutique', 'fas fa-store')->setSubItems([
            MenuItem::linkToCrud('Catégories', 'fas fa-folder', Category::class),
            MenuItem::linkToCrud('Commandes', 'fas fa-shopping-cart', Order::class),
            MenuItem::linkToCrud('Produits', 'fas fa-cube', Product::class),
            MenuItem::linkToCrud('Promos', 'fas fa-tag', Promo::class),
        ])
        ;
        yield MenuItem::section('Réseaux sociaux');
        yield MenuItem::linkToUrl('Facebook', 'fab fa-facebook', 'https://www.facebook.com/votre-page')->setLinkTarget('_blank');
        yield MenuItem::linkToUrl('Twitter', 'fab fa-twitter', 'https://twitter.com/votre-compte')->setLinkTarget('_blank');
        yield MenuItem::linkToUrl('Instagram', 'fab fa-instagram', 'https://www.instagram.com/votre-compte')->setLinkTarget('_blank');
    }
}
