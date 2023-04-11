import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {PencilFill} from 'react-bootstrap-icons'
import Accordion from 'react-bootstrap/Accordion';
function Cart(props) {
    console.log(props.name)
  return (
    <div className='cartContainer'>
        <Card>
            <Card.Img variant="top" src="https://random.imagecdn.app/500/150" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    This is the best product
                </Card.Text>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Description</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
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