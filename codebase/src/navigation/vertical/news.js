import * as Icon from 'react-feather'

export default [
  {
    id: 'pages',
    title: 'Noticias',
    type: 'item',
    icon: <Icon.FileText size={16} />,
    navLink: '/news/offers',
    permissions: ['admin']
  }
]
