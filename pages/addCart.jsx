import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {PlusCircle} from 'react-bootstrap-icons'
import Router, { withRouter } from 'next/router'
function AddCart() {
  const addProduct = (e) =>
  {
    
    e.preventDefault()
    Router.push({ pathname: '/addPost', state: { pattern: 'noman' } });
  }
  return (
    <div className='cartContainer'>
        <Card>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title>Add Product</Card.Title>
                <Card.Text>
                    add your product to show to your customer
                </Card.Text>
                <Button variant="primary" size='lg' className='addProductButton' onClick={addProduct}><PlusCircle size={30} title='Add new product.'></PlusCircle> Add Product</Button>
            </Card.Body>
        </Card>
    </div>
  );
}

export default AddCart;