"use client"

import Navbar from '../components/navbar.component';
import Footer from '../components/footer';
import Image from 'next/image';
import styles from './page.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [coupon, setCoupon] = useState('');
  const [isOrderValidated, setIsOrderValidated] = useState(false); // new state
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const [discountedTotal, setDiscountedTotal] = useState(totalPrice);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    setCartItems(cart);
  };


  const handleDelete = (productId) => {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    const updatedCart = cart.filter((item) => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const applyDiscount = async (event) => {
    // Prevent default form submission which refreshes the page
    event.preventDefault();

    let discount = 0;

    if (coupon) {
      try {
        const promoIdResponse = await fetch('http://localhost:8000/api/promos?code=' + coupon);
        if (!promoIdResponse.ok) {
          throw new Error('Une erreur est survenue lors de la récupération du code promo');
        }
        const promoIdData = await promoIdResponse.json();
        const promo = promoIdData['hydra:member'].find(promo => promo.code === coupon);

        if (!promo) {
          throw new Error('Code promo non valide');
        }

        discount = promo.discount;
      } catch (error) {
        console.error(error);
      }
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity * (1 - discount / 100), 0);
    setDiscountedTotal(totalPrice);  // Update the discounted total
  };



  const addToOrder = async (event) => {
    event.preventDefault();

    let tabProducts = cartItems.map(item => "/api/products/" + item.productId.toString());

    let orderData = {
      user: {
        first: name,
        last: surname,
        email: email,
      },
      products: tabProducts,
    };

    // If a coupon code was entered, add it to the order.
    if (coupon) {
      try {
        const promoIdResponse = await fetch('http://localhost:8000/api/promos?code=' + coupon);
        if (!promoIdResponse.ok) {
          throw new Error('Une erreur est survenue lors de la récupération du code promo');
        }
        const promoIdData = await promoIdResponse.json();
        const promo = promoIdData['hydra:member'].find(promo => promo.code === coupon);

        if (!promo) {
          throw new Error('Code promo non valide');
        }

        const promoId = promo.id;
        orderData = { ...orderData, coupons: "/api/promos/" + promoId };

      } catch (error) {
        console.error(error);
      }
    }

    try {
      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la validation de votre commande. Veuillez réessayer');
      }

      const order = await response.json();
      console.log(order);
      setCartItems([]);
      localStorage.clear();
      setDiscountedTotal(0);
      setCoupon('');
      setIsOrderValidated(true); // order validated successfully
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = (index, quantity) => {
    let newCartItems = [...cartItems];
    newCartItems[index].quantity = Number(quantity);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };


  return (
    <>
      <Navbar />
      <div className={styles.cart}>
        <h1 className={styles.title}>Mon panier</h1>
        {isOrderValidated && <p>Votre commande a été validée avec succès !</p>} 
        <div className={styles.container}>
          {cartItems.map((item, index) => (
            <div className={styles.products} key={index}>
              <div className={styles.left}>
                <img
                  src={`http://localhost:8000/uploads/images/${item.image}`}
                  alt="Product image"
                  width={200}
                  height={200}
                />
              </div>

              <div className={styles.right}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.description}>{item.desc}</p>
                <p className={styles.price}>{item.price.toFixed(2)} €</p>
                <p>Quantity: {item.quantity}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
                <button
                  className={styles.delete}
                  onClick={() => handleDelete(item.productId)}
                >
                  Supprimer produit
                </button>
              </div>
            </div>
          ))}


        </div>

        <div className={styles.promoContainer}>
          <form onSubmit={applyDiscount}>
            <label>Coupon</label>
            <input
              type="text"
              maxLength={100}
              placeholder="entrez un code promo"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button type="submit">Appliquer le code promo</button>
          </form>
          <p>Prix total avant réduction : {totalPrice.toFixed(2)} €</p>
          <p>Prix total après réduction : {discountedTotal.toFixed(2)} €</p>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={addToOrder}>
            <label>Nom</label>
            <input
              type="text"
              maxLength={20}
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label>Prénom</label>
            <input
              type="text"
              maxLength={20}
              value={surname}
              required
              onChange={(e) => setSurname(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              maxLength={80}
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className={styles.validate}>Valider mon panier</button>
          </form>
        </div>
      </div>

      <Footer />
    </>


  );
}