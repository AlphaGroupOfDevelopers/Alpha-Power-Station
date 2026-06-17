import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Alpha Power Station | Integrated Engineering & Technology Hub",
  description: "Premier integrated engineering and technology hub in West Africa. Building Africa-Proof Engineering solutions through AGD and AGEE divisions.",
  keywords: ["Alpha Power Station", "AGD", "AGEE", "Africa-Proof Engineering", "West Africa", "Engineering Hub", "Power Systems", "Embedded Systems"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
