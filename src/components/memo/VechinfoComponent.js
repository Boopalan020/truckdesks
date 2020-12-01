import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col, FormGroup } from "react-bootstrap";
import { TextField, Container, Button } from "@material-ui/core";
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import PropTypes from 'prop-types'
import * as yup from "yup";
import Axios from 'axios';

const apiOrigin = "https://truckdesks.herokuapp.com"
// const apiOrigin  = "http://localhost:3001"
const useStyles = makeStyles((theme) => ({
    alignItemsAndJustifyContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    rowStyles : {
        padding : '5px'
    },
  }));

function VechinfoComponent({ formdata, setFormdata, nextStep }) {
    const classes = useStyles();
    const [vech_no, setVech_no] = useState([])
    const [dr_name, setDr_name] = useState([])
    useEffect(() => {
        function FetchVehicleNumber() {
            Axios.get(`${apiOrigin}/vehicle/fetchnumbers`)
            .then(res => {
                setVech_no(res.data.v_no)
                setDr_name(res.data.d_name)
            })
            .catch(err => {
                console.log(err)
            })
        }
        FetchVehicleNumber()
    }, [])

    const onSubmit = (values) => {
        setFormdata(values)
        // console.log(values)
        nextStep()
    };

    const validationSchema = yup.object({
        vehicle_no : yup
        .string().required("Required"),
        from : yup
        .string().required('Required'),
        to : yup
        .string().required('Required'),
        driver_name : yup
        .string().required('Required'),
        cleaner_name : yup
        .string().required(' Use \'-\' If not exist ')
    })
    return (
        <div>
            <Container maxWidth="md" className={ classes.alignItemsAndJustifyContent }>
                <Formik
                    initialValues = { formdata }
                    validationSchema = { validationSchema }
                    onSubmit = { onSubmit }
                >
                {(formik) => {
                    return(
                    <Form>
                        <Row className = { classes.rowStyles }>
                            <Col md>
                            <Field name = "vehicle_no">
                            {
                                (fieldprops) => {
                                    const { field, meta } = fieldprops
                                    return (
                                        <FormGroup>
                                            <TextField 
                                                {...field}
                                                name = "vehicle_no"
                                                type = "text"
                                                select
                                                size = 'small'
                                                label = "Vehicel Number"
                                                variant = "outlined"
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                error = { Boolean(meta.touched && meta.error) }
                                                helperText = { <ErrorMessage name = "vehicle_no" /> }
                                            >
                                                <option value = ""> </option>
                                               {
                                                    vech_no.map(numb => {
                                                        return(
                                                            <option key={ numb.vehicle_no } value={ numb.vehicle_no }>
                                                            { numb.vehicle_no }
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </TextField>
                                        </FormGroup>
                                    )
                                }
                            }
                            </Field>
                            </Col>
                        </Row>

                        <Row className = { classes.rowStyles }>
                            <Col md = {5}>
                                <TextFieldComponent 
                                    name = "from"
                                    label = "From"
                                    type = "date"
                                    InputLabelProps={{
                                        shrink : true,
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className = { classes.rowStyles }>
                            <Col md = {5}>
                                <TextFieldComponent 
                                    name = "to"
                                    label = "To"
                                    type = "date"
                                    InputLabelProps={{
                                        shrink : true,
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className = { classes.rowStyles } >
                            <Col md>
                            <Field name = "driver_name">
                            {
                                (fieldprops) => {
                                    const { field, meta } = fieldprops
                                    return (
                                        <FormGroup>
                                            <TextField 
                                                {...field}
                                                name = "driver_name"
                                                type = "text"
                                                select
                                                size = 'small'
                                                label = "Driver Name"
                                                variant = "outlined"
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                error = { Boolean(meta.touched && meta.error) }
                                                helperText = { <ErrorMessage name = "driver_name" /> }
                                            >
                                                <option value = ""> </option>
                                               {
                                                    dr_name.map(dname => {
                                                        return(
                                                            <option key={ dname.drivername } value={ dname.drivername }>
                                                            { dname.drivername }
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </TextField>
                                        </FormGroup>
                                    )
                                }
                            }
                            </Field>
                            </Col>
                        </Row>

                        <Row className = { classes.rowStyles } >
                            <Col md>
                                <TextFieldComponent
                                    name = 'cleaner_name'
                                    label = "Cleaner Name"
                                    type = "text"
                                />
                            </Col>
                        </Row>
                        
                        <Row className = { classes.rowStyle }>
                            <Col md style={{textAlign:"right"}} >
                                <Button
                                    style={{ margin: "4px", }}
                                    type="submit"
                                >
                                    Trip Details
                                    <ArrowForwardOutlinedIcon style={{margin:"5px"}}/>
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                    )
                }}
                </Formik>
            </Container>
        </div>
    )
}

function TextFieldComponent (props) {
    const { label, name, type, ...rest } = props
    return (
        <Field name = {name} {...rest}>
        {
            (fieldprops) => {
                const { field ,meta } = fieldprops
                return (
                    <FormGroup>
                        <TextField 
                            name = { name }
                            type = { type }
                            size = 'small'
                            label = { label }
                            variant = "outlined"
                            {...field}
                            {...rest}
                            error = { Boolean(meta.touched && meta.error) }
                            helperText = { <ErrorMessage name = { name } /> }
                        />
                    </FormGroup>
                )
            }
        }
        </Field>
    )
}

export default VechinfoComponent

VechinfoComponent.propTypes = {
    formdata : PropTypes.object.isRequired,
    setFormdata : PropTypes.func.isRequired,
    nextStep : PropTypes.func.isRequired
}
