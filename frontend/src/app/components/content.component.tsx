"use client"
import React, { useState, useEffect, useContext } from 'react';
import styles from './content.component.module.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Fade, Zoom, AttentionSeeker } from "react-awesome-reveal";
import { AppContext } from "../AppContext";


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

    const [quantity, setQuantity] = useState(() => {
        const cartData = localStorage.getItem('pannier');
        if (cartData) {
          const parsedCartData = JSON.parse(cartData);
          const filteredData = parsedCartData.filter(item => item.productId === id_prod);
          if (filteredData.length > 0) {
            return filteredData[0].quantity;
          }
        }
        return 0; // Valeur par défaut si le produit n'est pas présent dans le localStorage
      });

      const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
          setQuantity(inputValue === "" ? 0 : Number(inputValue));
        }
      };
    
      const increment = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };
    
      const decrement = () => {
        if (quantity > 0) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        }
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
            const cartData = localStorage.getItem('pannier');
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


    //Ajouter un produit au panier 

    const addToCart = async (product: Product) => {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        const quantityToAdd = quantity;
        const productId = product.id;
        const prix_u = product.price;
        const name_u = product.name;
        const desc_u = product.description;
        const image_u = product.images;
        const inventory = product.stock;

        cart = cart ? JSON.parse(cart) : [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart)

        if (quantityToAdd > inventory) {
            toast.current.show({
              severity: "error",
              summary: "Erreur",
              detail: "Pas assez de stock pour votre commande"
            })
            return

        } else if (quantityToAdd === 0) {
            // Si la quantité à ajouter est égale à 0, supprimer l'item du panier
            const updatedpannier = cart.filter(item => item.productId !== productId);
            localStorage.setItem('pannier', JSON.stringify(updatedpannier));
            toast.current.show({
              severity: "success",
              summary: "Supprimé",
              detail: "Produit supprimmé du pannier"
            })
            return;
    };

    const existingItemIndex = cart.findIndex(item => item.productId === productId);


    if (existingItemIndex !== -1) {
        // Si le produit est déjà dans le panier, écraser la quantité avec la nouvelle valeur
        cart[existingItemIndex].quantity = quantityToAdd;
        cart[existingItemIndex].price_total = prix_u * quantityToAdd
        toast.current.show({
          severity: "success",
          summary: "Modification",
          detail: "Quantité modifié dans le pannier"
        })
      } else {
        // Sinon, ajouter le produit au panier avec la quantité spécifiée et son ID
        cart.push({
          productId,
          name: name_u,
          desc: desc_u,
          quantity: quantityToAdd,
          price: prix_u,
          stock: inventory,
          image: image_u
        });
  
        toast.current.show({
          severity: "success",
          summary: "Ajout",
          detail: "Produit ajouter au pannier"
        })
      }
  
      localStorage.setItem('pannier', JSON.stringify(cart));
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
                    {filteredProducts.map((product: Product) =>
                        (!Object.values(checkedCategories).includes(true) || checkedCategories[product.category.id]) ?
                            (

                                <div
                                    className={`${styles.product}`}
                                >
                                    <img src={`http://localhost:8000/uploads/images/${product.images}`} alt="Product image" />
                                    <div className={styles.productInfo}>
                                        <h1>{product.name}</h1>
                                        <p>{product.description}</p>
                                        <div className={styles.productDetails}>
                                            <p>{product.price} €</p>
                                        <button className="productCardDecrementBtn" onClick={decrement}>-</button>
                                        <input
                                          type="text"
                                          value={quantity}
                                          onChange={handleInputChange}
                                          className="productCardQuantity"
                                        />
                                        <button className="productCardIncrementBtn" onClick={increment}>+</button>
                                           <button className={styles.addToCartButton} onClick={() => addToCart(product)}>Ajouter au panier</button>
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
