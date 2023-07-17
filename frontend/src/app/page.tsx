import Image from 'next/image'
import styles from './page.module.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import Navbar from './components/navbar.component';

export default function Home() {
  return (
    <>
      <Navbar />
    </>
  )
}
