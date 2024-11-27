import { Cairo } from 'next/font/google';
import Navbar from './components/layouts/Navbar';
import "./globals.css";
import { CartProvider } from './contexts/CartContext';
import { OrdersProvider } from './contexts/OrdersContext';

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
});

export const metadata = {
  title: "متجرنا الإلكتروني",
  description: "متجر إلكتروني عربي",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <OrdersProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </OrdersProvider>
      </body>
    </html>
  );
}
