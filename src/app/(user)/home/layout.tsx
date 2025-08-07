
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import StreamVideoProvider from "providers/StreamClientProvider";
import { ReactNode } from "react";



export const metadata: Metadata = {
  title: "VORTEX",
  description: "A workspace for your team, powered by Stream Chat and Clerk.",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (

    <StreamVideoProvider >

      {children}
    </StreamVideoProvider>

  );
};

export default RootLayout;
