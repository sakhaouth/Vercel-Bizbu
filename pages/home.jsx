import { useState } from "react"
import Form from 'react-bootstrap/Form';
import Cart from "./cart";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AddCart from "./addCart";
import {List} from 'react-bootstrap-icons'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Home()
{
    const [val,setVal] = useState('')
    const onSearch = (e) =>
    {
        console.log(e.target.value)
    }
    const n = [5,7,6,5,58,4,7,4,8,8,7,3,7,9,1]
    const set = () =>
    {
        n.map((x) =>{
            console.log(x)
        })
        // return(
        //     <Row>
        //     n.map((x) =>{
        //         console.log(x)
        //         // <Col><Cart></Cart></Col>
        //      )}
        //     </Row>
        // )
    }
    return(
        <>
            <div className="mainContainer">
                <Form className="serachBarContainer">
                    
                    
                        
                        <Form.Control
                            
                            type="search"
                            placeholder="Search Products"
                            className="me-2"
                            aria-label="Search"
                            onChange={onSearch}
                            
                        >
                        
                        </Form.Control>
                    
                    
                </Form>
                <Container fluid>
                    <Row className="justify-content-md-center" lg={4} id="productRow">
                        {
                            n.map((x) => {
                                return (<Col key='ss'><Cart></Cart></Col>)
                            })
                        }
                        <Col><AddCart></AddCart></Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default Home