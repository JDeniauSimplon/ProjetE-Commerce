"use client"
import React, { useState, useEffect } from 'react';
import styles from './content.component.module.css'
import Image from 'next/image';

interface Category {
    id: number;
    name: string;
}

interface Product {
    category_id: number;
    name: string;
    description: string;
}

interface Data {
    categories: Category[];
    products: Product[];
}

const data: Data = require('../data/products.json');

export default function Content() {
    console.log(data);

    const [checkedCategories, setCheckedCategories] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        let initialChecks: { [key: number]: boolean } = {};
        data.categories.forEach((category, index) => {
            initialChecks[category.id] = false;
        });
        setCheckedCategories(initialChecks);
    }, []);

    const handleCheckChange = (id: number, isChecked: boolean) => {
        setCheckedCategories(prevState => ({ ...prevState, [id]: isChecked }));
    };

    const colors = ['#F6784C', '#C4D600', '#EAAA00', '#ED8B00', '#84BD00'];

    return (
        <>
            {/* <Image src="/images/chips.jpg" alt="Description de l'image" width={300} height={300} /> */}
            <>
                <div>
                    <div className={styles.categories}>

                        {data.categories?.map((category, index) => (
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
                                    style={{ display: 'none' }} // Masquer la checkbox
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>


                    {data.products?.map((product: Product, index: number) => (
                        <div
                            key={index}
                            className={`${styles.product} ${(!Object.values(checkedCategories).includes(true) || checkedCategories[product.category_id]) ? '' : styles.hidden}`}
                        >
                            <h1>{product.name}</h1>
                            <p>{product.description}</p>
                        </div>
                    ))}
                </div>
            </>



        </>
    );
}
