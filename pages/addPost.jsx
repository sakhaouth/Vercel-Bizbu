import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import dynamic from 'next/dynamic'
import Spinner from 'react-bootstrap/Spinner';
import PUBLIC from './values'
const AddPost = () =>
{
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
    const [preview, setPreview] = useState()
    const imageChangeHandle = (e) =>
    {
        if (!e.target.files[0])
        {
            setImageFile(null)
        }
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setImageFile(objectUrl)
        
        // console.log(e.target.files[0])
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
        console.log('akhane acsei na')
        console.log(data['status'])
        setLoading(true)
        // return
        // const url = 'http://localhost:8000/bizbud/addpost'
        const url = PUBLIC + '/bizbud/addpost'
            const rawResponse  = await fetch(url, {
            method: 'POST',
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
        }
        else
        {
            setMessage('Something wrong')
        }
        setIsMessage(true)
        setLoading(false)
    }
    return(
        <>
        <div className='add_post_container'>
            <div className="text-center" id='post_image' fluid>
                <Image src={imageFile} rounded thumbnail fluid></Image>
            </div>
            <div className="d-grid gap-2">
                <Form onSubmit={formHandle}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose product image</Form.Label>
                        <Form.Control type="file"  required onChange={imageChangeHandle}/>
                    </Form.Group>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Product Name"
                        className="mb-3"
                    >
                    <Form.Control value={data['product_name']} type='text' placeholder="product name" required onChange={(e) => {setData(prevData => ({...prevData,['product_name'] : e.target.value} ))}}/>
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
        </>
    )
}
export default AddPost