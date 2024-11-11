import { AuthProvider } from '@/lib/firebase';
import Navbar from '@/components/organisms/Navbar';
import GlobalErrorDisplay from '@/components/molecules/GlobalErrorDisplay';
import { ErrorProvider } from '@/contexts/ErrorContext';
import { CartProvider } from '@/contexts/CartContext';
import '@/index.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <ErrorProvider>
                <CartProvider>
                    <Navbar />
                    <GlobalErrorDisplay />
                    <div className="bg-white min-h-screen min-w-screen flex justify-center items-center mt-20">
                        {children}
                    </div>
                </CartProvider>
            </ErrorProvider>
        </AuthProvider>
    );
}

export default RootLayout;