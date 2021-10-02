import { lazy } from 'react'

const ClientDefinedRoutes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/pages/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/pages/authentication/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },

  {
    path: '/dashboard',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true
  },
  {
    path: '/clients/',
    component: lazy(() => import('../../views/apps/user/list')),
    exact: true
  },

  {
    path: '/clients/view/:id',
    component: lazy(() => import('../../views/apps/user/view')),
    meta: {
      navLink: '/apps/user/view'
    }
  },
  {
    path: '/clients/edit/:id',
    component: lazy(() => import('../../views/apps/user/edit'))
  },

  // {
  //   path: '/products',
  //   component: lazy(() => import('../../views/Application/products'))
  // },
  {
    path: '/products',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/shop'))
  },

  {
    path: '/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/detail')),
    meta: {
      navLink: '/product-detail'
    }
  },
  {
    path: '/orders',
    component: lazy(() => import('../../views/apps/invoice/list'))
  },
  {
    path: '/create_order',
    component: lazy(() => import('../../views/apps/invoice/add'))
  },
  {
    path: '/invoice/preview/:id',
    component: lazy(() => import('../../views/apps/invoice/preview')),
    meta: {
      navLink: '/apps/invoice/preview'
    }
  },
  {
    path: '/profile',
    // component: lazy(() => import('../../views/pages/profile'))
    component: lazy(() => import('../../views/pages/account-settings'))
  },
  {
    path: '/contact',
    component: lazy(() => import('../../views/Application/contact'))
  },
  {
    path: '/news/offers',
    component: lazy(() => import('../../views/Application/news'))
  }
]

export default ClientDefinedRoutes
