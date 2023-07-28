"use client"
import { useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import Navbar from './components/navbar.component';
import Footer from './components/footer';
import Content from './components/content.component'

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <>
      <Navbar onSearchChange={setSearch} />
      <Content search={search} />
      <Footer />
    </>
  )
}
