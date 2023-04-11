import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {PlusCircle} from 'react-bootstrap-icons'
function AddCart() {
  return (
    <div className='cartContainer'>
        <Card>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title>Add Product</Card.Title>
                <Card.Text>
                    add your product to show to your customer
                </Card.Text>
                <Button variant="primary" size='lg' className='addProductButton'><PlusCircle size={30} title='Add new product.'></PlusCircle> Add Product</Button>
            </Card.Body>
        </Card>
    </div>
  );
}

export default AddCart;