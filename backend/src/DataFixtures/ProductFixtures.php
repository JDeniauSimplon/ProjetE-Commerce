<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Product;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use App\Entity\Category;


class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
    
        $product1 = new Product();
        $product1->setName('Chips de pomme de terre');
        $product1->setDescription('Description pour les chips de pomme de terre');
        $product1->setImages('url_image_pour_chips');  
        $product1->setStock(50);
        $product1->setPrice(1.99);
        $product1->setCategory($this->getReference('Épicerie Salée'));
        $product1->setCreatedAt(new \DateTime());

        $product2 = new Product();
        $product2->setName('Coca Cola');
        $product2->setDescription('Description pour le cocacola');
        $product2->setImages('url_image_pour_cocacola');  
        $product2->setStock(100);
        $product2->setPrice(1.99);
        $product2->setCategory($this->getReference('Boisson'));
        $product2->setCreatedAt(new \DateTime());

        $product3 = new Product();
        $product3->setName('Oréo');
        $product3->setDescription('Description pour les oréos');
        $product3->setImages('url_image_pour_oreo');  
        $product3->setStock(500);
        $product3->setPrice(1.00);
        $product3->setCategory($this->getReference('Épicerie Sucrée'));
        $product3->setCreatedAt(new \DateTime());

        $product4 = new Product();
        $product4->setName('Tomates');
        $product4->setDescription('Description pour les tomates');
        $product4->setImages('url_image_pour_tomates');  
        $product4->setStock(50);
        $product4->setPrice(0.59);
        $product4->setCategory($this->getReference('Produits Frais'));
        $product4->setCreatedAt(new \DateTime());

        $product5 = new Product();
        $product5->setName('Sac de croquettes');
        $product5->setDescription('Description pour les sacs de croquettes');
        $product5->setImages('url_image_pour_sac_croquettes');  
        $product5->setStock(50);
        $product5->setPrice(1.99);
        $product5->setCategory($this->getReference('Animalerie'));
        $product5->setCreatedAt(new \DateTime());

        $manager->persist($product1);
        $manager->persist($product2);
        $manager->persist($product3);
        $manager->persist($product4);
        $manager->persist($product5);
    
        $manager->flush();
    }
}
