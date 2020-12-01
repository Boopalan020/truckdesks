import React from 'react'
import { Container } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core/'
import { Card, Col, Row } from 'react-bootstrap'
import Axios from 'axios'
import { Typography } from '@material-ui/core'
import toast from 'toasted-notes' 
import Alert from '@material-ui/lab/Alert'

// const apiOrigin = "https://truckdesks.herokuapp.com"
const apiOrigin = "http://localhost:3001"
function FormSubmitionComponent({ formData, setFormData, prevStep, firstStep }) {
    const saveDataToServer = () => {
        Axios.post(`${apiOrigin}/vehicle/savevehicle`, formData)
      .then(response => {
          if(response)
          {
            // console.log(response)
            if(response.data.flag === "exist")
            {
                toast.notify(
                    <Alert size="small" severity="warning">
                      {response.data.msg }
                    </Alert>,
                    {
                      position : "top",
                      duration : "4000"
                    }
                  )
            }
            if(response.data.flag === "new")
            {
                toast.notify(
                    <Alert size="small" severity="success">
                      {response.data.msg }
                    </Alert>,
                    {
                      position : "top",
                      duration : "4000"
                    }
                  )
            }
            setFormData({
                vehicle_no : '',reg_date : '',engine_no : '',chasis_no:'',vehicle_model : '',total_due_amount: '',due_interest : '',
                total_months : '',completed_month: '',national_date : '',national_cost : '',insurance : '',insurance_date : '',
                fc : '',fc_date : '',quarter_tax_date : '',quarter_tax : '',rto : '',status : ''
            })
            firstStep();
          }
      })
      .catch(err => {
          // console.log(err)
          toast.notify(
            <Alert size="small" severity="info">
              Try again later
            </Alert>,
            {
              position : "top",
              duration : "4000"
            }
          )
      })
    }
    const { 
        vehicle_no, engine_no, chasis_no, reg_date,vehicle_model, total_due_amount, due_interest,total_months,completed_month,
        national_date,national_cost,insurance,insurance_date,rto,fc,fc_date,quarter_tax_date,quarter_tax,status 
    } = formData
    return (
        <Container maxWidth="md" >
            <Card>
                <Card.Header> <Typography variant="h5"> { vehicle_no } </Typography> </Card.Header>
                <Card.Body>

                    <Row>
                        <Col md = {6} style= {{padding : "5px"}}>
                            <Card.Text> Vehicle Registration Date : { reg_date } </Card.Text>
                            <Card.Text> Engine Number : { engine_no }</Card.Text>
                            <Card.Text> Chasis number : { chasis_no } </Card.Text>
                            <Card.Text> Vehicle model : { vehicle_model } </Card.Text>
                            <Card.Text> Total Due : { total_due_amount } </Card.Text>
                            <Card.Text> Due Interest : { due_interest } </Card.Text>
                            <Card.Text> Due Duration : { total_months } </Card.Text>
                            <Card.Text> Completed month : { completed_month } </Card.Text>
                        </Col>
                        <Col md = {6} style= {{padding : "5px"}}>
                            <Card.Text> National Permit Date : { national_date } </Card.Text>
                            <Card.Text> National Permit Amount : { national_cost } </Card.Text>
                            <Card.Text> Insurance Date : { insurance_date } </Card.Text>
                            <Card.Text> Insurance : { insurance } </Card.Text>
                            <Card.Text> Fitness verified Date : { fc_date } </Card.Text>
                            <Card.Text> Fitness cert.Amount : { fc } </Card.Text>
                            <Card.Text> Quarter Tax Date : { quarter_tax_date } </Card.Text>
                            <Card.Text> Quarter Tax : { quarter_tax } </Card.Text>
                            <Card.Text> RTO : { rto } </Card.Text>
                            <Card.Text> Status : { status } </Card.Text>
                        </Col>
                    </Row>
                    
                    <Row className = "text-center" style={{padding : "15px"}}>
                        <Col md = {12}>
                            <Button 
                                variant="contained"
                                onClick={prevStep} 
                                style={{backgroundColor : 'white', color: 'black',border: '2px solid #008CBA'}} 
                            >Back</Button>
                            <Button 
                                variant="contained"
                                onClick={saveDataToServer}
                                style={{ marginLeft :"3px" ,backgroundColor : 'white', color: 'black',border: '2px solid #4CAF50'}}
                            >Add Info</Button>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="text-muted"> Check details once again and confirm </Card.Footer>
            </Card>
        </Container>
    )
}

export default FormSubmitionComponent

FormSubmitionComponent.propTypes = {
    formData: PropTypes.object.isRequired,
    prevStep: PropTypes.func.isRequired,
  };
