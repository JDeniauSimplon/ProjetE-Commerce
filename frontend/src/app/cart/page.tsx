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

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    setCartItems(cart); 
  };


  const handleDelete = (id) => {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };


  const addToOrder = async (event) => {
    let tabProducts = []
    cartItems.map(item => {
      let product = "/api/products/" + item.id.toString()
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.cart}>
        <h1 className={styles.title}>Mon panier</h1>
        <div className={styles.container}>
          {cartItems.map((item) => (
            <div className={styles.products} key={item.id}>
              <div className={styles.left}>
                <img
                  src={`http://localhost:8000/uploads/images/${item.images}`}
                  alt="Product image"
                  width={200}
                  height={200}
                />
              </div>

              <div className={styles.right}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.description}>{item.description}</p>
                <p className={styles.price}>{item.price} €</p>
                <p className={styles.categories}>{item.category.name}</p>
                <button
                  className={styles.delete}
                  onClick={() => handleDelete(item.id)}
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