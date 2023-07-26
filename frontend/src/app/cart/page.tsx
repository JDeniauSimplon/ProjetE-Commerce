"use client"

import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import Navbar from '../components/navbar.component';
import Footer from '../components/footer';
import Image from 'next/image';
import styles from './page.module.css'
import Link from 'next/link'

export default function Cart() {
  const { cartItems, handleDelete } = useContext(CartContext);
  const [search, setSearch] = useState('');
  console.log(cartItems)


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

        <button className={styles.validate}>Valider mon panier</button>
      </div>

      <Footer />
    </>
  );
}