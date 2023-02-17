import './App.css';
import AddTodo from './components/AddToDo';
import ToDo from './components/ToDo';
import { Container, Row, Col, Card } from 'react-bootstrap';

function App() {
  return (
    <div className="wrapper">
      <Container>
        <Row className='justify-content-center pt-5'>
          <Col>
            <Card className='p-5'>
              <h1>My ToDos</h1>
              <AddTodo />
              <ToDo />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
