import type { Metadata } from "next";
import { Changa} from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const font =  Changa({
  subsets: ["arabic", "latin"],
  weight: ["400","600","700"],
  variable: "--font-custom",
});

export const metadata: Metadata = {
  title: "FleetTrack",
  description: "FleetTrack app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${font.variable} ${font.className} antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}