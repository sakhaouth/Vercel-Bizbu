import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Truck } from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner'
import PUBLIC from './values';
function Config()
{
    const [isExist,setIsExist] = useState(false)
    const [message,setMessage] = useState()
    const [isMessage,setIsMessage] = useState(false)
    const [imageFile,setImageFile] = useState(null)
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({
        'shopName' : "",
        "title" : "",
        "address" : ""
    })
    const [odata,setoData] = useState({
        'shopName' : "",
        "title" : "",
        "address" : ""
    })
    
    const fu = async () => {
        setLoading(true)
        // let url = 'http://localhost:8000/bizbud/addshop'
        let url = PUBLIC + '/bizbud/addshop'
        
             const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json'
                
                }
                
            })
            console.log('kooooooi')
            const info = await response.json()
            // setMessage(res['status'])
            if(info['status'] === 'ok' )
            {
                console.log('here im')
                // setMessage('saved')
                setData(info['object'])
                // setData(prevData => ({...prevData,['shopName'] : odata['shopName']} ))
                setIsExist(true)
            }
            setLoading(false)
            
            // setIsMessage(true)
            // setIsExist(false)
    }
    const formSubmit = async(e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true)
        console.log(data)
        if(isExist)
        {
            // const url = 'http://localhost:8000/bizbud/editshop'
            const url = PUBLIC + '/bizbud/editshop'
            const rawResponse  = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
            // mode : 'cors',
            
            
          })
          console.log('sdlkjh')
        // const x = new Cookies()
        
        // await console.log('res')
        // await console.log(x.getAll())
        // print('why not -> '+x)
        const res = await rawResponse.json();
        console.log('res' + res['object'])
        setMessage('updated')
        setIsMessage(true)
        }
        else
        {
            // const url = 'http://localhost:8000/bizbud/addshop'
            const url = PUBLIC + '/bizbud/addshop'
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
            setMessage('saved')
            setIsMessage(true)
        }
        setLoading(false)
        
    }
    useEffect(() => {
        console.log('kirreeeeeeeeeeeee')
        fu()
    },[])
    return(
        <>
            <div className="addShopForm">
                <Form>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Shop Name"
                        className="mb-3"
                    >
                    <Form.Control value={data['shopName']} type='text' placeholder="Shop name" readOnly={isExist} onChange={(e) => {setData(prevData => ({...prevData,['shopName'] : e.target.value} ))}}/>
                    </FloatingLabel>
                    
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Title"
                        className="mb-3"
                    >
                    <Form.Control value={data['title']} type='text' placeholder="Title" required onChange={(e) => {setData(prevData => ({...prevData,['title'] : e.target.value} ))}}/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Address"
                        className="mb-3"
                    >
                    <Form.Control value={data['address']} type='text' placeholder="Address" onChange={(e) => {setData(prevData => ({...prevData,['address'] : e.target.value} ))}}/>
                    </FloatingLabel>
                    {isMessage ? (<p className='normal'>*{message}</p>) : null}
                    {!loading ? (<Button type='submit' onClick={formSubmit}>Save</Button>) : (<Button disabled><Spinner></Spinner>  Loading...</Button>)}
                </Form>
            </div>
            
        </>
    )
}

export default Config