"use client";
import { ClientOnly, Navbar } from "./component";
import { Modal } from "./component/modals";
import "./globals.css";
import { Nunito } from "next/font/google";

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
                    <Modal
                        title="Hello"
                        isOpen
                        onClose={() => {}}
                        onSubmit={() => {}}
                        actionLabel="Submit"
                        secondaryAcionLabel="Exit"
                        secondaryAcion={() => {}}
                    />
                    <Navbar />
                </ClientOnly>
                {children}
            </body>
        </html>
    );
}
