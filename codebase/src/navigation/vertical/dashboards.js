import { Home, Grid, Activity, ShoppingCart } from "react-feather";

export default [
  {
    id: "dashboards",
    title: "Dashboard",
    // navLink: "/dashboard",
    icon: <Home />,
    permissions: ["admin", "user", "personal", "friend", "relatives"],
    tagVariant: "light-warning",
    children: [
      {
        title: "eCommerce",
        route: "dashboard-ecommerce",
        permissions: ["admin", "others"],
        tagVariant: "light-warning",
      },
      {
        title: "Analytics",
        route: "dashboard-analytics",
        permissions: ["admin", "others"],
        tagVariant: "light-warning",
      },
    ],
  },
];
