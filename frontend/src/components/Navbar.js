import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements.js";

const Navbar = () => {
    return (
        <>
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
                    <NavLink to="/Login" activeStyle>
                        Login
                    </NavLink >
                </NavMenu>
            </Nav>

        </>
    );
};

export default Navbar;