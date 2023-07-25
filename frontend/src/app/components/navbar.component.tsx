"use client"

import Image from 'next/image';
import styles from './navbar.module.css'
import { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";

interface NavbarProps {
  onSearchChange?: (search: string) => void;
}


export default function Navbar({ onSearchChange }: NavbarProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(inputValue);
    }
  }, [inputValue]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <Image src={"/logo.jpg"} alt="Logo" width={100} height={100} />
        <button className={styles.menuButton} onClick={toggleMobileMenu}>
          ☰
        </button>
        <div className={`${styles.right} ${isMobileMenuOpen ? styles.open : ''}`}>
          <button className={styles.closeButton} onClick={toggleMobileMenu}>X</button>
          <form className={styles.form}>
            {onSearchChange && (
              <>
                <input
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  type="text"
                  className={styles.searchInput}
                  placeholder="Rechercher un produit..."
                  maxLength={100}
                  required
                />
                <button type="submit" className={styles.submitButton}><FaSearch /></button>
              </>
            )}
          </form>

          <a className={styles.a} href="/">Home</a>
          <a className={styles.a} href="#">Explore</a>
          <a className={styles.a} href="#">Help</a>
          <a className={styles.a} href="/cart">Mon panier</a>
        </div>
      </nav>
    </div>
  );
}
