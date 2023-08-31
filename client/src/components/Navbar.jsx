import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
//import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
//import { USER_LOGOUT_SUCCESS } from '../Redux/actionTypes';
import { FcUnlock, FcLock } from 'react-icons/fc';
import { GiHamburgerMenu } from 'react-icons/gi';
//import { searchTaskInfo } from '../Redux/action';
//import SearchBarResults from './SearchBarResults';

const Header = styled.header`
  width: 100%;
  position:absolute;
  top:0;
  left:0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #b2ff59;
  padding: 10px;
  border-bottom: 2px solid #388e3c;

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

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const NavbarLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-weight: 500;

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
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTask, setSearchTask] = useState('');
  //const { userDetails, token, TaskData } = useSelector((store) => store.reducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const toast = useToast();

//   const handleSearch = (e) => {
//     setSearchTask(e.target.value);
//   };

//   const debouncedSearch = debounce((query) => {
//     // Your search logic here
//   }, 500);

//   useEffect(() => {
//     debouncedSearch(searchTask);

//     return () => {
//       debouncedSearch.cancel();
//     };
//   }, [searchTask]);

//   const handleLogout = () => {
//     // Handle logout logic here
//   };

  return (
    <>
      <Header>
        <MenuButton onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu />
        </MenuButton>
        <NavbarLinks>
          <NavbarLink to="/" end>
            Board
          </NavbarLink>
          {/* {token && token !== '' ? (
            <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
          ) : (
            <> */}
              <NavbarLink to="/login" end>
                Login
              </NavbarLink>
              <NavbarLink to="/register" end>
                Sign Up
              </NavbarLink>
            {/* </>
          )} */}
        </NavbarLinks>
        <SearchInput
          type="search"
          minLength={3}
          placeholder="Search..."
          //onChange={handleSearch}
        />
      </Header>
      {/* {searchResults && searchResults.length >= 1 && (
        <SearchBarResults data={searchResults} />
      )} */}
    </>
  );
};

export default Navbar;
