export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CreceIdea Perú",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: "DashboardIcon"
    },
    {
      label: "Categorías",
      href: "/dashboard/categories",
      icon: "CategoriesIcon"
    },
    {
      label: "Productos",
      href: "/dashboard/products",
      icon: "ProductIcon"
    },
    {
      label: "Pedidos",
      href: "/dashboard/orders",
      icon: "OrderIcon"
    }
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
