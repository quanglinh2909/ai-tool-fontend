import { SnackbarProvider } from 'notistack'
import Sidebar from "@/components/left-menu/Sidebar";
import { SidebarProvider } from "@/hooks/useSidebarState";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import localFont from 'next/font/local';

export const publicSans = localFont({
  src: '../public/fonts/public-sans-latin-wght-normal-DdeTHZLK.woff2',
  display: 'swap',
  variable: '--font-public-sans',
});

export const barlowBold = localFont({
  src: '../public/fonts/barlow-latin-700-normal-Bku5AOSK.woff2',
  weight: '700',
  display: 'swap',
  variable: '--font-barlow-bold',
});

export const barlowExtraBold = localFont({
  src: '../public/fonts/barlow-latin-800-normal-B50OFIWa.woff2',
  weight: '800',
  display: 'swap',
  variable: '--font-barlow-extrabold',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${publicSans.variable} ${barlowBold.variable} ${barlowExtraBold.variable}`}>
      <SidebarProvider>
        <SnackbarProvider />


        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* <Header /> */}
            <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
}