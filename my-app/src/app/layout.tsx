import { ClientOnly, Navbar } from './component';
import { getCurrentUser } from '@/app/actions/';
import { RegisterModal, LoginModal } from './component/modals';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';

export const metadata = {
    title: 'Airbnb',
    description: 'Airbnb clone',
};

const font = Nunito({
    subsets: ['latin'],
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="en">
            <body className={font.className}>
                <ClientOnly>
                    {/*toasts => 에러 같은 내용 담긴 팝업 창  */}
                    <ToasterProvider />
                    <LoginModal />
                    <RegisterModal />
                    <Navbar currentUser={currentUser} />
                </ClientOnly>
                {children}
            </body>
        </html>
    );
}
