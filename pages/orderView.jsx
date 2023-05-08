import { Button } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
function OrderView(params)
{
    
    const PUBLIC = process.env.PUBLIC
    const [loading,setLoading] = useState(false)
    const [show,setShow] = useState(true)
    const confirm = async () =>
    {
        setLoading(true)
        const url = PUBLIC + '/bizbud/executeproducts'
        const data = {
            buyer_email : params.buyer,
            prod_name : params.prod_name,
            shop_name : params.shop_name,
            request_date : params.req_date,
            request_time : params.req_time,
            op : "confirm"
        }
        const rawResponse = axios.put(url,data,{withCredentials:true})
        const res = (await rawResponse).data
        console.log(res)
        if (res['status'] === 'ok')
        {
            setShow(false)
        }
        setLoading(false)
    }
    const cancel = async () => 
    {
        setLoading(true)
        const url = PUBLIC + '/bizbud/executeproducts'
        const data = {
            buyer_email : params.buyer,
            prod_name : params.prod_name,
            shop_name : params.shop_name,
            request_date : params.req_date,
            request_time : params.req_time,
            op : "cancel"
        }
        const rawResponse = axios.put(url,data,{withCredentials:true})
        const res = (await rawResponse).data
        console.log(res)
        if (res['status'] === 'ok')
        {
            setShow(false)
        }
        setLoading(false)
    }
    console.log('here im')
    console.log(params.buyer)
    return(
        <div className="order_view">
            <div className="inner">
                <p><b>{params.type === 'user'?"You are":params.buyer }</b> requsetesting in <b>{params.shop_name}</b> for {params.quantity} <b>{params.prod_name} </b></p>
                <p>Total discount is <b>{params.discount}</b> and net price is <b>{params.price}</b>  </p>
                <p>Requested in <b>{params.req_date}</b> at <b>{params.req_time}</b> {params.status}</p>
                {params.show === 1 & params.type === 'owner' & loading === false? (
                    <div className="action_button">
                    {show === true ? (<Row>
                        <Col><Button variant="secondary" onClick={confirm}>Confirm</Button></Col>
                        <Col><Button variant="danger" onClick={cancel}>Cancel</Button></Col>
                    </Row>):(<b>Action taken</b>)}
                </div>
                ):null}
                {loading ? (<Spinner animation="grow"></Spinner>):null}
            </div>
        </div>
    )
}
export default OrderView