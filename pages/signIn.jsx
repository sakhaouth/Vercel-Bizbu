import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect } from 'react';
import { Link} from 'react-bootstrap-icons';
import Router, { withRouter } from 'next/router'
import cookie from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { getCookies, setCookie, deleteCookie } from 'cookies-next';
const SingIn = ({}) =>
{
    // console.log('okkkkk')
    const PUBLIC = process.env.PUBLIC
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
        // const rawResponse  = await fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     credentials: "include",
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Accept': 'application/json',
        //     },
        //     mode : 'cors'
            
            
        //   })
        const rawResponse = axios.post(url,data,{withCredentials:true})
        const res = (await rawResponse).data
        // console.log('interesting value')
        // console.log(rawResponse.cookies)
        console.log('here is cookie')
        console.log(getCookies())
        //          to be opened
        if(res['status'] === 'ok')
        {
            console.log('completed')
            Router.push('/mainContainer');
        }
        cookie.set('id',data.email,{expires : 1/24})
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
            <p>Are you new? <dev onClick={(e) => {Router.push('/signUp')}}><u>Sign up</u></dev> </p>
            
        </div>
        
    </div>
    )
}
export async function getServerSideProps({req,res}) {
    console.log(req.cookies.sessionid)
    console.log('tar agey')
    return {
      props: {}, // will be passed to the page component as props
    }
  }
export default SingIn