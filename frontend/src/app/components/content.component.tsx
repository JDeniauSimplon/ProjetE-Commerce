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
                            <div key={index} style={{ backgroundColor: colors[index % colors.length] }}>
                                <input
                                    type="checkbox"
                                    checked={checkedCategories[category.id] || false}
                                    onChange={(e) => handleCheckChange(category.id, e.target.checked)}
                                />
                                <label htmlFor={category.id.toString()}>{category.name}</label>
                            </div>
                        ))}
                    </div>


                    {data.products?.map((product: Product, index: number) => (
                        (!Object.values(checkedCategories).includes(true) || checkedCategories[product.category_id]) &&
                        <div key={index}>
                            <h1>{product.name}</h1>
                            <p>{product.description}</p>
                        </div>
                    ))}
                </div>
            </>
        </>
    );
}
