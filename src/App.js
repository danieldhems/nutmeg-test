import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'

class App extends Component {
  constants = {
    totalMonths: 36,
    interestRate: 0.0625,
  }
  state = {
    starting: 0,
    monthly: 0,
  }
  onChange(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  calc(){
    const { totalMonths, interestRate } = this.constants;
    const { starting, monthly } = this.state;
    let total=0;

    for(var i=0; i<totalMonths;i++){
      if(i===0) {
        total += parseInt(starting, 10);
        continue;
      }
      // Add monthly contribution to total
      total += parseInt(monthly, 10);
      // Apply interest rate to new total
      total += total/100*interestRate;
    }

    this.setState({
      total
    });
  }
  render() {
    const { totalMonths } = this.constants;
    const { starting, monthly, total } = this.state;
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="12">
              <h1>Fee charges</h1>
              <Jumbotron>
                <h2>Set your amounts</h2>
                <Row className="flex">
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Starting contribution</Form.Label>
                      <Form.Control type="text" name="starting" onChange={e => this.onChange(e)} />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Monthly contributions</Form.Label>
                      <Form.Control type="text" name="monthly" onChange={e => this.onChange(e)} />
                    </Form.Group>
                  </Col>
                </Row>
                {total > 0 && (
                  <p>
                    With a starting contribution of {starting} and a monthly contribution of {monthly} we will deduct a total of &pound;{total.toFixed(2)} in a timeframe of {totalMonths} months.</p>
                )}
                <Button onClick={() => this.calc()} variant="success">Calculate</Button>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
