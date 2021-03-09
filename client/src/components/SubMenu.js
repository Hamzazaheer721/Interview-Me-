import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item, user, role }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  useEffect (()=> {
    if( item.title == "Give Quiz" && role == 1){
      item.title = "Make Quiz";
      item.path = "./dashboard"
    }
    if( item.title == "Join Call" && role == 1){
      item.title = "Start Call";
    }
    console.log(item.title)
  },[role])
  return (
    <>
  
       <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
         <div>
           {item.icon}
           <SidebarLabel>{item.title}</SidebarLabel>
         </div>
         <div>
           {item?.subNav && subnav
             ? item.iconOpened
             : item.subNav
             ? item.iconClosed
             : null
           }
         </div>
       </SidebarLink>
       {subnav &&
         item.subNav.map((item, index) => {
          
           return (
             <DropdownLink to={item.path} key={index}>
               {item.icon}
               <SidebarLabel>{item.title}</SidebarLabel>
             </DropdownLink>
           );
         })}
    </>
  );
};

export default SubMenu;
