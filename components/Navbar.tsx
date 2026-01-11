"use client";

import { useState, useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Badge,
  Input,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, toggleCart, isMounted } = useCart();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Our Story", href: "/story" },
    { label: "Reviews", href: "/reviews" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <NextUINavbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="bg-white/80 backdrop-blur-md"
      isBordered
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-14 h-14">
              <Image
                src="/images/dookie-logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            {/* <p className="font-serif font-bold text-brand-primary text-xl tracking-tight hidden sm:block">
              Doo<span className="text-brand-secondary">Kie</span>
            </p> */}
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.label} isActive={pathname === item.href}>
            <Link
              href={item.href}
              className={`font-serif text-xl transition-colors ${
                pathname === item.href
                  ? "text-brand-primary font-bold"
                  : "text-brand-text font-medium hover:text-brand-primary"
              }`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[12rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-brand-cream/50 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<Search size={18} />}
            type="search"
          />
        </NavbarItem>
        <NavbarItem>
          <Badge
            content={isMounted && cartCount > 0 ? cartCount : null}
            color="secondary"
            shape="circle"
            size="sm"
            isInvisible={!isMounted || cartCount === 0}
          >
            <Button
              isIconOnly
              radius="full"
              variant="light"
              onPress={toggleCart}
            >
              <ShoppingCart size={24} className="text-brand-muted" />
            </Button>
          </Badge>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="/menu"
            variant="shadow"
            className="font-bold text-white shadow-soft"
            radius="full"
          >
            Order Now
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="pt-8">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-2xl font-serif py-2 block text-brand-text"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
}
