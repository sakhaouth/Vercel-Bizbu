import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect } from 'react';
import { Link} from 'react-bootstrap-icons';
import Router, { withRouter } from 'next/router'
// import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner';
// import Cookies from 'universal-cookie';
// import cookieCutter from 'cookie-cutter'
import PUBLIC from './values';
// import LOCAL from './values';
import { getCookies, setCookie, deleteCookie } from 'cookies-next';
const SingIn = () =>
{
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState()
    const [isMessage,setIsMessage] = useState(false)
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
        // console.log(data)
        // http://localhost:8000
        setLoading(true)
        const url = PUBLIC + '/bizbud/signin'
        // const url = LOCAL + '/bizbud/signin'
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
        console.log('here is cookie')
        console.log(getCookies())
        //          to be opened
        if(res['status'] === 'ok')
        {
            console.log('completed')
            Router.push('/mainContainer');
        }

        console.log(res)
        setMessage(res['status'])
        setIsMessage(true)
        setLoading(false)
    }
    return(
        <div className='sign_in_container'>
            <div className='textPart'>
                <b><span>Log In for Shop Owner</span></b>
            </div>
        <Form onSubmit={formSubmit}>
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

            {isMessage ? (<p className='normal'>*{message}</p>) : null}

            {!loading ? (<Button type='submit'>LogIn</Button>) : (<Button disabled><Spinner animation='grow'></Spinner> Loading...</Button>)}
        </Form>
        <div className='forup'>
            <p>Are you new? <a href='/signUp'>Sign up</a> </p>
            
        </div>
        
    </div>
    )
}
export default SingIn