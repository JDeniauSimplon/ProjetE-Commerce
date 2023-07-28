"use client"
import { useState } from 'react';
import Image from 'next/image';
import styles from './footer.module.css'


export default function Footer() {
   return (
      <div className={styles.footer}>
         <div className={styles.container}>
            <div className={styles.description}>
               <Image src={"/logo.jpg"} width={175} height={70} alt='miniature'></Image>
               <p className={styles.p}>Nous proposons une sélection gourmande et variée de produits sucrés, salés, frais, produits animaliers et des boissons pour émoustiller vos papilles. Qu&apos;il s&apos;agisse d&apos;un dîner intime ou d&apos;un festin pour la famille, Le Gourmet met un univers de saveurs à portée de clic. Faites vos courses facilement et en toute convivialité !</p>
            </div>

            <div className={styles.company}>
               <h2 className={styles.h2}>Company</h2>
               <p className={styles.p}>Home</p>
               <p className={styles.p}>Explore</p>
               <p className={styles.p}>Team</p>
               <p className={styles.p}>About us</p>
               <p className={styles.p}>Activity</p>

            </div>

            <div className={styles.ressources}>
               <h2 className={styles.h2}>Ressources</h2>
               <p className={styles.p}>Blog</p>
               <p className={styles.p}>Use Cases</p>
               <p className={styles.p}>Testimonials</p>
               <p className={styles.p}>Insights</p>
            </div>

            <div className={styles.newsletter}>
               <p className={styles.p}>Ut risus mattis interdum faucibus facilisi. Facilisi purus accumsan aliquam.</p>
               <form className={styles.form}>
                  <input
                     type="email"
                     className={styles.emailInput}
                     placeholder="Email"
                     maxLength={60}
                     required
                  />
                  <button type="submit" className={styles.submitButton}>Soumettre</button>
               </form>

            </div>
         </div>

         <div className={styles.social_medias}>
            <div className={styles.icons}>
               <Image src={"/instagram.png"} width={30} height={30} alt='miniature'></Image>
               <Image src={"/twitter.png"} width={30} height={30} alt='miniature'></Image>
               <Image src={"/linkedin.png"} width={30} height={30} alt='miniature'></Image>
               <Image src={"/facebook.png"} width={30} height={30} alt='miniature'></Image>

            </div>
         </div>
      </div>
   );
}