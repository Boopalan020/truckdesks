import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Formik, Form, Field } from 'formik'
import { useToasts } from 'react-toast-notifications'
import { Row, Col, FormGroup } from "react-bootstrap"
import { Button, Typography, TextField, Container, IconButton } from "@material-ui/core";
import { connect } from 'react-redux'
import * as yup from "yup"

const useStyles = makeStyles((theme) => ({
    alignItemsAndJustifyContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }));

function VehicleInfo(props) {
    const classes = useStyles();
    const { addToast } = useToasts()

    // INITIAL VALUES
    const initialValues = {
        vehicle_no : "",
        chasis_no : "",
        engine_no : "",
        vehicle_model : "",
        total : null,
        completed : null
    }
    const validationSchema = yup.object({
        
      });
    // ONSUBMITTING FORM
    const onSubmit = values => {
        
    }
    return (
        <div>
            <Container maxWidth="md" className={classes.alignItemsAndJustifyContent} >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form noValidate>
                        
                        <Row style={{padding:"5px"}}>
                            <Col md>
                                <Field name="vehicle_no" >
                                    {(props) => {
                                        const {field, meta} = props
                                        return(
                                        <FormGroup>
                                            <TextField name = "vehicle_no" size="small" label="Vehicle Number" variant="outlined" {...field}  />
                                            {
                                                meta.touched && meta.error ? <div style={{color:"red", padding:"2px"}}>{meta.error}</div> : null
                                            }
                                        </FormGroup>
                                        )
                                    }}
                                </Field>
                            </Col>
                        </Row>

                        <Row style={{padding:"5px"}}>
                            <Col md>
                                <Field name="chasis_no" >
                                    {(props) => {
                                        const {field, meta} = props
                                        return(
                                        <FormGroup>
                                            <TextField name = "chasis_no" size="small" label="Chasis Number" variant="outlined" {...field}  />
                                            {
                                                meta.touched && meta.error ? <div style={{color:"red", padding:"2px"}}>{meta.error}</div> : null
                                            }
                                        </FormGroup>
                                        )
                                    }}
                                </Field>
                            </Col>
                        </Row>

                        <Row style={{padding:"5px"}}>
                            <Col md>
                                <Field name="engine_no" >
                                    {(props) => {
                                        const {field, meta} = props
                                        return(
                                        <FormGroup>
                                            <TextField name = "engine_no" size="small" label="Engine Number" variant="outlined" {...field}  />
                                            {
                                                meta.touched && meta.error ? <div style={{color:"red", padding:"2px"}}>{meta.error}</div> : null
                                            }
                                        </FormGroup>
                                        )
                                    }}
                                </Field>
                            </Col>
                        </Row>

                        <Row style={{padding:"5px"}}>
                            <Col md>
                                <Field name="vehicle_model" >
                                    {(props) => {
                                        const {field, meta} = props
                                        return(
                                        <FormGroup>
                                            <TextField name = "vehicle_model" size="small" label="Vehicle Model" variant="outlined" {...field}  />
                                            {
                                                meta.touched && meta.error ? <div style={{color:"red", padding:"2px"}}>{meta.error}</div> : null
                                            }
                                        </FormGroup>
                                        )
                                    }}
                                </Field>
                            </Col>
                        </Row>

                        <Row style={{padding:"5px"}}>
                            <Col md>
                                Due Details
                                <Field name="total" >
                                    {(props) => {
                                        const {field, meta} = props
                                        return(
                                        <FormGroup>
                                            <TextField name = "total" size="small" label="Total Due" variant="outlined" {...field}  />
                                            {
                                                meta.touched && meta.error ? <div style={{color:"red", padding:"2px"}}>{meta.error}</div> : null
                                            }
                                        </FormGroup>
                                        )
                                    }}
                                </Field>
                            </Col>
                        </Row>

                        <Row style={{padding:"5px"}}>
                            <Col md>
                                <Field name="completed" >
                                    {(props) => {
                                        const {field, meta} = props
                                        return(
                                        <FormGroup>
                                            <TextField name = "completed" size="small" label="Complted Due" variant="outlined" {...field}  />
                                            {
                                                meta.touched && meta.error ? <div style={{color:"red", padding:"2px"}}>{meta.error}</div> : null
                                            }
                                        </FormGroup>
                                        )
                                    }}
                                </Field>
                            </Col>
                        </Row>
                                                                

                    </Form>
                </Formik>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {};
  };
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInfo);
