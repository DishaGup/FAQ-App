import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { FcUnlock, FcLock } from "react-icons/fc";
import { GiHamburgerMenu } from "react-icons/gi";
import { searchQuestions } from "../redux/faq/faqAction";


const Header = styled.header`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #b2ff59;
  padding: 10px;
  border-bottom: 2px solid #388e3c;
  margin-bottom: 100px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const MenuButton = styled.button`
  font-size: 20px;
  color: black;
  transition: all 0.2s;
  border-radius: 8px;
  border: 1px solid black;
  padding: 8px;
  background: none;

  &:hover {
    background: none;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavbarLinks = styled.div`
  display: flex;
  align-items: center;
  justify: space-between; 
  min-width:300px
  flex-gap: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const NavbarLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-weight: 500;
  margin-left:20px
  margin:

  &.active {
    color: #2e7d32;
    text-decoration: underline;
    font-weight: 500;
  }
`;

const LogoutButton = styled.button`
  font-size: 18px;
  color: black;
  background: none;
  border: none;
  cursor: pointer;
`;
const SearchInput = styled.input`
  border: 2px solid white;
  padding: 8px;
  border-radius: 8px;
  color: white;
  background: transparent;
  position: relative;
  width: 150px;

  @media (max-width: 767px) {
    margin-bottom: 10px;
  }
`;

const SearchBarResults = styled.div`
  width: 100%;
  background-color: light-orange;
  color: white;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
`;
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchTask, setSearchTask] = useState("");
  const { role, token } = useSelector((store) => store.authReducer);
  const { searchResults } = useSelector((store) => store.faqReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTask(searchTerm);

    if (searchTerm.length >= 3) {
      dispatch(searchQuestions(searchTerm)); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role_faq");
    localStorage.removeItem("token_faq");
  };

  return (
    <>
      <Header>
        <MenuButton onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu />
        </MenuButton>
        <NavbarLinks>
          <NavbarLink to="/" end>
            Questions
          </NavbarLink>
          {token && token !== "" ? (
            <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
          ) : (
            <>
              <NavbarLink to="/login" end>
                Login
              </NavbarLink>
            </>
          )}
          {role && role == "Admin" && (
            <NavbarLink to="/admin" end>
              Admin
            </NavbarLink>
          )}
        </NavbarLinks>

        <SearchInput
          type="search"
          minLength={3}
          placeholder="Search..."
          onChange={handleSearch}
          onKeyUp={handleSearch}
        />
      </Header>
      {searchResults &&
        searchResults.length >= 1 &&
        searchResults.map((el, index) => (
          <SearchBarResults>
            <Link to={`/faq/${el._id}`}>{el.content}</Link>
          </SearchBarResults>
        ))}
    </>
  );
};

export default Navbar;
