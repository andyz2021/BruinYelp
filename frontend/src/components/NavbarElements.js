import { NavLink as Link } from "react-router-dom";
import styled, { withTheme } from "styled-components";

// export const Nav = styled.nav`
//   background: rgb(207,207,207);
//   background: linear-gradient(0deg, rgba(207,207,207,1) 24%, rgba(182,182,182,1) 53%, rgba(162,162,162,1) 82%);
//   height: 85px;
//   display: flex;
//   justify-content: space-between;
//   padding: 0.2rem calc((100vw - 1000px) / 2);
//   z-index: 12;
//   marginBottom: '.8rem'
// `;

export const Nav = styled.nav`
background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(55, 51, 51, .7) 100%);
height: 85px;
  display: flex;
  justify-content: center;
  padding: 25px;
`;

export const NavLink = styled(Link)`
  color: #FFFFFF;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 3rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #1D2D5F;
    font-weight: bold;
    font-size: 17px;
  }
  &:hover {
    display: inline-block;
    position: relative;
    color: #1D2D5F;
  }
  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: #1D2D5F;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover::after {
    width: 100%; 
    left: 0; 
  }
    
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;