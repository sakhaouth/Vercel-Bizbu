import { useRouter } from 'next/router'
function Order(params)
{
    const router = useRouter()
    console.log(router.query);
    return(
        <>
            <div>order</div>
        </>
    )
}
export default Order