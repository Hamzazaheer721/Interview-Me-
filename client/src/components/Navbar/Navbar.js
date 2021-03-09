import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import './Navbar.css'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Avatar} from "@material-ui/core";
import {dispatchMakeVisible, dispatchMakeInvisible, dispatchToggleVisible} from '../../redux/actions/authAction';
import {useLocation} from 'react-router-dom'
import {
  Nav,
  NavLogoforHeader,
  NavIconForSidebar,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink
} from './Navbar.elements';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const {user, isLogged, isAdmin} = auth

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const location = useLocation()
  
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, [isLogged, user, isAdmin]);

  window.addEventListener('resize', showButton);
 
    

    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop--nav">
            <Link to="#" className="avatar">
            <div className="avatar__div">
              <Avatar src={user.avatar} />
                <li className="avatar__div__li"><h4 className= "avatar__div__h4">{user.name} <i className="fas fa-angle-down"></i> </h4></li>
            </div>
            
            </Link>
            <ul className="drop-down">
                <li className="drop-down-li"><Link to="/profile">Profile</Link></li>
                <li className="drop-down-li"><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </li>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          
          <NavbarContainer>
            {
              isLogged && location.pathname === "/main-menu" && (
              <NavIconForSidebar to ="#" > 
                <FaIcons.FaBars onClick={()=> {dispatch(dispatchToggleVisible())}} />
              </NavIconForSidebar>
              )
            }
          
          {
            isLogged && location.pathname === "/main-menu" ? (
              < > </>
            ) : (
              <NavLogoforHeader to='/' onClick={closeMobileMenu}>
                <NavIcon />
                Interview ✮ Me
              </NavLogoforHeader>
            )
          }
          
          {/* <NavLogoforHeader to='/' onClick={closeMobileMenu}>
                <NavIcon />
                Interview ✮ Me
              </NavLogoforHeader> */}
            
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to='/home' onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>
              {
                isLogged ? (
                  <NavItem>
                      <NavLinks to='/main-menu' onClick={closeMobileMenu}>
                        Main Menu
                    </NavLinks>
                  </NavItem>
                ) : (
                  <>
                <NavItem>
                  <NavLinks to='/services' onClick={closeMobileMenu}>
                    Services
                  </NavLinks>
                </NavItem>
                
                <NavItem>
                  <NavLinks to='/products' onClick={closeMobileMenu}>
                    Products
                  </NavLinks>
                </NavItem>
                </>
                )
              }
              
              {
                !isLogged && (
                  <NavItemBtn>
                    {button ? (
                      <NavBtnLink to='/sign-up'>
                        <Button primary>SIGN UP</Button>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink to='/sign-up'>
                        <Button onClick={closeMobileMenu} fontBig primary>
                          SIGN UP
                        </Button>
                      </NavBtnLink>
                    )}
                  </NavItemBtn>
                )
              }
              
              <ul style={transForm}>
                {
                    isLogged
                    ? userLink()
                    :(
                      <Link to="/login">
                        <div className= "avatar__div">
                          <Avatar /> 
                          <li className= "avatar__div__li"><h4 className= "avatar__div__heading"> Sign In</h4></li>
                        </div>
                      </Link>
                    )
                  } 
              </ul>

            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
