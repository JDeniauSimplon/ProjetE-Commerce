<?php

namespace App\Controller\Admin;

use App\Entity\Product;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;


class ProductCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Product::class;
    }
    
    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle('index', 'Produits')
            ->setEntityLabelInSingular('Produit')
            ->setEntityLabelInPlural('Produits');
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            AssociationField::new('category', 'Catégorie')->formatValue(function ($value, $entity) {
                return $entity->getCategory() ? $entity->getCategory()->getName() : '';
            }),
            IntegerField::new('id')->hideOnForm()->hideOnIndex(),
            ImageField::new('images', 'Images')
                ->setBasePath('/uploads/images')
                ->setUploadDir('public/uploads/images') // Set the upload directory path here
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false),
            TextField::new('name', 'Nom'),
            IntegerField::new('stock', 'Stock'),
            MoneyField::new('price', 'Prix')->setCurrency('EUR')->setStoredAsCents(false),
            TextField::new('description', 'Description')->hideOnIndex(),
            DateTimeField::new('createdAt', 'Date de création'),
        ];
    }
}
