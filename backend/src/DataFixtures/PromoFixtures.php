<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Promo;

class PromoFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $promo1 = new Promo();
        $promo1->setCode('SOLDEDHIVER');
        $promo1->setDiscount(20);
        $promo1->setEndDate(new \DateTime());
        $promo1->setCampaign('Soldes d\'hiver');

        $promo2 = new Promo();
        $promo2->setCode('SOLDENOVEMBRE');
        $promo2->setDiscount(10);
        $promo2->setEndDate(new \DateTime());
        $promo2->setCampaign('Soldes de novembre');

        $manager->persist($promo1);
        $manager->persist($promo2);

        $this->addReference('promo1', $promo1);
        $this->addReference('promo2', $promo2);

        $manager->flush();
    }
}