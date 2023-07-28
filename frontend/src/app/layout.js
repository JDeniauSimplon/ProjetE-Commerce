import './globals.css'
import { Inter } from 'next/font/google'
import AppContextProvider from './AppContext'
import { Toast } from './components/toast/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gourmet',
  description: 'Gourmet E-commerce',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AppContextProvider>
          {children}
          <Toast />
        </AppContextProvider>
      </body>
    </html>
  )
}
