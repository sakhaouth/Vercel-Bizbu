import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import Router from 'next/router';
import Spinner from 'react-bootstrap/Spinner';
import PUBLIC from './values';
const SignUp = () =>
{
    const [imageFile,setImageFile] = useState(null)
    const [message,setMessage] = useState()
    const [isMessage,setIsMessage] = useState(false)
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({
        name : '',
        email : '',
        password : '',
        re_password : '',
        number : '',
        address : ''

    })
    
    const formSubmit = async(e) =>
    {
        // setIsLoading(true)
        e.preventDefault();
        e.stopPropagation();
        
        if (data['password'] != data['re_password'])
        {
            setMessage('password doesn\'t match')
            setIsMessage(true)
            return
        }
        console.log(data)
        
        setLoading(true)
        // const url = 'http://localhost:8000/bizbud/signup'
        const url = PUBLIC + '/bizbud/signup'
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
        if (res['status'] == 'ok')
        {
            console.log('I am')
            Router.push('/signIn')
        }
        else
        {
            setMessage(res['status'])
            setIsMessage(true)
        }
        setLoading(false)
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
        
    }
    
    return(
        <div className='add_post_container'>
            <div className='textPart'>
                <b><span>Sing Up User</span></b>
            </div>
            
            <div className="text-center" id='post_image' fluid>
                <Image src={imageFile} rounded thumbnail fluid></Image>
            </div>
            <div>
            
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
                    
                    {isMessage ? (<p className='normal'>*{message}</p>) : null}
                    
                    
                    
                    
                    {!loading ? (<Button type='submit'>Sign Up</Button>) : (<Button disabled><Spinner></Spinner>  Loading...</Button>)}
                </Form>
                
                
            </div>
            <div className='forup'>
                <p>Have an account? <a href='/signIn'>Sign In</a> </p>
            </div>
        </div>
    )
}
export default SignUp