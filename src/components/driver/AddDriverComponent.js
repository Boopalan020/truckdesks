import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col, FormGroup } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, TextField, Container, IconButton, MenuItem } from "@material-ui/core";
import * as yup from "yup";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Axios from "axios";
import toast from 'toasted-notes' 
import Alert from '@material-ui/lab/Alert'

import { changeDriverState } from '../../redux/index'
import { connect } from 'react-redux'

const apiOrigin  = "http://localhost:3001";
const useStyles = makeStyles((theme) => ({
    alignItemsAndJustifyContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    selectControlWidth : {
        // margin: theme.spacing(1),
        minWidth: 245,
    }
  }));

function AddDriverComponent(props) {
  const classes = useStyles();
  // INITIAL VALUES OF THE FORM
  const initialValues = {
    drivername: "",
    license: "",
    blood : "",
    age : "",
    address: "",
    phone: "",
    insure_no : "-"
  };
  //FORM VALIDATION USING YUP PACKAGE
  const validationSchema = yup.object({
    drivername: yup
      .string()
      .required("Required")
      .min(7, "Atleast 7 character length"),
    license: yup.string().required("Required"),
    age : yup.string().matches(/^\d{2}$/i, "Invalid Format").required("Required"),
    address: yup.string().required("Required"),
    phone: yup
      .string()
      .matches(/^\d{10}$/i, "10 - Digit Number")
      .required("Required"),
  });
  const onSubmit = (values, onSubmitProps) => {
      console.log(values)
      Axios.post(`${apiOrigin}/drivers/adddriver`, values)
      .then(response => {
          if(response)
          {
            console.log(response)
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
            onSubmitProps.resetForm()
          }
      })
      .catch(err => {
          console.log(err)
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
  return (
      <Container maxWidth="sm" className={classes.alignItemsAndJustifyContent} >
            <Formik 
                initialValues = {initialValues}
                validationSchema = {validationSchema}
                onSubmit = {onSubmit}>
                <Form noValidate>
                    <Row style={{padding:"5px"}}>
                        <Col align='center' style={{padding:"10px"}} >
                            <Typography variant="h5" >
                            <IconButton onClick={props.changeDriverState} variant="outlined" color="primary">
                                <ArrowBackOutlinedIcon />
                            </IconButton>Add Driver
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
                                        <TextField 
                                            name = "drivername" 
                                            size="small" 
                                            label="Driver Name" 
                                            variant="outlined" {...field} 
                                            error = {Boolean(meta.touched && meta.error)} 
                                            helperText ={<ErrorMessage name = "drivername"></ErrorMessage>} 
                                        />
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
                                        <TextField 
                                            name="license" 
                                            size="small" 
                                            label="License.no" 
                                            variant="outlined" {...field} 
                                            error = {Boolean(meta.touched && meta.error)} 
                                            helperText ={<ErrorMessage name = "license"></ErrorMessage>} 
                                        />
                                    </FormGroup>)
                                }
                            }                                
                            </Field>
                        </Col>
                    </Row>
                    <Row style={{padding:"10px"}}>
                        <Col sm >
                            <Field name = "blood" >
                                {
                                    (props) => {
                                        const { field } = props
                                        return (
                                            <FormGroup >
                                                <TextField 
                                                    className = {classes.selectControlWidth}
                                                    select
                                                    name = "blood"
                                                    label = "Blood Group"
                                                    variant = "outlined"
                                                    size = "small"
                                                    {...field}
                                                >
                                                    <MenuItem value = "-">None</MenuItem>
                                                    <MenuItem value = "A+">A+</MenuItem>
                                                    <MenuItem value = "A-">A-</MenuItem>
                                                    <MenuItem value="B+">B+</MenuItem>
                                                    <MenuItem value="B-">B-</MenuItem>
                                                    <MenuItem value="O+">O+</MenuItem>
                                                    <MenuItem value="O-">O-</MenuItem>
                                                    <MenuItem value="AB+">AB+</MenuItem>
                                                    <MenuItem value="AB-">AB-</MenuItem>
                                                </TextField>
                                            </FormGroup>
                                        )
                                    }
                                }
                            </Field>
                        </Col>
                    </Row>

                    <Row style={{padding:"10px"}}>
                        <Col sm >
                            <Field name = "age">
                                {
                                    (props) => {
                                        const {field, meta} = props
                                        return (
                                            <FormGroup>
                                                <TextField 
                                                    type = "number" 
                                                    label = "Age"
                                                    variant = "outlined" 
                                                    name = "age"
                                                    size = "small" {...field}
                                                    error = {Boolean(meta.touched && meta.error)} 
                                                    helperText ={<ErrorMessage name = "age"></ErrorMessage>} 
                                                />
                                            </FormGroup>
                                        )
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
                                        <TextField 
                                            name="address" 
                                            size="small" 
                                            label="Address" 
                                            variant="outlined" {...field} 
                                            error = {Boolean(meta.touched && meta.error)} 
                                            helperText ={<ErrorMessage name = "address"></ErrorMessage>} 
                                        />
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
                                        <TextField 
                                            name="phone" 
                                            size="small" 
                                            label="Phone.no" 
                                            variant="outlined" {...field} 
                                            error = {Boolean(meta.touched && meta.error)} 
                                            helperText ={<ErrorMessage name = "phone"></ErrorMessage>} 
                                        />
                                    </FormGroup>
                                    )
                                }
                            }
                            </Field>
                        </Col>
                    </Row>

                    <Row style = {{padding : "10px"}}>
                            <Col sm>
                                <Field name = "insure_no">
                                {
                                    (props) => {
                                        const { field, meta } = props
                                        return (
                                            <FormGroup>
                                                <TextField 
                                                    label = "Driver Insurance"
                                                    variant = "outlined" 
                                                    name = "insure_no"
                                                    size = "small" {...field}
                                                    error = {Boolean(meta.touched && meta.error)} 
                                                    helperText ={<ErrorMessage name = "insure_no" />} 
                                                />
                                            </FormGroup>
                                        )
                                    }
                                }
                                </Field>
                            </Col>
                    </Row>

                    <Row style={{padding:"10px"}}>
                        <Col >
                            <Button type="submit" startIcon={ <AddCircleIcon /> } variant="outlined" color="primary">
                                <span align='center' style={{ padding:"2px" }}>Add</span>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </Container>
  );
}
const mapStateToProps = (state) => {
    return {};
  };
const mapDispatchToProps = (dispatch) => {
    return {
        changeDriverState : () => dispatch(changeDriverState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDriverComponent);
