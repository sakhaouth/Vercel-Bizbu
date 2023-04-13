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
import PUBLIC from "./values";
function Home(params)
{   
    const router = useRouter()
    const info = router.query
    console.log('here show -> '+ info.shop_name)
    const [val,setVal] = useState('')
    const onSearch = (e) =>
    {
        console.log(e.target.value)
    }
    const [isLoading,setIsLoading] = useState(false)
    const n = [5,7,6,5,58,4,7,4,8,8,7,3,7,9,1]
    const [post,setPost] = useState([])
    const fu = async () => {
        setIsLoading(true)
        
        // let url = 'http://localhost:8000/bizbud/addshop'
        
        // let url = 'http://localhost:8000/bizbud/getposts'
        let url = PUBLIC + '/bizbud/getposts'
        // const param = URLSearchParams(info.shop_name)
        // url += param

        // console.log('ahei na')
        // console.log(params.shop_name)
        // console.log(url)
             const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json'
                
                }
                
            })
            const info = await response.json()
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
        
        fu()
    },[])
    
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
                            onChange={onSearch}
                            
                        >
                        
                        </Form.Control>
                    
                    
                </Form>
                <div className="main_load">
                {isLoading ? <Spinner animation='grow'></Spinner>:null}
                </div>
                <Container fluid>
                    <Row className="justify-content-md-center" lg={4} id="productRow">
                        {
                            post.map((x) => {
                                return (<Col><Cart name = {x['product_name']} price = {x["product_price"]} description = {x["product_description"]}></Cart></Col>)
                            })
                        }
                        
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default Home