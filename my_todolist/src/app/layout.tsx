import type { Metadata } from "next";
import { Poppins, Inter, Lora } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { ATProvider } from "@/context/ATContext";
import { Toaster } from "react-hot-toast";
import ClientLayout from "./ClientLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo Manager",
  description: "Ứng dụng quản lý công việc hiện đại",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${poppins.variable} ${inter.variable} ${lora.variable} antialiased`}
      >
        <ATProvider>
          <UserProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </UserProvider>
        </ATProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "12px",
              background: "#1f2937",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
