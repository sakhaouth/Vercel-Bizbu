import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {PencilFill,SendCheckFill} from 'react-bootstrap-icons'
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner';
function Cart(props) {
    const [loading,setLoading] = useState(false)
    const [imageFile,setImageFile] = useState(null)
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
            price : props.price,
        }
        const rawResponse = axios.post(url,post_data,{withCredentials:true})
        const res = (await rawResponse).data
        console.log(res['status'])
        setLoading(false)
    }
    const loadImage = async() => 
    {
        const url = PUBLIC + '/bizbud/productpic'
        const rawResponse = axios.get(url, {withCredentials:true,
            params: {
              prod: props.name
            },
            responseType: 'blob'
          })
        const res = (await rawResponse).data

        console.log('image part')
        console.log(res)
        if (res === null)
        {
            console.log('no inamge')
        }
        else
        {
            const url = await URL.createObjectURL(res)
            setImageFile(url)
            console.log('ok')
        }

    }
    useEffect(() => {
        
        loadImage()
    },[])
    const editHandler = () =>
    {
        const product = {
            name:props.name,
            price : props.price,
            description : props.description,
            discount : props.discount,
            shop_name : props.shop_name,
            status : props.status,
            image : imageFile
        }
        props.fu(product)
    }
  return (
    <div className='cartContainer'>
        {/* <Image src={imageFile} alt='product_image' rounded thumbnail fluid></Image> */}
        {/* <img src={imageFile} alt="Image description"></img> */}
        <Card>
            <Card.Img variant="top" src={imageFile} height='150 px' />
            <div className='loader'>
                {imageFile === null ? <Spinner></Spinner> : null}
            </div>
            
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
                    <p>Stock Status : <b>{props.status === '1' ? "IN" : "OUT"}</b></p>
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
            {props.type === 'owner' & imageFile !== null ? (<Button variant="secondary" onClick={editHandler} className='editButton'><PencilFill></PencilFill> Edit</Button>) : null}
            </Card.Body>
        </Card>
    </div>
  );
}

export default Cart;