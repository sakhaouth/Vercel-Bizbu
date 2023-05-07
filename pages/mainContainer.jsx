import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {List,PersonFillExclamation,HouseExclamationFill,BoxArrowLeft,GearWide,CartCheck,HouseAdd} from 'react-bootstrap-icons'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import { Button } from 'bootstrap';
import Link from 'next/link'
import Home from './home';
import Order from './order';
import { useRouter } from 'next/router'
import Router from 'next/router';
import Config from './config';
import { setConfig } from 'next/config';
import AddPost from './addPost';
import UserProfile from './profile';
import Spinner  from 'react-bootstrap/Spinner';
import cookie from 'js-cookie';
// import PUBLIC from './values'
const MainCOntainer = () =>
{
    const PUBLIC = process.env.PUBLIC
    console.log('container come')
    const router = useRouter()
    const info = router.query
    console.log('what is my name ' + info.type)
    const [showMenu,setShowMenu] = useState(false)
    const [who,setWho] = useState(0)
    const[outLoading,setOutLoading] = useState(false)
    const menuHandle = () =>
    {
        setShowMenu(true)
    }
    const homeHandle = (e) =>
    {
        setWho(0)
        setShowMenu(false)
    }
    const orderHandle = (e) =>
    {
        setWho(1)
        setShowMenu(false)
    }
    const configHandle = (e) =>
    {
        setWho(2)
        setShowMenu(false)
    }
    const addPostHandle = (e) =>
    {
        setWho(3)
        setShowMenu(false)
    }
    const profileHandle = (e) =>
    {
        setWho(4)
    }
    const logHandle = async(e) =>
    {
        setOutLoading(true)
        // const url = 'http://localhost:8000/bizbud/logout'
        const url = PUBLIC + '/bizbud/logout'
        console.log(url)
        console.log('send')
        const rawResponse  = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
              
            }
            
          })
        const res = await rawResponse.json()
        if(res['status'] === 'ok')
        {
            Router.push({ pathname: '/signIn' });
        }
        cookie.remove('id')
        setOutLoading(false)
    }
    
    return (
        <div>
            <Navbar bg='light' expand = 'lg' fixed='top'>
                <Container fluid>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link><List onClick={menuHandle} size={30} title='Menu'></List></Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Offcanvas show={showMenu} onHide={() => {setShowMenu(false)}}>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>BizBud</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Container fluid>
                                <Nav fill variant="tabs" defaultActiveKey="/home" >
                                    <Nav.Item onClick={homeHandle}>
                                        <Nav.Link ><HouseExclamationFill title='Go home'></HouseExclamationFill> Home</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={orderHandle}>
                                        <Nav.Link><CartCheck></CartCheck> Order</Nav.Link>
                                    </Nav.Item>
                                    
                                    {info.type === 'owner' ? (<Nav.Item onClick={configHandle}>
                                        <Nav.Link><GearWide></GearWide> Config</Nav.Link>
                                    </Nav.Item>) : null}
                                    {info.type === 'owner' ? (<Nav.Item onClick={addPostHandle}>
                                        <Nav.Link><HouseAdd></HouseAdd> Add Post</Nav.Link>
                                    </Nav.Item>) : null}
                                    <Nav.Item onClick={logHandle}>
                                       {!outLoading ? (<Nav.Link><BoxArrowLeft></BoxArrowLeft> Log out</Nav.Link>) : (<Spinner></Spinner>)}
                                    </Nav.Item>
                                    
                                </Nav>
                            </Container>
                        </Offcanvas.Body>
                    </Offcanvas>
                    <Nav className="justify-content-center">
                        <Nav.Item>
                            <span><b><i>BizBud</i></b></span>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-left">
                        <Nav.Item onClick={profileHandle}>
                            <div>
                            <Nav.Link >
                                <PersonFillExclamation size={30}>

                                </PersonFillExclamation>
                            </Nav.Link>
                            </div>
                        </Nav.Item>
                    </Nav>
                </Container>    
            </Navbar>
            <div className='final_main'>
                {who === 0 ? <Home type = {info.type}></Home>:null}
                {who === 1 ? <Order type = {info.type}></Order>:null}
                {who === 2 ? <Config></Config>:null}
                {who === 3 ? <AddPost></AddPost>:null}
                {who === 4 ? <UserProfile></UserProfile>:null}
            </div>
        </div>
      );
}
export default MainCOntainer