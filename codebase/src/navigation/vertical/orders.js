import * as Icon from 'react-feather'

export default [
  {
    id: 'apps',
    title: 'Realizar Pedido',
    type: 'item',
    icon: <Icon.Package size={16} />,
    navLink: '/create_order',
    permissions: ['admin', 'user', 'personal', 'friend', 'relatives']
  },
  {
    id: 'uiElements',
    title: 'Mis Pedidos',
    type: 'item',
    icon: <Icon.Layers size={16} />,
    permissions: ['admin', 'user', 'personal', 'friend', 'relatives'],
    navLink: '/orders'
  }
]
