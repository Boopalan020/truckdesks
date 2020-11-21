import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import YearPopComponent from './YearPopComponent'
// import DeleteIcon from '@material-ui/icons/Delete'
// import toast from 'toasted-notes' 
// import Alert from '@material-ui/lab/Alert'

// const apiOrigin  = "http://localhost:3001"
function MenuComponent(props) {

    // const deleteItem = (e, id) => {
    //     console.log(id)
    //     Axios.delete(`${apiOrigin}/dashboard/delete/${id}`)
    //     .then(dres => {
    //         if(dres)
    //         {
    //             toast.notify(
    //                 <Alert size="small" severity="success">
    //                     Deleted successfully
    //                 </Alert>,
    //                 {
    //                     position : "top",
    //                     duration : "4000"
    //                 }
    //             )
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         toast.notify(
    //             <Alert size="small" severity="error">
    //               Error !
    //             </Alert>,
    //             {
    //               position : "top",
    //               duration : "4000"
    //             }
    //           )
    //     })
    // }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            scroll={props.scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title"> Edit </DialogTitle>
            <DialogContent dividers={props.scroll === 'paper'}>

                {
                    props.divDecide
                    ? <div> 
                        <YearPopComponent id = { props.vid } />
                      </div>
                    : <div> 
                     {
                         props.dialogdata.map((data, index) => 
                            <Card key = { data._id } style = {{ margin : "5px" }} >
                                <Card.Header style = { data.status === 'Paid' ? { color : "green" }: { color : "red" }} > { data.year } </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col sm={6}>
                                            <b> National Permit </b>
                                        </Col>
                                        <Col sm={6}>
                                            { new Date(data.national_date).toLocaleDateString('ta') } - <span>&#8377;</span> { data.national_cost }
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <b> Insurance </b>
                                        </Col>
                                        <Col md={6}>
                                            { new Date(data.insurance_date).toLocaleDateString('ta') } - <span>&#8377;</span> { data.insurance }
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <b> FC </b>
                                        </Col>
                                        <Col md={6}>
                                            { new Date(data.fc_date).toLocaleDateString('ta') } - <span>&#8377;</span> { data.fc }
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <b> Quarter Tax </b>
                                        </Col>
                                        <Col md={6}>
                                            { new Date(data.quarter_tax_date).toLocaleDateString('ta') } - <span>&#8377;</span> { data.quarter_tax }
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <b> RTO </b>
                                        </Col>
                                        <Col md={6}>
                                        <span>&#8377;</span> { data.rto }
                                        </Col>
                                    </Row>

                                    {/* <Row>
                                        <Col md>
                                            <Button
                                                onClick = { e =>  deleteItem(e, data._id) }
                                            >
                                                <DeleteIcon size = "small" style = {{ color : "red" }} /> Delete
                                            </Button>
                                        </Col>
                                    </Row> */}

                                </Card.Body>
                            </Card>
                         )
                        //  <Card>
                        // <Card.Header>Featured</Card.Header>
                        // <Card.Body>
                        //     <Card.Title>Special title treatment</Card.Title>
                        //     <Card.Text>
                        //     With supporting text below as a natural lead-in to additional content.
                        //     </Card.Text>
                        //     <Button variant="primary">Go somewhere</Button>
                        // </Card.Body>
                        // </Card>
                     } </div>
                }
            </DialogContent>
            <DialogActions>
                <Button 
                    color = "primary"
                    onClick = { props.handleClose }
                > cancel </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MenuComponent
