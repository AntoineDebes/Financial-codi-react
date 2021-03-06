import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { CgProfile, CgChevronDown } from "react-icons/cg";
import { CSSTransition } from "react-transition-group";
import Hamburger from "hamburger-react";
import { useAuth } from "../useContext/IsAuthContext";
import {
  StyledHeader,
  HeaderUser,
  HeaderUserProfile,
} from "../Styled/StyledHeader";
import { useUserCredential } from "../useContext/UserCredentialContext";

function Header({
  isHamburgureOpen,
  setIsSideBarOpen,
  isSideBarOpen,
  ...props
}) {
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const { setIsAuth } = useAuth();
  const { username } = useUserCredential();

  const changeonClick = async (e) => {
    e.preventDefault();
    localStorage.removeItem("login");

    props.history.push({
      pathname: "/",
    });
    setIsAuth(false);
    localStorage.clear();
  };

  return (
    <StyledHeader>
      {isHamburgureOpen && (
        <Hamburger onToggle={() => setIsSideBarOpen(!isSideBarOpen)} />
      )}

      <HeaderUser onClick={() => setProfileMenuIsOpen(!profileMenuIsOpen)}>
        <HeaderUserProfile>
          <CgChevronDown />
          <p>{username}</p>
          <CgProfile size={20} />
        </HeaderUserProfile>

        <CSSTransition
          in={profileMenuIsOpen}
          timeout={200}
          classNames="list-transition"
          unmountOnExit
        >
          <div className="header__user__menu">
            <p onClick={changeonClick}>Logout </p>
          </div>
        </CSSTransition>
      </HeaderUser>
    </StyledHeader>
  );
}

export default withRouter(Header);
