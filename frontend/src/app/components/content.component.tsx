"use client"
import React, { useState, useEffect } from 'react';
import styles from './content.component.module.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group';


interface Product {
    id: number;
    categoryid: number;
    name: string;
    description: string;
    images: string;
    category: Category;
    price: number;
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

export default function Content({ search }: ContentProps) {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkedCategories, setCheckedCategories] = useState<{ [key: number]: boolean }>({});
    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
        fetchCategories();
        fetchProducts()
        let initialChecks: { [key: number]: boolean } = {};
        categories.forEach((category: Category, index) => {
            initialChecks[category.id] = false;
        });
        setCheckedCategories(initialChecks);
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
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart)
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
                <TransitionGroup component={null}>
                    {filteredProducts.map((product: Product) =>
                        (!Object.values(checkedCategories).includes(true) || checkedCategories[product.category.id]) ?
                            (
                                <CSSTransition
                                    key={product.id}
                                    timeout={300}
                                    classNames="product"
                                >

                                    <div
                                        className={`${styles.product}`}
                                    >
                                        <img src={`http://localhost:8000/uploads/images/${product.images}`} alt="Product image" />
                                        <div className={styles.productInfo}>
                                            <h1>{product.name}</h1>
                                            <p>{product.description}</p>
                                            <div className={styles.productDetails}>
                                                <p>{product.price} €</p>
                                                <button className={styles.addToCartButton} onClick={() => addToCart(product)}>Ajouter au panier</button>
                                            </div>
                                        </div>
                                    </div>
                                </CSSTransition>
                            ) : null
                    )}
                </TransitionGroup>
            </div>
        </div>
    );
}
