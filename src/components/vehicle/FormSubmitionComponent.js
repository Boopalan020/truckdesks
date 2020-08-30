import React from 'react'
import { Container } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core/'
import { Card } from 'react-bootstrap'
import { useToasts } from 'react-toast-notifications'
import Axios from 'axios'
import { Typography } from '@material-ui/core'

const apiOrigin = "http://localhost:3001"
function FormSubmitionComponent({ formData, prevStep }) {
    const { addToast } = useToasts()
    const saveDataToServer = () => {
        Axios.post(`${apiOrigin}/vehicle/savevehicle`, formData)
      .then(response => {
          if(response)
          {
            console.log(response)
            if(response.data.flag === "exist")
                addToast( response.data.msg , { appearance : 'warning',autoDismiss: true })
            if(response.data.flag === "new") 
                addToast( response.data.msg , { appearance : 'success',autoDismiss: true })
          }
      })
      .catch(err => {
          console.log(err)
          addToast('Failed..! Try again later', { appearance : 'error',autoDismiss: true })
      })
    }
    const { 
        vehicle_no, 
        engine_no, 
        chasis_no, 
        vehicle_model, 
        total_due, 
        completed_due, 
        insurance,
        insurance_date,
        rto,
        fc,
        fc_date,
        quarter_tax,
        status } = formData
    return (
        <Container maxWidth="md" >

            <Card className="text-center">
                <Card.Header> <Typography variant="h5"> { vehicle_no } </Typography> </Card.Header>
                <Card.Body>
                    <Card.Text> Engine Number : { engine_no }</Card.Text>
                    <Card.Text> Chasis number : { chasis_no } </Card.Text>
                    <Card.Text> Vehicle model : { vehicle_model } </Card.Text>
                    <Card.Text> Total Due : { total_due } </Card.Text>
                    <Card.Text> Completed Due : { completed_due } </Card.Text>
                    <Card.Text> Insurance : { insurance } </Card.Text>
                    <Card.Text> Insurance Date : { insurance_date.getDate()+'/'+(insurance_date.getMonth()+1)+'/'+(insurance_date.getYear()+1900) } </Card.Text>
                    <Card.Text> RTO : { rto } </Card.Text>
                    <Card.Text> Fitness cert.Amount : { fc } </Card.Text>
                    <Card.Text> Fitness Verified Date : { fc_date.getDate()+'/'+(fc_date.getMonth()+1)+'/'+(fc_date.getYear()+1900) } </Card.Text>
                    <Card.Text> Quarter Tax : { quarter_tax } </Card.Text>
                    <Card.Text> Status : { status } </Card.Text>
                    <Button 
                        variant="primary" 
                        onClick={prevStep} 
                        style={{backgroundColor : 'white', color: 'black',border: '2px solid #008CBA'}} 
                    >Back</Button>
                    <Button 
                        variant="primary" 
                        onClick={saveDataToServer}
                        style={{ marginLeft :"3px" ,backgroundColor : 'white', color: 'black',border: '2px solid #4CAF50'}}
                    >Add Info</Button>
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
