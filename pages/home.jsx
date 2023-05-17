import { useState, useEffect } from "react"
import Form from 'react-bootstrap/Form';
import Cart from "./cart";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AddCart from "./addCart";
import {List} from 'react-bootstrap-icons'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import MySpinner from "./load";
import Spinner from 'react-bootstrap/Spinner';
// import PUBLIC from "./values";
import axios from "axios";
function Home(params)
{   
    const PUBLIC = process.env.PUBLIC
    const router = useRouter()
    const info = router.query
    console.log('here show -> '+ params.type)
    const [val,setVal] = useState('')
    
    const onSearch = (e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target.value)
    }
    
    const callBackFunctin = (x) =>
    {
        params.fu(x)
    }
    const [isLoading,setIsLoading] = useState(false)
    const n = [5,7,6,5,58,4,7,4,8,8,7,3,7,9,1]
    const [post,setPost] = useState([])
    const fu = async (x) => {
        console.log('herer i m tell me')
        console.log(x)
        setIsLoading(true)
        const params = {
            val : x 
        }
        // let url = 'http://localhost:8000/bizbud/addshop'
        
        // let url = 'http://localhost:8000/bizbud/getposts'
        let url = ''
        console.log('just before')
        console.log(params.type)
        if (params.type === 'user')
        {
            console.log('user typing')
            url = PUBLIC + '/bizbud/getproductstobuy'
        }
        else
        {
            console.log('owner typing')
            url = PUBLIC + '/bizbud/getposts'
        }
        
            const response = axios.get(url,{withCredentials:true,params})
            const info = (await response).data
            if(info['status'] == 'ok')
            {
                console.log(info['object'])
                // setData(info['object'])
                // setData(prevData => ({...prevData,['shopName'] : odata['shopName']} ))
                // setIsExist(true)
                setPost(info['object'])
            }
            setIsLoading(false)
    }
    
    useEffect(() => {
        
        if(params.type !== null)
        {
            fu("")
        }
    },[params])
    const onHitSearch = (e) =>
    {
        
        if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
            // Handle enter key press here
            console.log(e.target.value);

            fu(e.target.value)
          }
    }
    return(
        <>
            {/* <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR> */}
            <div className="mainContainer">
                
                <Form className="serachBarContainer">
                    
                    
                        
                        <Form.Control
                            
                            type="search"
                            placeholder="Search Products"
                            className="me-2"
                            aria-label="Search"
                            onKeyDown = {onHitSearch}
                            onChange={onSearch}
                            
                        >
                        
                        </Form.Control>
                    
                    
                </Form>
                <div className="main_load">
                {isLoading ? <Spinner animation='grow'></Spinner>:null}
                </div>
                <Container fluid>
                    <Row className="justify-content-md-center" sm={12} md={6} lg={4} id="productRow">
                        {
                            post.map((x,i) => {
                                return (<Col key = {i}><Cart fu = {callBackFunctin} name = {x.product_name} price = {x.product_price} description = {x.product_description} discount = {x.product_discount} shop_name = {x.product_shop_name} status = {x.product_stock_status} address = {x.address} type = {params.type} email = {x.product_owner_email}></Cart></Col>)
                                // console.log(x)
                            })
                        }
                        
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default Home