import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import dynamic from 'next/dynamic'
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const AddPost = (props) =>
{
    const PUBLIC = process.env.PUBLIC
    const [data,setData] = useState({
        "product_name" : "",
        "status":"",
        "price" : null,
        "discount": null,
        "description":""
    })
    
    const [message,setMessage] = useState()
    const [isMessage,setIsMessage] = useState(false)
    const [loading,setLoading] = useState(false)
    const [imageFile,setImageFile] = useState(null)
    const [rowImage,setRowImae] = useState(null)
    const [preview, setPreview] = useState()
    var [reqMethodd,setMethod] = useState(null)
    const imageChangeHandle = (e) =>
    {
        if (!e.target.files[0])
        {
            setImageFile(null)
        }
        setRowImae(e.target.files[0])
        const objectUrl = URL.createObjectURL(e.target.files[0])
        console.log('here image')
        console.log(objectUrl)
        setImageFile(objectUrl)
        
        // console.log(e.target.files[0])
    }
    const saveImage = async () =>
    {
        console.log('image seve')
        if(rowImage === null)
        {
            setIsMessage(true)
            setLoading(false)
            return
        }
        const formData = new FormData()
        formData.append('image',rowImage)
        formData.append('prod',data["product_name"])
        var rawResponse = null
        var url = null 
        if(props.product === null)
        {
            url = PUBLIC + '/bizbud/productpic'
        }
        else
        {
            url =  PUBLIC + '/bizbud/editproductpic'
        }
        
        rawResponse = axios.post(url,formData,{withCredentials:true,headers: {'Content-Type': 'multipart/form-data'}})
        const res = (await rawResponse).data
        console.log('image status')
        console.log(res['status'])
        setIsMessage(true)
        setLoading(false)

    }
    const formHandle = async (e) =>{
        e.preventDefault();
        e.stopPropagation();
        
        // console.log(data)
        if(data['status'] === '')
        {
            setMessage('set stock status')
            setIsMessage(true)
            return
        }
        // const reqMethodd = 'POST'
        if(props.product === null)
        {
            reqMethodd = 'POST'
        }
        else
        {
            reqMethodd = 'PUT'
        }
        console.log('akhane acsei na')
        console.log(data['status'])
        setLoading(true)
        // return
        // const url = 'http://localhost:8000/bizbud/addpost'
        const url = PUBLIC + '/bizbud/addpost'
            const rawResponse  = await fetch(url, {
            method: reqMethodd,
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
            // mode : 'cors',
            
            
          })
        
        
        const res = await rawResponse.json();
        console.log('res' + res['object'])
        if (res['status'] === 'ok')
        {
            setMessage('Saved')
            saveImage()
        }
        else
        {
            setMessage(res['object'])
            setLoading(false)
            setIsMessage(true)
        }
        
    }
     
    useEffect( () => {
    if (props.product !== null)
    {
        setData({
        "product_name" : props.product.name,
        "status":props.product.status,
        "price" : props.product.price,
        "discount": props.product.discount,
        "description":props.product.description
        })
        setImageFile(props.product.image)
        console.log('imagefile')
        console.log(imageFile)
        // loadImage()
    }
    },[])
    return(
        <div className='dekha'>
        <div className='add_post_container'>
            <div className="text-center" id='post_image' fluid>
                <Image src={imageFile} alt='product_image' rounded thumbnail fluid></Image>
            </div>
            <div>
                <Form onSubmit={formHandle} enctype="multipart/form-data">
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose product image</Form.Label>
                        <Form.Control type="file" onChange={imageChangeHandle}/>
                    </Form.Group>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Product Name"
                        className="mb-3"
                    >
                    <Form.Control value={data['product_name']} type='text' readOnly = {props.product !== null} placeholder="product name" required onChange={(e) => {setData(prevData => ({...prevData,['product_name'] : e.target.value} ))}}/>
                    </FloatingLabel>
                    
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Product Price"
                        className="mb-3"
                    >
                    <Form.Control value={data['price']} type='number' placeholder="product price" required onChange={(e) => {setData(prevData => ({...prevData,['price'] : e.target.value} ))}}/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Product Discount"
                        className="mb-3"
                    >
                    <Form.Control value={data['discount']} type='number' placeholder="product discount" onChange={(e) => {setData(prevData => ({...prevData,['discount'] : e.target.value} ))}}/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Product Description"
                        className="mb-3"
                    >
                    <Form.Control value={data['description']} as="textarea" placeholder="product Description" style={{ height: '100px' }} required onChange={(e) => {setData(prevData => ({...prevData,['description'] : e.target.value} ))}}/>
                    </FloatingLabel>
                    <Form.Select value={data['status']} aria-label="Default select example" required onChange={(e) => {setData(prevData => ({...prevData,['status'] : e.target.value} ))}}>
                        <option value="0">Select stock status</option>
                        <option value="1">IN</option>
                        <option value="2">OUT</option>
                    </Form.Select>
                    {isMessage ? (<p className='normal'>*{message}</p>) : null}
                    {!loading ? (<Button type='submit'>Submit</Button>) : (<Button><Spinner animation='grow'></Spinner> Loading...</Button>)}
                </Form>
            </div>
        </div>
        </div>
    )
}
export default AddPost