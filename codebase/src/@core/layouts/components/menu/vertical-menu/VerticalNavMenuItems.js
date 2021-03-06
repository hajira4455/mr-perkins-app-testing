// ** React Imports
import { useContext } from "react";

// ** Vertical Menu Components
import VerticalNavMenuLink from "./VerticalNavMenuLink";
import VerticalNavMenuGroup from "./VerticalNavMenuGroup";
import VerticalNavMenuSectionHeader from "./VerticalNavMenuSectionHeader";

// ** Ability Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Utils
import {
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent,
  canViewMenuGroup,
  canViewMenuItem,
} from "@layouts/utils";

const VerticalMenuNavItems = (props) => {
  // ** Context
  const ability = useContext(AbilityContext);

  // ** Components Object
  const Components = {
    VerticalNavMenuSectionHeader,
    VerticalNavMenuGroup,
    VerticalNavMenuLink,
  };

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)];
    if (!item.permissions.includes("others")) {
      if (item.permissions.includes(props.usertype)) {
        const TagName = Components[resolveNavItemComponent(item)];
        if (item.children) {
          return <TagName item={item} index={index} key={item.id} {...props} />;
        }
        return <TagName item={item} index={index} key={item.id} {...props} />;
      }
    }
  });

  return RenderNavItems;
};

export default VerticalMenuNavItems;
