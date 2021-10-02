import * as Icon from 'react-feather'

export default [
  {
    id: 'forms-tables',
    title: 'Productos',
    type: 'item',
    icon: <Icon.Edit size={16} />,
    navLink: '/products',
    permissions: ['admin', 'user', 'personal', 'friend', 'relatives']
  }
]
