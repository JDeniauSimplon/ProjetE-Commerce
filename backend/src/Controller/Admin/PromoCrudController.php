<?php

namespace App\Controller\Admin;

use App\Entity\Promo;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;


class PromoCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Promo::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle('index', 'Promos')
            ->setEntityLabelInSingular('Promo')
            ->setEntityLabelInPlural('Promos');
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IntegerField::new('id')->hideOnForm()->hideOnIndex(),
            TextField::new('code', 'Code'),
            IntegerField::new('discount', 'Réduction'),
            DateTimeField::new('end_date', 'Date de fin'),
            TextField::new('campaign', 'Campagne'),
        ];
    }
}
