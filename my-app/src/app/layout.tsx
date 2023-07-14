"use client";
import { ClientOnly, Navbar } from "./component";
import { Modal, RegisterModal } from "./component/modals";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata = {
    title: "Airbnb",
    description: "Airbnb clone",
};

const font = Nunito({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font.className}>
                <ClientOnly>
                    {/*toasts => 에러 같은 내용 담긴 팝업 창  */}
                    <ToasterProvider />
                    <RegisterModal />
                    <Navbar />
                </ClientOnly>
                {children}
            </body>
        </html>
    );
}
