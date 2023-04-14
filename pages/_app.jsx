import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/index.scss'
const MyApp = ({ Component, pageProps }) => {
  console.log('my value')
  console.log(process.env.PUBLIC)
    return (
      <div className='mainContainer'>
        <Component {...pageProps} />
      </div>
    )
  }
  export default MyApp