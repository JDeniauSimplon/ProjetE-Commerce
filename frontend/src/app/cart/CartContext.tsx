"use client"

import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({cartItems: []});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    setCartItems(cart);
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
    fetchCartItems();
  };

  return (
    <CartContext.Provider value={{ cartItems, handleDelete, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

