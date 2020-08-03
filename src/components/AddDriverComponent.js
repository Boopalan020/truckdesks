import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Row, Col, FormGroup } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, TextField } from "@material-ui/core";
import Axios from "axios";

const apiOrigin  = "http://localhost:3001";
const useStyles = makeStyles((theme) => ({
    alignItemsAndJustifyContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }));

function AddDriverComponent(props) {
  const classes = useStyles();
  // INITIAL VALUES OF THE FORM
  const initialValues = {
    drivername: "",
    license: "",
    address: "",
    phone: "",
  };
  //FORM VALIDATION USING YUP PACKAGE
  const validationSchema = yup.object({
    drivername: yup
      .string()
      .required("Required")
      .min(7, "Atleast 7 character length"),
    license: yup.string().required("Required"),
    address: yup.string().required("Required"),
    phone: yup
      .string()
      .matches(/^\d{10}$/i, "10 - Digit Number")
      .required("Required"),
  });
  const onSubmit = values => {
      Axios.post(`${apiOrigin}/drivers/adddriver`, values)
      .then(response => {
          console.log(response)
      })
  }
  return (
      <div className={classes.alignItemsAndJustifyContent} >
            <Formik 
                initialValues = {initialValues}
                validationSchema = {validationSchema}
                onSubmit = {onSubmit}>
                <Form noValidate>
                    <Row style={{padding:"5px"}}>
                        <Col align='center' style={{padding:"10px"}} >
                            <Typography variant="h5" >
                            Add Driver
                            </Typography>
                        </Col>
                    </Row>
                    <Row style={{padding:"10px"}}>
                        <Col sm>
                            <Field name="drivername" >
                                {(props) => {
                                    const {field, meta} = props
                                    return(
                                    <FormGroup>
                                        <TextField name = "drivername" size="small" label="Driver Name" variant="outlined" {...field}  />
                                        {
                                            meta.touched && meta.error ? <div style={{color:"red", padding:"2px"}}>{meta.error}</div> : null
                                        }
                                    </FormGroup>
                                    )
                                }}
                            </Field>
                        </Col>
                    </Row>
                    <Row style={{padding:"10px"}}>
                        <Col sm >
                            <Field name="license">
                            {
                                (props) => {
                                    const { field, meta} = props
                                    return ( 
                                    <FormGroup>
                                        <TextField name="license" size="small" label="License.no" variant="outlined" {...field} />
                                        {
                                            meta.touched && meta.error ? <div style={{color:"red", padding:"2px"}}>{meta.error}</div> : null
                                        }
                                    </FormGroup>)
                                }
                            }                                
                            </Field>
                        </Col>
                    </Row>
                    <Row style={{padding:"10px"}}>
                        <Col sm >
                            <FormGroup>
                                <Field name="address">
                                {(props) => {
                                    const { field, meta} = props
                                    return ( 
                                    <FormGroup>
                                        <TextField name="address" size="small" label="Address" variant="outlined" {...field} />
                                        {
                                            meta.touched && meta.error ? <div style={{color:"red", padding:"2px"}}>{meta.error}</div> : null
                                        }
                                    </FormGroup>)
                                }}
                                </Field>    
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row style={{padding:"10px"}}>
                        <Col sm >
                            <Field name="phone">
                            {
                                (props)=>{
                                    const {field, meta} = props
                                    return (
                                    <FormGroup>
                                        <TextField name="phone" size="small" label="Phone.no" variant="outlined" {...field} />
                                        {
                                            meta.touched && meta.error ? <div style={{color:"red", padding:"2px"}}>{meta.error}</div> : null
                                        }
                                    </FormGroup>
                                    )
                                }
                            }
                            </Field>
                        </Col>
                    </Row>
                    <Row style={{padding:"10px"}}>
                        <Col >
                            <Button type="submit" variant="outlined" color="primary">
                                <span align='center' style={{ padding:"2px" }}>Add</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </div>
  );
}

export default AddDriverComponent;
