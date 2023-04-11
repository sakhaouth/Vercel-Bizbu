import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect } from 'react';
const SingIn = () =>
{
    const [data,setData] = useState({
        email : '',
        password : ''

    })
    const emailChaned = (e) =>
    {
        const value = e.target.value
        setData(prevData => ({
            ...prevData,
            ['email'] : value
        }))
    }
    const passChaned = (e) =>
    {
        const value = e.target.value
        setData(prevData => ({
            ...prevData,
            ['password'] : value
        }))
    }
    const formSubmit = async (e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        console.log(data)
        const url = 'http://localhost:8000/bizbud/signin'
        const rawResponse  = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
              
            }
            
          })
        
        // const content = await rawResponse.json();
        console.log(rawResponse)

    }
    return(
        <div className='sign_in_container'>
            <div className='textPart'>
                <b><span>Log In for Shop Owner</span></b>
            </div>
        <Form>
            <FloatingLabel
                controlId="floatingInput"
                label="Email Address"
                className="mb-3"
            >
                <Form.Control type='email' placeholder="Email address" required onChange={emailChaned}/>
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingTextarea"
                label="Password"
                className="mb-3"
            >
                <Form.Control type='password' placeholder="Password" required onChange={passChaned}/>
            </FloatingLabel>
            <Button type='Sign In' onClick={formSubmit}>Submit</Button>
        </Form>
    </div>
    )
}
export default SingIn