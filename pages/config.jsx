import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
    () => import('../src/components/NavBar'),
    { ssr: false }
  )
function Config()
{
    return(
        <>
            <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR>
            <div>Config</div>
        </>
    )
}
export default Config