import type { Metadata } from "next";
import "../globals.css"
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "sonner";
import ModalProvider from "@/providers/modal-provider";
import { Suspense } from "react";
import { Loading } from "@/components/auth/loading";

export const metadata: Metadata = {
  title: "Renduit Manager",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading></Loading>}>
          <ConvexClientProvider>
            <Toaster></Toaster>
            <ModalProvider></ModalProvider>
            {children}
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
