
import Home from "./home"
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
    () => import('../src/components/NavBar'),
    { ssr: false }
  )
function Index()
{
    return(
        <>
            {/* <DynamicComponentWithNoSSR hello='hello' /> */}
            <Home></Home>
        </>
    )
}
export default Index