import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
// import PUBLIC from './values'
// import LOCAL from './values'
function UserProfile()
{
    const PUBLIC = process.env.PUBLIC
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    // const data = router.query
    const [imageFile,setImageFile] = useState(null)
    const [change,setChange] = useState(true)
    const [data,setData] = useState({
        name : "",
        email : "",
        number : "",
        address : ""
    })
    const loadImage = async() => 
    {
        const url = PUBLIC + '/bizbud/getpropic'
        const rawResponse = axios.get(url, {withCredentials:true,
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
        setLoading(false)

    }
    const getUser = async () =>
    {
        setLoading(true)
        
        // const url = 'http://localhost:8000/bizbud/getuser'
        const url = PUBLIC + '/bizbud/getuser'
        const result = await fetch(url,
            {
                method:'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                    
                  }
            }

        )
        console.log('here is thhe')
        const ans = await result.json()
        const status = await ans['status']
        const data = await ans['object']
        console.log(status)
        if(ans['status'] === 'ok')
        {

            setData(data)
        }
        
        console.log(data)
        loadImage()
    }
    useEffect(() => {
        getUser()
    },[])
    const handler = async() =>{
        if(change)
        {
            setChange(false)
        }
        else
        {
            setLoading(true)
            const url = PUBLIC + '/bizbud/editprofile'
            const rawResponse = axios.put(url,data,{withCredentials:true})
            const res = (await rawResponse).data
            setLoading(false)
            setChange(true)

        }
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
    const addressChaned = (e) =>
    {
        const value = e.target.value
        setData(prevData => ({
            ...prevData,
            ['address'] : value
        } ))
        // console.log(data)
    }
    return(
        <>
            <div className='profileView'>
            <div className="text-center" id='post_image' fluid>
                <Image alt='user_image' src={imageFile} rounded thumbnail fluid roundedCircle></Image>
            </div>
            <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                    >
                    <Form.Control value={data['name']} type='text' readOnly = {change} onChange={nameChaned} placeholder="name" required name = 'name'/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                    >
                    <Form.Control value={data['email']} type='email' placeholder="email" readOnly/>
                    </FloatingLabel>
                    
            
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Contact Number"
                        className="mb-3"
                    >
                    <Form.Control value={data['number']} type='text' placeholder="number" readOnly = {change} onChange={numberChaned} required/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Address"
                        className="mb-3"
                    >
                    <Form.Control value={data['address']} type='text' placeholder="address"readOnly = {change} onChange={addressChaned} required/>
                    </FloatingLabel>
                    
                    
                    
                    
                    
                    {!loading ? (<Button onClick={handler}>{change === false ? 'Save' : 'Edit'}</Button>) : (<Button disabled><Spinner animation='grow'></Spinner> Loading...</Button>)}
                </Form>
            </div>
        </>
    )
}
export default UserProfile