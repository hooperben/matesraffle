"use client";

import { Home, FileQuestion, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./dark-mode";
import { usePathname } from "next/navigation";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "How does it work?",
    url: "/faqs",
    icon: FileQuestion,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const { user } = useDynamicContext();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>RaffleHur</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="text-[#800080] dark:text-white from-35% to-[#000000]">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DynamicWidget />

        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
