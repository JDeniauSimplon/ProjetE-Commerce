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
        $product1->setName('Chips de pommes de terre');
        $product1->setDescription('Chips croustillantes à base de pommes de terre fraîches');
        $product1->setImages('246f460b1d98b25c63fef83992d9268deaa9fd2a.webp');
        $product1->setStock(479);
        $product1->setPrice('2.99');
        $product1->setCategory($this->getReference('Épicerie Salée'));
        $product1->setCreatedAt(new \DateTime('2023-07-20'));

        $product2 = new Product();
        $product2->setName('Olives vertes dénoyautées');
        $product2->setDescription('Olives vertes dénoyautées de qualité supérieure');
        $product2->setImages('a3d6d10d29277afa306dcc814b737bc823c0429f.webp');
        $product2->setStock(23);
        $product2->setPrice('3.49');
        $product2->setCategory($this->getReference('Épicerie Salée'));
        $product2->setCreatedAt(new \DateTime('2023-07-20'));

        $product3 = new Product();
        $product3->setName('Guacamole doux');
        $product3->setDescription('Guacamole doux à base d\'avocat frais');
        $product3->setImages('bb9471425d96aa16872c73cc8d917086175a4b4c.webp');
        $product3->setStock(412);
        $product3->setPrice('2.55');
        $product3->setCategory($this->getReference('Épicerie Salée'));
        $product3->setCreatedAt(new \DateTime('2023-07-20'));

        $product4 = new Product();
        $product4->setName('Cornichons au vinaigre');
        $product4->setDescription('Cornichons croquants et acides');
        $product4->setImages('8d92d23a9983fa8c3bdf1cfc709668ac4ab0f07d.webp');
        $product4->setStock(129);
        $product4->setPrice('2.49');
        $product4->setCategory($this->getReference('Épicerie Salée'));
        $product4->setCreatedAt(new \DateTime('2023-07-20'));

        $product5 = new Product();
        $product5->setName('Chips tortilla saveur nature');
        $product5->setDescription('Produit à base de maïs grillé');
        $product5->setImages('6e4ad7b3a694da6c81508daec8bd2afaaa925a83.webp');
        $product5->setStock(59);
        $product5->setPrice('1.89');
        $product5->setCategory($this->getReference('Épicerie Salée'));
        $product5->setCreatedAt(new \DateTime('2023-07-20'));

        $product6 = new Product();
        $product6->setName('Chocolat noir BIO 74% cacao');
        $product6->setDescription('Tablettes de chocolat noir BIO intense à 74% de cacao');
        $product6->setImages('360c0e6d2c05269fd51fb668b51b5f478f332288.webp');
        $product6->setStock(233);
        $product6->setPrice('1.19');
        $product6->setCategory($this->getReference('Épicerie Sucrée'));
        $product6->setCreatedAt(new \DateTime('2023-07-20'));

        $product7 = new Product();
        $product7->setName('Confiture de fraises');
        $product7->setDescription('Délicieuse confiture de fraises préparée avec des fruits frais');
        $product7->setImages('dee28631b112f0c23f5d0eb06998646e15d4ccf2.webp');
        $product7->setStock(321);
        $product7->setPrice('2.39');
        $product7->setCategory($this->getReference('Épicerie Sucrée'));
        $product7->setCreatedAt(new \DateTime('2023-07-20'));

        $product8 = new Product();
        $product8->setName('Miel bio de fleurs liquide');
        $product8->setDescription('Miel naturellement sucré, récolté auprès d\'apiculteurs locaux');
        $product8->setImages('93f04108f8472b09862ba06f7b4852b259251f79.webp');
        $product8->setStock(234);
        $product8->setPrice('5.6');
        $product8->setCategory($this->getReference('Épicerie Sucrée'));
        $product8->setCreatedAt(new \DateTime('2023-07-20'));

        $product9 = new Product();
        $product9->setName('Biscuits fourrés au chocolat');
        $product9->setDescription('Délicieux biscuit croustillant au blé complet et au chocolat');
        $product9->setImages('86950562a98ed03f3f88d5b9d89c39bb5eaea48a.webp');
        $product9->setStock(131);
        $product9->setPrice('1.49');
        $product9->setCategory($this->getReference('Épicerie Sucrée'));
        $product9->setCreatedAt(new \DateTime('2023-07-20'));

        $product10 = new Product();
        $product10->setName('Bonbons Nounours guimauve');
        $product10->setDescription('Bonbon de chocolat : Guimauve enrobée de chocolat au lait');
        $product10->setImages('ea95ec38762588bd52702fe9c9b1492831382111.webp');
        $product10->setStock(98);
        $product10->setPrice('6.35');
        $product10->setCategory($this->getReference('Épicerie Sucrée'));
        $product10->setCreatedAt(new \DateTime('2023-07-20'));

        $product11 = new Product();
        $product11->setName('Eau minérale gazeuse naturelle');
        $product11->setDescription('Eau minérale gazeuse naturelle provenant de sources pures et préservées');
        $product11->setImages('854e089e461502f51d5222b522ccf89e88c5bbcb.webp');
        $product11->setStock(89);
        $product11->setPrice('3');
        $product11->setCategory($this->getReference('Boisson'));
        $product11->setCreatedAt(new \DateTime('2023-07-20'));

        $product12 = new Product();
        $product12->setName('Jus d\'orange pressé');
        $product12->setDescription('Jus d\'orange frais pressé à partir d\'oranges juteuses');
        $product12->setImages('03a947a9d4ea2c219620df70007f6ab0aa84bd98.webp');
        $product12->setStock(125);
        $product12->setPrice('1.28');
        $product12->setCategory($this->getReference('Boisson'));
        $product12->setCreatedAt(new \DateTime('2023-07-20'));

        $product13 = new Product();
        $product13->setName('Coca cola');
        $product13->setDescription('Boisson rafraîchissante aux extraits végétaux');
        $product13->setImages('ec11269dab8a9d1b52466429bec5f6708d35cabf.webp');
        $product13->setStock(189);
        $product13->setPrice('3.85');
        $product13->setCategory($this->getReference('Boisson'));
        $product13->setCreatedAt(new \DateTime('2023-07-20'));

        $product14 = new Product();
        $product14->setName('Boisson énergisante RED BULL');
        $product14->setDescription('Boisson énergisante à base de taurine');
        $product14->setImages('23fc23254fc761c10bfd245fd7e93831266fec93.webp');
        $product14->setStock(89);
        $product14->setPrice('6.25');
        $product14->setCategory($this->getReference('Boisson'));
        $product14->setCreatedAt(new \DateTime('2023-07-20'));

        $product15 = new Product();
        $product15->setName('Eau de source CARREFOUR');
        $product15->setDescription('Eau minérale naturelle provenant de sources pures et préservées');
        $product15->setImages('752c3cbc0379e4f4c268a99e5596fb671d326e52.webp');
        $product15->setStock(265);
        $product15->setPrice('1.56');
        $product15->setCategory($this->getReference('Boisson'));
        $product15->setCreatedAt(new \DateTime('2023-07-20'));

        $product16 = new Product();
        $product16->setName('Croquettes pour chat multi variétés');
        $product16->setDescription('Aliment complet pour chat');
        $product16->setImages('f93b3294f0ced62213dac6f085ccde8efa063592.webp');
        $product16->setStock(111);
        $product16->setPrice('5.29');
        $product16->setCategory($this->getReference('Animalerie'));
        $product16->setCreatedAt(new \DateTime('2023-07-20'));

        $product17 = new Product();
        $product17->setName('Litière pour chats comfort');
        $product17->setDescription('Litière minérale anti-odeurs');
        $product17->setImages('ed238abc5a9780984bf520253d96d33cdf41de99.webp');
        $product17->setStock(85);
        $product17->setPrice('4.69');
        $product17->setCategory($this->getReference('Animalerie'));
        $product17->setCreatedAt(new \DateTime('2023-07-20'));

        $product18 = new Product();
        $product18->setName('Jouet pour chien CARREFOUR');
        $product18->setDescription('Jouet pour chien à macher');
        $product18->setImages('3dda012bb81272de325f7b40957906b10bcb4abc.webp');
        $product18->setStock(55);
        $product18->setPrice('0.99');
        $product18->setCategory($this->getReference('Animalerie'));
        $product18->setCreatedAt(new \DateTime('2023-07-20'));

        $product19 = new Product();
        $product19->setName('Harnais pour chien');
        $product19->setDescription('Harnais pour chien');
        $product19->setImages('503c2e3dba74717f0f790867507b91cf362066f6.webp');
        $product19->setStock(25);
        $product19->setPrice('5.39');
        $product19->setCategory($this->getReference('Animalerie'));
        $product19->setCreatedAt(new \DateTime('2023-07-20'));

        $product20 = new Product();
        $product20->setName('Griffoir pour chat Christa DUV');
        $product20->setDescription('Griffoir pour chat recouvert de fourrure');
        $product20->setImages('22993150b065553422ca36feb2133a8c148178d7.webp');
        $product20->setStock(12);
        $product20->setPrice('27.91');
        $product20->setCategory($this->getReference('Animalerie'));
        $product20->setCreatedAt(new \DateTime('2023-07-20'));

        $product21 = new Product();
        $product21->setName('Emincés de saumon sans arêtes');
        $product21->setDescription('Emincés de saumon ASC sans peau sans arête');
        $product21->setImages('d9c18ef2644d697d85b3febabbafb544669b8032.webp');
        $product21->setStock(79);
        $product21->setPrice('7.79');
        $product21->setCategory($this->getReference('Produits Frais'));
        $product21->setCreatedAt(new \DateTime('2023-07-20'));

        $product22 = new Product();
        $product22->setName('Salade laitue Romaine');
        $product22->setDescription('Salade laitue Romaine fraîche . Origine France');
        $product22->setImages('510b47152812c11a2d1a20c919dfb50741f2a8dd.webp');
        $product22->setStock(199);
        $product22->setPrice('0.99');
        $product22->setCategory($this->getReference('Produits Frais'));
        $product22->setCreatedAt(new \DateTime('2023-07-20'));

        $product23 = new Product();
        $product23->setName('Prime Bio Framboise');
        $product23->setDescription('Framboise Bio');
        $product23->setImages('0ae5f41606c57bdc0de736a8bd7114f67dd27e07.webp');
        $product23->setStock(55);
        $product23->setPrice('2.99');
        $product23->setCategory($this->getReference('Produits Frais'));
        $product23->setCreatedAt(new \DateTime('2023-07-20'));

        $product24 = new Product();
        $product24->setName('Filets de poulet fermier blanc');
        $product24->setDescription('Filet de poulet fermier issu de l\'agriculture biologique');
        $product24->setImages('9fc422c6bc7ac181360949e6a23b5402f18ad6a1.webp');
        $product24->setStock(62);
        $product24->setPrice('11.59');
        $product24->setCategory($this->getReference('Produits Frais'));
        $product24->setCreatedAt(new \DateTime('2023-07-20'));

        $product25 = new Product();
        $product25->setName('Yaourt nature');
        $product25->setDescription('Découvrez le yaourt nature ferme CARREFOUR CLASSIC');
        $product25->setImages('4390f15ff69df3bc22890de8b59bbf28097f8c59.webp');
        $product25->setStock(150);
        $product25->setPrice('2.41');
        $product25->setCategory($this->getReference('Produits Frais'));
        $product25->setCreatedAt(new \DateTime('2023-07-20'));

        $product26 = new Product();
        $product26->setName('Tarte au concombre');
        $product26->setDescription('Vous avez vu, c\'est pas bon hein !');
        $product26->setImages('362146d23b18876ee6a59ea41b564f514ec3170e.jpg');
        $product26->setStock(150);
        $product26->setPrice('666.00');
        $product26->setCategory($this->getReference('Épicerie Salée'));
        $product26->setCreatedAt(new \DateTime('2023-07-20'));

        $manager->persist($product1);
        $manager->persist($product2);
        $manager->persist($product3);
        $manager->persist($product4);
        $manager->persist($product5);
        $manager->persist($product6);
        $manager->persist($product7);
        $manager->persist($product8);
        $manager->persist($product9);
        $manager->persist($product10);
        $manager->persist($product11);
        $manager->persist($product12);
        $manager->persist($product13);
        $manager->persist($product14);
        $manager->persist($product15);
        $manager->persist($product16);
        $manager->persist($product17);
        $manager->persist($product18);
        $manager->persist($product19);
        $manager->persist($product20);
        $manager->persist($product21);
        $manager->persist($product22);
        $manager->persist($product23);
        $manager->persist($product24);
        $manager->persist($product25);
        $manager->persist($product26);

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            CategoryFixtures::class,
        );
    }
}
