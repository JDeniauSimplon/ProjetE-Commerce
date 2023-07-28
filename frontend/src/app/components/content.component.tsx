"use client"
import React, { useState, useEffect, useContext } from 'react';
import styles from './content.component.module.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Fade, Zoom, AttentionSeeker } from "react-awesome-reveal";
import { AppContext } from '../AppContext';


interface Product {
  id: number;
  categoryid: number;
  name: string;
  description: string;
  images: string;
  category: Category;
  price: number;
  stock: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  images: string;
}

interface ContentProps {
  search: string;
  id: number;
}

export default function Content({ search, id }: ContentProps) {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedCategories, setCheckedCategories] = useState<{ [key: number]: boolean }>({});
  const [cartItems, setCartItems] = useState([]);
  const id_prod = id;
  const { toast } = useContext(AppContext);
  const [dataLocal, setDataLocal] = useState('');
  const [quantities, setQuantities] = useState({});


  const handleInputChange = (event, productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: event.target.value,
    }));
  };


  const increment = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: (quantities[productId] || 0) + 1,
    }));
  };

  const decrement = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max(0, (quantities[productId] || 0) - 1),
    }));
  };



  useEffect(() => {
    fetchCategories();
    fetchProducts()
    let initialChecks: { [key: number]: boolean } = {};
    categories.forEach((category: Category, index) => {
      initialChecks[category.id] = false;
    });
    setCheckedCategories(initialChecks);

    const getCartFromLocalStorage = () => {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        const parsedCartData = JSON.parse(cartData);
        const filteredData = parsedCartData.filter(item => item.productId === id_prod);
        if (filteredData.length > 0) {
          setDataLocal(filteredData[0]);
        }
      }
    };

    getCartFromLocalStorage();
  }, []);

  const handleCheckChange = (id: number, isChecked: boolean) => {
    setCheckedCategories(prevState => ({ ...prevState, [id]: isChecked }));
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories');
      const data = await response.json();
      setCategories(data["hydra:member"]);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setProducts(data["hydra:member"]);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product: Product) => product.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <div>Loading...</div>;
  }
  const colors = ['#F6784C', '#C4D600', '#EAAA00', '#ED8B00', '#84BD00'];



  const addToCart = async (product: Product, quantityToAdd: number) => {
    let cart: CartItem[] = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    const existingItemIndex = cart.findIndex(item => item.productId === product.id);

    if (quantityToAdd === 0 && existingItemIndex !== -1) {
      // Si la quantité à ajouter est égale à 0, supprimer l'item du panier
      cart = cart.filter(item => item.productId !== product.id);
      toast.current.show({
        severity: "success",
        summary: "Supprimé",
        detail: "Produit supprimé du panier"
      });
    } else if (existingItemIndex !== -1) {
      // Si le produit est déjà dans le panier, ajouter à la quantité existante
      const updatedQuantity = cart[existingItemIndex].quantity + quantityToAdd;
      if (updatedQuantity > product.stock) {
        toast.current.show({
          severity: "error",
          summary: "Erreur",
          detail: "Pas assez de stock pour votre commande"
        });
      } else {
        cart[existingItemIndex].quantity = updatedQuantity;
        cart[existingItemIndex].price = product.price * updatedQuantity;
        toast.current.show({
          severity: "success",
          summary: "Modification",
          detail: "Quantité modifiée dans le panier"
        });
      }
    } else if (quantityToAdd <= product.stock) {
      // Si le produit n'est pas dans le panier, et qu'il y a assez de stock, l'ajouter au panier
      cart.push({
        productId: product.id,
        name: product.name,
        desc: product.description,
        quantity: quantityToAdd,
        price: product.price * quantityToAdd,
        stock: product.stock,
        image: product.images
      });
      toast.current.show({
        severity: "success",
        summary: "Ajout",
        detail: "Produit ajouté au panier"
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Erreur",
        detail: "Pas assez de stock pour votre commande"
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));


    // console.log(quantityToAdd)
    // console.log(product.stock)

    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [product.id]: 0,
    }));
  };

  return (
    <div>
      <div className={styles.categories}>

        {categories?.map((category: Category, index) => (
          <label
            key={index}
            className={`${styles.categoryButton} ${checkedCategories[category.id] ? styles.checked : ''}`}
            style={{
              backgroundColor: checkedCategories[category.id] ? `${colors[index % colors.length]}CC` : colors[index % colors.length],
            }}
            htmlFor={category.id.toString()}
          >
            <input
              type="checkbox"
              id={category.id.toString()}
              checked={checkedCategories[category.id] || false}
              onChange={(e) => handleCheckChange(category.id, e.target.checked)}
              style={{ display: 'none' }}
            />
            {category.name}
          </label>
        ))}
      </div>


      <div className={styles.productContainer}>
        <Fade cascade damping={0.03}>
          {filteredProducts.map((product: Product, index) =>
            (!Object.values(checkedCategories).includes(true) || checkedCategories[product.category.id]) ?
              (

                <div
                  className={`${styles.product}`}
                  key={index}
                >
                  <img src={`http://localhost:8000/uploads/images/${product.images}`} alt="Product image" />
                  <div className={styles.productInfo}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <div className={styles.productDetails}>
                      <p>{product.price} €</p>
                      <div className={styles.quantitie}>
                        <button className={styles.productCardDecrementBtn} onClick={() => decrement(product.id)}>-</button>
                        <input
                          type="text"
                          value={quantities[product.id] || 0}
                          onChange={(event) => handleInputChange(event, product.id)}
                          className={styles.productCardQuantity}
                        />
                        <button className={styles.productCardIncrementBtn} onClick={() => increment(product.id)}>+</button>
                      </div>

                      <button className={styles.addToCartButton} onClick={() => addToCart(product, quantities[product.id] || 0)}>Ajouter au panier</button>
                    </div>
                  </div>
                </div>
              ) : null
          )}
        </Fade>
      </div>
    </div>
  );
}
