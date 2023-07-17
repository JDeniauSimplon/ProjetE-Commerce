"use client"
import { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Dropdown } from 'primereact/dropdown';
import Image from 'next/image';

export default function Navbar() {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'Epicerie salée' },
        { name: 'Epicerie sucrée' },
        { name: 'Produits frais' },
        { name: 'Boisson' },
        { name: 'Animalerie' }
    ];

    let items = [
        {
            template: () => (
                <Dropdown
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="All categories"
                    className="w-full md:w-14rem"
                />
            ),
        },
        {
            label: 'Accueil',
            icon: 'pi pi-fw pi-home',
        },
        {
            label: 'Explore',
            icon: 'pi pi-fw pi-search',
        },
        {
            label: 'Help',
            icon: 'pi pi-fw pi-question',
        },
    ];

    const start = (
        <Image src="/images/logo.png" alt="Logo" width={100} height={80} className="mr-2" />
    );

    return (
        <Menubar
            className="w-full flex justify-between h-5rem"
            model={items}
            start={start}
        />
    );
}
