import { useRouter } from 'next/router'
import { useState,useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Cart from './cart';
import OrderView from './orderView';
function Order(params)
{
    const PUBLIC = process.env.PUBLIC
    const [loading,setLoading] = useState(false)
    const [qType,setQtype] = useState('pending')
    const [orders,setOrders] = useState([])
    // const [orders,setOrders] = useState({
    //     shop_name : "",
    //     owner_email : "",
    //     product_name : "",
    //     quantity : 0,
    //     total_price : 0,
    //     total_discount : 0,
    //     net_price : 0,
    //     request_date : null,
    //     request_time : null,
    //     action_date : null,
    //     action_time : null
    // })
    const makeRequest = async (querType) => 
    {
        const url = PUBLIC + '/bizbud/executeproducts'
        setLoading(true)
        const response = axios.get(url,{withCredentials:true,params:{
            uType : params.type,
            qType : querType
        }})
        const info = (await response).data
        if(info['status'] == 'ok')
        {
            setOrders(info['object'])
            console.log(orders.length)
            orders.forEach(e => {
                console.log(e)
            })
        }
        setLoading(false)
    }
    const seePanding = () =>
    {
        console.log('pending')
        setQtype('pending')
        makeRequest("pending")
    }
    const seeConfirmed = () =>
    {
        console.log('confirm')
        setQtype('confirm')
        makeRequest("confirm")
    }
    const seeCanceled = () =>
    {
        console.log('canceled')
        setQtype("cancel")
        makeRequest("cancel")
    }
    useEffect(() => {
        
        makeRequest("pending")
    },[])
    const selectHandler = (eventKey) =>
    {
        setOrders([])
        if (eventKey === "pending")
        {
            seePanding()
        }
        else if (eventKey === "confirm")
        {
            seeConfirmed()
        }
        else if (eventKey === "cancel")
        {
            seeCanceled()
        }
    }
    return(
        <>
            <Tabs defaultActiveKey="pending" fill onSelect={selectHandler}> 
                <Tab eventKey="pending" title = "Pending">
                    <div className='order_holder'>
                    {
                        orders.map((x) => {
                            return (<OrderView key="a" show = {1} buyer = {x.buyer_email} type = {params.type} shop_name = {x.shop_name} quantity = {x.quantity} prod_name = {x.product_name} discount = {x.total_discount} price = {x.total_price} req_date = {x.request_date} req_time = {x.request_time}> act_date = {x.action_date} act_time = {x.action_time}</OrderView>)
                                // console.log(x)x.request_date
                        })
                    }
                    </div>
                </Tab>
                <Tab eventKey="confirm" title = "Confirmed">
                    {
                        orders.map((x) => {
                            return (<OrderView key='y' buyer = {x.buyer_email} show = {0} type = {params.type} shop_name = {x.shop_name} quantity = {x.quantity} prod_name = {x.product_name} discount = {x.total_discount} price = {x.total_price} req_date = {x.request_date} req_time = {x.request_time}> act_date = {x.action_date} act_time = {x.action_time} </OrderView>)
                                // console.log(x)x.request_date
                        })
                    }
                </Tab>
                <Tab eventKey="cancel" title = "Canceled">
                    {
                        orders.map((x) => {
                            return (<OrderView key = 'z' buyer = {x.buyer_email} show = {0} type = {params.type} shop_name = {x.shop_name} quantity = {x.quantity} prod_name = {x.product_name} discount = {x.total_discount} price = {x.total_price} req_date = {x.request_date} req_time = {x.request_time}> act_date = {x.action_date} act_time = {x.action_time} </OrderView>)
                                // console.log(x)x.request_date
                        })
                    }
                </Tab>
            </Tabs>
            <div className='main_order'>
                <div className="main_load">
                    {loading ? <Spinner animation='grow'></Spinner>:null}
                    {/* <Container fluid>
                    // <Row className="justify-content-md-center" lg={4} id="productRow"> */}
                        
                        
                    {/* </Row>
                </Container> */}
                </div>
            </div>
        </>
    )
}
export default Order