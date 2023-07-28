<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Order;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class OrderFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $user = $this->getReference('user1');

        $promo = $this->getReference('promo1');

        $order1 = new Order();
        $order1->setCreatedAt(new \DateTime());
        $order1->setCoupons($promo);
        $order1->setUser($user);
        $manager->persist($order1);
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
            PromoFixtures::class,
        ];
    }
}