import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {PencilFill} from 'react-bootstrap-icons'
import Accordion from 'react-bootstrap/Accordion';
function Cart(props) {
  return (
    <div className='cartContainer'>
        <Card>
            <Card.Img variant="top" src="https://random.imagecdn.app/500/150" />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.price}
                </Card.Text>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Description</Accordion.Header>
                        <Accordion.Body>
                            {props.description}
                        </Accordion.Body>
                    </Accordion.Item>

      
                </Accordion>
            <Button variant="secondary" className='editButton'><PencilFill></PencilFill> Edit</Button>
            </Card.Body>
        </Card>
    </div>
  );
}

export default Cart;