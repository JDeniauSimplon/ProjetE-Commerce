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
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

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


  const addToOrder = async (event) => {
    let tabProducts = []
    cartItems.map(item => {
      let product = "/api/products/" + item.productId.toString()
      tabProducts.push(product)
    });

    event.preventDefault();
    try {
      const orderData = {
        user: {
          first: name,
          last: surname,
          email: email,
        },
        products: tabProducts,
      };

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
      console.log(order)
      setCartItems([]);
      localStorage.clear();
      setIsOrderValidated(true); // order validated successfully
    } catch (error) {
      console.error(error);
    }
  };

  console.log(cartItems);


  return (
    <>
      <Navbar />
      <div className={styles.cart}>
        <h1 className={styles.title}>Mon panier</h1>
        {isOrderValidated && <p>Votre commande a été validée avec succès !</p>} 
        <div className={styles.container}>
          {cartItems.map((item) => (
            <div className={styles.products} key={item.id}>
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
                <p className={styles.price}>{totalPrice.toFixed(2)} €</p>
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

            <label>Coupon</label>
            <input
              type="text"
              maxLength={100}
              placeholder="entrez un code promo"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button onClick={addToOrder} type="submit" className={styles.validate}>Valider mon panier</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}