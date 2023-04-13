import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {List,PersonFillExclamation,HouseExclamationFill,BoxArrowLeft,GearWide,CartCheck} from 'react-bootstrap-icons'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'bootstrap';
import Link from 'next/link'
function NavigationBarComonent(props)
{
    console.log(props.hello)
    const [showMenu,setShowMenu] = useState(false)
    const menuHandle = () =>
    {
        setShowMenu(true)
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
                                    <Nav.Item>
                                        <Nav.Link href='/home'><HouseExclamationFill title='Go home'></HouseExclamationFill> Home</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link><Link href={{pathname:'/order',query: { name: 'test' },}} ><CartCheck></CartCheck> Order</Link></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href='/config'><GearWide></GearWide> Config</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link><BoxArrowLeft></BoxArrowLeft> Log out</Nav.Link>
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
                        <Nav.Item>
                            <div>
                            <Nav.Link href='/profile'>
                                <PersonFillExclamation size={30}>

                                </PersonFillExclamation>
                            </Nav.Link>
                            </div>
                        </Nav.Item>
                    </Nav>
                </Container>    
            </Navbar>
        </div>
      );
}
export default NavigationBarComonent