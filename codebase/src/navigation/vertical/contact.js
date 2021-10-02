import * as Icon from 'react-feather'

export default [
  {
    id: 'charts-maps',
    title: 'Contacto',
    type: 'item',
    icon: <Icon.PieChart size={16} />,
    navLink: '/contact',
    permissions: ['admin', 'user', 'personal', 'friend', 'relatives']
  }
]
