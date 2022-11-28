import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements.js";
import { useAuth } from "../context/Authentication.js";

const Navbar = () => {
    let {currentUser}=useAuth();

    let loginOrDash= (currentUser==null)
        ?"Login"
        : "Dashboard"
    //the button will either display login or dashboard and redirect accordingly

    return (
            <Nav>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Main Menu
                    </NavLink>
                    <NavLink to="/Epicuria" activeStyle>
                        Epicuria
                    </NavLink>
                    <NavLink to="/Bruin_Plate" activeStyle>
                        Bruin Plate
                    </NavLink>
                    <NavLink to="/De_Neve" activeStyle>
                        De Neve
                    </NavLink >
                    <NavLink to={loginOrDash} activeStyle>
                        {loginOrDash}
                    </NavLink >

                </NavMenu>
            </Nav>
    );
};

export default Navbar;