import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {PencilFill,SendCheckFill} from 'react-bootstrap-icons'
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
function Cart(props) {
    const [loading,setLoading] = useState(false)
    const PUBLIC = process.env.PUBLIC
    const makeRequest = async () =>
    {
        setLoading(true)
        const url = PUBLIC + '/bizbud/executeproducts'
        const post_data = {
            shop_name : props.shop_name,
            prod_name : props.name,
            owner_email : props.email,
            quntity : 1,
            discount : props.discount,
            price : props.price
        }
        const rawResponse = axios.post(url,post_data,{withCredentials:true})
        const res = (await rawResponse).data
        console.log(res['status'])
        setLoading(false)
    }
  return (
    <div className='cartContainer'>
        <Card>
            <Card.Img variant="top" src="https://random.imagecdn.app/500/150" />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.type === 'user' ? (
                        <div>
                            <p>This product is at <b>{props.shop_name}</b></p>
                            <p>Located in <b> {props.address}</b></p>
                        </div>
                        
                    ):null}
                    <p>Price {props.price} Tk & discount {props.discount} Tk</p>
                    <p><b><i>Net Price</i></b> {props.price - props.discount} Tk</p> 
                    <p>Stock Status : <b>{props.status}</b></p>
                </Card.Text>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Description</Accordion.Header>
                        <Accordion.Body>
                            {props.description}
                        </Accordion.Body>
                    </Accordion.Item>

      
                </Accordion>
            {loading ? (<Spinner animation='grow'></Spinner>) : null}
            {props.type === 'user' ? (<Button variant="secondary" className='editButton' onClick={makeRequest}>Request <SendCheckFill></SendCheckFill></Button>) :
            null}
            {props.type === 'owner' ? (<Button variant="secondary" className='editButton'><PencilFill></PencilFill> Edit</Button>) : null}
            </Card.Body>
        </Card>
    </div>
  );
}

export default Cart;