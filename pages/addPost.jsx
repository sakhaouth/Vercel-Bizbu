import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect } from 'react';
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
    () => import('../src/components/NavBar'),
    { ssr: false }
  )
const AddPost = () =>
{
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
    return(
        <>
        <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR>
        <div className='add_post_container'>
            <div className="text-center" id='post_image' fluid>
                <Image src={imageFile} rounded thumbnail fluid></Image>
            </div>
            <div className="d-grid gap-2">
                <Form>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose product image</Form.Label>
                        <Form.Control type="file"  required onChange={imageChangeHandle}/>
                    </Form.Group>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Product Name"
                        className="mb-3"
                    >
                    <Form.Control type='text' placeholder="product name" required/>
                    </FloatingLabel>
                    
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Product Price"
                        className="mb-3"
                    >
                    <Form.Control type='number' placeholder="product price" required/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Product Discount"
                        className="mb-3"
                    >
                    <Form.Control type='number' placeholder="product discount"/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Product Description"
                        className="mb-3"
                    >
                    <Form.Control as="textarea" placeholder="product Description" style={{ height: '100px' }} required/>
                    </FloatingLabel>
                    <Form.Select aria-label="Default select example" required>
                        <option>Select stock status</option>
                        <option value="1">IN</option>
                        <option value="2">OUT</option>
                    </Form.Select>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        </div>
        </>
    )
}
export default AddPost