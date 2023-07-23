<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['order_read', 'promo_read', 'products_read']]
        ),
        new Get(
            normalizationContext: ['groups' => ['order_read', 'promo_read', 'products_read']]
        ),
        new Post(
            denormalizationContext: ['groups' => ['order_write']]
        ),
        new Patch(
            denormalizationContext: ['groups' => ['order_write']])
    ]
)]
#[ORM\Table(name: '`order`')]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['orders_read', 'order_read', 'order_write', 'user_read'])]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(length: 50)]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?string $customer_name = null;

    #[ORM\Column(length: 50)]
    #[Groups(['orders_read', 'order_read', 'order_write' , 'user_read'])]
    private ?string $status = null;

    #[ORM\Column(length: 50)]
    #[Groups(['orders_read', 'order_read', 'order_write' , 'user_read'])]
    private ?string $reference = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['order_write' , 'orders_read', 'order_read', 'user_read'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[Groups(['orders_read', 'order_read', 'order_write', 'promo_read' , 'promos_read' , 'user_read'])]
    private ?Promo $coupons = null;

    #[ORM\ManyToMany(targetEntity: Product::class, mappedBy: 'reservation')]
    #[Groups(['orders_read', 'order_read', 'order_write', 'products_read', 'product_read' , 'user_read'])]
    private Collection $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
        $this->created_at = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getCustomerName(): ?string
    {
        return $this->customer_name;
    }

    public function setCustomerName(string $customer_name): static
    {
        $this->customer_name = $customer_name;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): static
    {
        $this->reference = $reference;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getCoupons(): ?Promo
    {
        return $this->coupons;
    }

    public function setCoupons(?Promo $coupons): static
    {
        $this->coupons = $coupons;

        return $this;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): static
    {
        if (!$this->products->contains($product)) {
            $this->products->add($product);
            $product->addReservation($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->products->removeElement($product)) {
            $product->removeReservation($this);
        }

        return $this;
    }
}
