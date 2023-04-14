
import Home from "./home"
import SingIn from "./signIn"
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react"
import MainCOntainer from "./mainContainer"
import { useCookies } from "react-cookie"
import MySpinner from "./load"
import Router from "next/router"
// import PUBLIC from './values'
// import LOCAL from './values'
function Index()
{
    // console.log('my value')
    // console.log(PUBLIC)
    const PUBLIC = process.env.PUBLIC
    const [isLoading,setIsLoading] = useState(false)
    const [value,setValue] = useState(0)
    const [shopName,setShopName] = useState({})
    const fu = async () =>
    {
        setIsLoading(true)
        const url =  PUBLIC + '/bizbud/check'
        
        // const url =  LOCAL + '/bizbud/check'
        console.log(url)
        console.log('send')
        const rawResponse  = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
              
            }
            
          })
        const res = await rawResponse.json()

        if(res['status'] === 'ok')
        {
            const info = {
                shop_name : res['object']
            }
            
            // setShopName(info)
            // setValue(2)
            console.log('hello')
            console.log(res['object'])
            // console.log(shopName.shop_name)
            Router.push('/mainContainer');

        }
        else
        {
            setValue(1)
        }
        setIsLoading(false)
          
          
    }
    useEffect(() => {
        fu()
    },[])
    return(
        <>
            {isLoading ? <MySpinner></MySpinner>:null}
            {value === 1 ? <SingIn></SingIn> : null}
            {/* {value === 2 ? <MainCOntainer info = {shopName}></MainCOntainer> : null} */}
        </>
    )
}
export default Index