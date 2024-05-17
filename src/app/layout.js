
import { Inter } from "next/font/google";
import "./globals.css";
import  Providers  from "./redux/Provider";
import store from "./redux/Store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
  
    <html lang="en">
       
      <body className={inter.className}>  <Providers store={store}>{children}</Providers></body>

    </html>
   
  );
}
