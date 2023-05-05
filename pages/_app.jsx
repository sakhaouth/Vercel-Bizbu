import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/index.scss'
import { getCookies, setCookie, deleteCookie } from 'cookies-next';
const MyApp = ({ Component, pageProps }) => {
  console.log('my value')
  console.log(process.env.PUBLIC)
  console.log(getCookies())
    return (
      <div className='mainContainer'>
        <Component {...pageProps} />
      </div>
    )
  }
  export default MyApp