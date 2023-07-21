"use client"

import Image from 'next/image';
import styles from './navbar.module.css'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";


export default function Navbar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                 <input
                 type="text"
                 className={styles.searchInput}
                 placeholder="Rechercher un produit..."
                 maxLength={100}
                 required
                 />
                 <button type="submit" className={styles.submitButton}><FaSearch /></button>
               </form>

                <a className={styles.a} href="#">Home</a>
                <a className={styles.a} href="#">Explore</a>
                <a className={styles.a} href="#">Help</a>
              </div>
            </nav>
        </div>
    );
}
