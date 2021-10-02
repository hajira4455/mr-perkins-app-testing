import * as Icon from 'react-feather'

export default [
  {
    id: 'clients',
    title: 'Clientes',
    type: 'item',
    icon: <Icon.Users size={16} />,
    navLink: '/clients',
    permissions: ['admin']
  }
]
