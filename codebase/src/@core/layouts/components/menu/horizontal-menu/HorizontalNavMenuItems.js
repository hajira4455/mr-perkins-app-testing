// ** React Imports
import { useContext } from 'react'

// ** Ability Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Menu Components Imports
import HorizontalNavMenuLink from './HorizontalNavMenuLink'
import HorizontalNavMenuGroup from './HorizontalNavMenuGroup'
import {
  resolveHorizontalNavMenuItemComponent as resolveNavItemComponent,
  canViewMenuGroup,
  canViewMenuItem
} from '@layouts/utils'

const HorizontalNavMenuItems = props => {
  // ** Context
  const ability = useContext(AbilityContext)

  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink
  }
  // ** Render Nav Items
  const RenderNavItems = props.items.map((item, index) => {
    if (!item.permissions.includes('others')) {
      if (item.permissions.includes(props.usertype)) {
        const TagName = Components[resolveNavItemComponent(item)]
        if (item.children) {
          return <TagName item={item} index={index} key={item.id} {...props} />
        }
        return <TagName item={item} index={index} key={item.id} {...props} />
      }
    }
  })

  return RenderNavItems
}

export default HorizontalNavMenuItems
