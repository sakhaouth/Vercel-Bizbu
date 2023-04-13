import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import Spinner from 'react-bootstrap/Spinner'
import PUBLIC from './values'
// import LOCAL from './values'
function UserProfile()
{
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    // const data = router.query
    const [imageFile,setImageFile] = useState("https://random.imagecdn.app/500/150")
    const [data,setData] = useState({
        name : "",
        email : "",
        number : "",
        address : ""
    })
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
        setData(data)
        console.log(data)
        setLoading(false)
    }
    useEffect(() => {
        getUser()
    },[])
    return(
        <>
            <div className='profileView'>
            <div className="text-center" id='post_image' fluid>
                <Image src={imageFile} rounded thumbnail fluid roundedCircle></Image>
            </div>
            <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                    >
                    <Form.Control value={data['name']} type='text' readOnly placeholder="name" required name = 'name'/>
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
                    <Form.Control value={data['number']} type='text' placeholder="number" readOnly required/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Address"
                        className="mb-3"
                    >
                    <Form.Control value={data['address']} type='text' placeholder="address"readOnly required/>
                    </FloatingLabel>
                    
                    
                    
                    
                    
                    {!loading ? (<Button type='submit'>Save</Button>) : (<Button disabled><Spinner animation='grow'></Spinner> Loading...</Button>)}
                </Form>
            </div>
        </>
    )
}
export default UserProfile