
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserBlogScreen from './UserBlogScreen';
import UserProfileScreen from './UserProfileScreen';
import {Link} from 'react-router-dom';
import {Col, Nav, Row, Tab, Tabs, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
function UserScreen() {
    const [key, setKey] = useState('home');
  return (
    <>
    <div style={{height: '30vh', overflow: "hidden", backgroundSize: "cover", backgroundImage:"url(https://source.unsplash.com/random/?nature)"}}>
    {/* <Image src = "https://source.unsplash.com/random/?anime" fluid></Image> */}
    {/* <Avatar></Avatar> */}
    </div>
    <Tab.Container defaultActiveKey="profile">
          <Nav variant="pills" className="flex-row">
          <LinkContainer to="profile">
            <Nav.Item>
              {/* Link container doesn't work here  */}
              <Nav.Link eventKey="profile" as={Link} to={'profile'}>Profile</Nav.Link>
            </Nav.Item>
            </LinkContainer>
            <LinkContainer to="blog">
            <Nav.Item>
              <Nav.Link eventKey="blog" as={Link} to={'blog'}>Blog</Nav.Link>
            </Nav.Item>
            
            </LinkContainer>
          </Nav>
      <Tab.Content>
            <Outlet />
        </Tab.Content>
    </Tab.Container>
    </>
  )
}

export default UserScreen