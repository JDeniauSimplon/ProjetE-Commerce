"use client"

import Image from 'next/image';
import styles from './navbar.module.css'
import { useState } from 'react';


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
                <select className={styles.dropdown}>
                  <option value="all" className={styles.option}>Toutes les catégories</option>
                  <option value="salty" className={styles.option}>Epicerie salée</option>
                  <option value="sweet" className={styles.option}>Epicerie sucrée</option>
                  <option value="fresh" className={styles.option}>Produits frais</option>
                  <option value="drinks" className={styles.option}>Boissons</option>
                  <option value="animal" className={styles.option}>Animalerie</option>
                </select>
                <a className={styles.a} href="#">Home</a>
                <a className={styles.a} href="#">Explore</a>
                <a className={styles.a} href="#">Help</a>
              </div>
            </nav>
        </div>
    );
}
