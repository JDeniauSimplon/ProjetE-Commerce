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
        $user1->setFirstName('Emma');
        $user1->setLastName('Martin');
        $user1->setEmail('emma.martin@gmail.com');
        $user1->setCreatedAt(new \DateTime());
        
        $user2 = new User();
        $user2->setFirstName('Lucas');
        $user2->setLastName('Lefevre');
        $user2->setEmail('lucas.lefevre@gmail.com');
        $user2->setCreatedAt(new \DateTime());
        
        $user3 = new User();
        $user3->setFirstName('Chloé');
        $user3->setLastName('Bernard');
        $user3->setEmail('chloe.bernard@gmail.com');
        $user3->setCreatedAt(new \DateTime());
        
        $user4 = new User();
        $user4->setFirstName('Gabriel');
        $user4->setLastName('Robert');
        $user4->setEmail('gabriel.robert@gmail.com');
        $user4->setCreatedAt(new \DateTime());
        
        $user5 = new User();
        $user5->setFirstName('Léa');
        $user5->setLastName('Dubois');
        $user5->setEmail('lea.dubois@gmail.com');
        $user5->setCreatedAt(new \DateTime());
        
        $manager->persist($user1);
        $manager->persist($user2);
        $manager->persist($user3);
        $manager->persist($user4);
        $manager->persist($user5);
        $this->addReference('user1', $user1);
        $this->addReference('user2', $user2);
        $this->addReference('user3', $user3);
        $this->addReference('user4', $user4);
        $this->addReference('user5', $user5);

        $manager->flush();
    }
}