import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "collapse",
    icon: <Icon.Home />,
    badge: "",
    badgeText: "",
    permissions: ["admin", "user", "personal", "friend", "relatives"],
    children: [
      {
        id: "eCommerceDash",
        title: "eCommerce",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin"],
        navLink: "/ecommerce-dashboard",
      },
    ],
  },
  {
    type: "groupHeader",
    groupTitle: "COMERCIO",
  },
  {
    id: "realizar pedido",
    title: "Realizar Pedido",
    type: "item",
    icon: <Icon.Package size={16} />,
    navLink: "/create_order",
    permissions: ["admin", "user", "personal", "friend", "relatives"],
  },
  {
    id: "mis pedido",
    title: "Mis Pedido",
    type: "item",
    icon: <Icon.MessageSquare size={16} />,
    permissions: ["admin", "user", "personal", "friend", "relatives"],
    navLink: "/orders",
  },

  {
    id: "eCommerce",
    title: "Ecommerce",
    type: "collapse",
    icon: <Icon.ShoppingCart size={20} />,
    children: [
      {
        id: "productos",
        title: "Productos",
        type: "item",
        icon: <Icon.Circle size={12} />,
        navLink: "/products",
        permissions: ["admin", "user", "personal", "friend", "relatives"],
      },
      {
        id: "agregarNuevo",
        title: "Agregar Nuevo",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/ecommerce/product-detail",
      },
    ],
  },
];

export default navigationConfig;
