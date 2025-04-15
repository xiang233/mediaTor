import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
function FormContainer(props) {
  return (
    <Container>
    <Row className= "justify-content-md-center">
        <Col>
        {props.children}
        </Col>
    </Row>
    </Container>
  )
}

export default FormContainer