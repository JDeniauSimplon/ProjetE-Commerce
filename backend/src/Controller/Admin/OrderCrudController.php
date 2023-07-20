<?php

namespace App\Controller\Admin;

use App\Entity\Order;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;

class OrderCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Order::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle('index', 'Commandes')
            ->setEntityLabelInSingular('Commande')
            ->setEntityLabelInPlural('Commandes');
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            IntegerField::new('id')->hideOnForm()->hideOnIndex(),
            ChoiceField::new('status', 'Statut')->setChoices([
                'En cours' => 'En cours',
                'Terminé' => 'Terminé',
                'Annulé' => 'Annulé',
            ]),
            AssociationField::new('user', 'Utilisateur'), 
            AssociationField::new('coupons', 'Coupon'), 
            DateTimeField::new('createdAt', 'Date de création')->hideOnForm(),
            TextField::new('reference', 'Référence')->hideOnForm(),
        ];
    }
    
}
