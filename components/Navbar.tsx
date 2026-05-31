import { Suspense } from "react";
import NavbarClient from "@/components/NavbarClient";
import NavbarAuth from "@/components/NavbarAuth";
import NavbarCart from "@/components/NavbarCart";
import NavbarAdminLink from "@/components/NavbarAdminLink";
import NavbarSearch from "@/components/NavbarSearch";

export default function Navbar() {
  return (
    <NavbarClient
      searchSlot={
        <Suspense fallback={
          <div className="flex-1 h-9 bg-background border border-border rounded-lg animate-pulse" />
        }>
          <NavbarSearch />
        </Suspense>
      }
      adminSlot={<NavbarAdminLink />}
      authSlot={<NavbarAuth />}
      cartSlot={<NavbarCart />}
    />
  );
}