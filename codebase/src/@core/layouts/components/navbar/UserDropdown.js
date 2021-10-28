// ** React Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@store/actions/auth";

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch();

  // ** State
  const Auth = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);
  //** ComponentDidMount
  useEffect(() => {
    if (Auth.isAuthenticated.authenticated) {
      setUserData(Auth.userData.user);
      setUserType(Auth.userData.type);
    }
  }, [Auth]);

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar;

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold text-capitalize">
            {userData ? userData.name : ""}
          </span>
          <span className="user-status text-capitalize">{userType}</span>
        </div>
        {/* <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" /> */}
        <Avatar
          color="light-primary"
          className="mr-50"
          content={userData?.name ? userData?.name : "John Doe"}
          initials
        />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          tag={Link}
          to="/login"
          onClick={() => dispatch(handleLogout())}
        >
          <Power size={14} className="mr-75" />
          <span className="align-middle">Cerrar sesión</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
