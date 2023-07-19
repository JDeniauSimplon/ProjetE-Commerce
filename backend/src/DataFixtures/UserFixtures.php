<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $user1 = new User();
        $user1->setName('Product 1');
        $user1->setDescription('Description for product 1');
        $user1->setPrice(10.99);
        // ...set any other properties...

        $product2 = new Product();
        $product2->setName('Product 2');
        $product2->setDescription('Description for product 2');
        $product2->setPrice(15.99);
        // ...set any other properties...

        // etc.

        // Persistez les produits à la base de données
        $manager->persist($product1);
        $manager->persist($product2);
        // etc.

        $manager->flush();
    }
}