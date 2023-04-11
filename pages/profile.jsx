function UserProfile({data})
{
    console.log(data)
    return(
        <>
            <div>{data.squadName}</div>
        </>
    )
}
// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch('http://localhost:3000/api/hello')
//     const data = await res.json()
//     console.log(data)
//     // Pass data to the page via props
//     return { props: { data }


//     }
//   }
  export async function getStaticProps() {
    // const res = await fetch('http://localhost:3000/api/hello')
    // const data = await res.json()
  
    // return {
    //   props: {
    //     data,
    //   },
    //   // Next.js will attempt to re-generate the page:
    //   // - When a request comes in
    //   // - At most once every 10 seconds
    //   revalidate: 10, // In seconds
    // }
  }
export default UserProfile