import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect } from 'react';
const SignUp = () =>
{
    const [imageFile,setImageFile] = useState(null)
    const [data,setData] = useState({
        name : '',
        email : '',
        password : '',
        re_password : '',
        number : '',
        address : ''

    })
    const formSubmit = (e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        console.log(data)
    }
    const nameChaned = (e) =>
    {
        // const [name,value] = e.target
        const value = e.target.value
        console.log('Value -> ' + value)
        setData(prevData => ({
            ...prevData,
            ['name'] : e.target.value
        } ))
        // console.log(data)
    }
    const emailChaned = (e) =>
    {
        const value = e.target.value
        setData(prevData => ({
            ...prevData,
            ['email'] : value
        } ))
        // console.log(data)
    }
    const passChaned = (e) =>
    {
        const value = e.target.value
        setData(prevData => ({
            ...prevData,
            ['password'] : value
        } ))
    }
    const rePassChaned = (e) =>
    {
        const value = e.target.value
        setData(prevData => ({
            ...prevData,
            ['re_password'] : value
        } ))
        // console.log(data)
    }
    const numberChaned = (e) =>
    {
        const value = e.target.value
        setData(prevData => ({
            ...prevData,
            ['number'] : value
        } ))
        // console.log(data)
    }
    const addressChaned = (e) =>
    {
        const value = e.target.value
        setData(prevData => ({
            ...prevData,
            ['address'] : value
        } ))
        // console.log(data)
    }
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
        <div className='add_post_container'>
            <div className='textPart'>
                <b><span>Sing Up User</span></b>
            </div>
            <div className="text-center" id='post_image' fluid>
                <Image src={imageFile} rounded thumbnail fluid></Image>
            </div>
            <div className="d-grid gap-2">
            
                <Form onSubmit={formSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose Your image</Form.Label>
                        <Form.Control type="file"  required onChange={imageChangeHandle}/>
                    </Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                    >
                    <Form.Control value={data['name']} type='text' placeholder="name" required onChange={nameChaned} name = 'name'/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                    >
                    <Form.Control type='email' placeholder="email" required onChange={emailChaned}/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3"
                    >
                    <Form.Control type='password' placeholder="password" onChange={passChaned} required/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Repeat Password"
                        className="mb-3"
                    >
                    <Form.Control type='password' placeholder="repeat_password" onChange={rePassChaned} required/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Contact Number"
                        className="mb-3"
                    >
                    <Form.Control type='text' placeholder="number" required onChange={numberChaned}/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Address"
                        className="mb-3"
                    >
                    <Form.Control value={data['address']} type='text' placeholder="address" required onChange={addressChaned}/>
                    </FloatingLabel>
                    
                    
                    
                    
                    
                    <Button type='submit'>Sign Up</Button>
                </Form>
            </div>
        </div>
    )
}
export default SignUp