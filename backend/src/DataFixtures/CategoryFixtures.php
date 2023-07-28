<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Category;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $categories = ['Épicerie Salée', 'Épicerie Sucrée', 'Produits Frais', 'Boisson', 'Animalerie'];

        foreach ($categories as $categoryName) {
            $category = new Category();
            $category->setName($categoryName);
            $manager->persist($category);

          
            $this->addReference($categoryName, $category);
        }

        $manager->flush();
    }
}
