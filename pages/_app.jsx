import dynamic from 'next/dynamic'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/index.scss'
const DynamicComponentWithNoSSR = dynamic(
  () => import('../src/components/NavBar'),
  { ssr: false }
)
const MyApp = ({ Component, pageProps }) => {
    return (
      <div className='mainContainer'>
        <DynamicComponentWithNoSSR />
        <Component {...pageProps} />
      </div>
    )
  }
  export default MyApp