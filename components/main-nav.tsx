'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calculator,
  FileCheck,
  Users,
  LogOut,
} from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 bg-white dark:bg-gray-800 w-full">
      <Button
        asChild
        variant={pathname === "/" ? "default" : "ghost"}
        className="h-9"
      >
        <Link href="/" className="flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          <span>Dashboard</span>
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === "/job-cards" ? "default" : "ghost"}
        className="h-9"
      >
        <Link href="/job-cards" className="flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          <span>Job Cards</span>
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === "/quotes" ? "default" : "ghost"}
        className="h-9"
      >
        <Link href="/quotes" className="flex items-center">
          <Calculator className="h-4 w-4 mr-2" />
          <span>Quotes</span>
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === "/invoices" ? "default" : "ghost"}
        className="h-9"
      >
        <Link href="/invoices" className="flex items-center">
          <FileCheck className="h-4 w-4 mr-2" />
          <span>Invoices</span>
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === "/users" ? "default" : "ghost"}
        className="h-9"
      >
        <Link href="/users" className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          <span>Users</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="h-9 ml-auto text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        onClick={() => {
          // Handle logout
        }}
      >
        <LogOut className="h-4 w-4 mr-2" />
        <span>Logout</span>
      </Button>
    </nav>
  );
}