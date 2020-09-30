import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col, FormGroup } from "react-bootstrap";
import { TextField, Container, Button, Typography, Divider } from "@material-ui/core";
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types'
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
    alignItemsAndJustifyContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    rowStyles : {
        padding : '5px'
    },
    submitStyle : {
        padding : '5px',
        paddingBottom : '30px'
    }
}));

function TripComponent({formdata, setFormdata, nextStep, prevStep }) {
    const classes = useStyles();

    const onSubmit = (values) => {
        setFormdata(values)
        nextStep()
    };  

    const validationSchema = yup.object({
        calc_date : yup
        .string().required('Required'),
        advance_amount : yup
        .string().matches(/^[0-9]*$/, "Must be in Digits").required('Required'),
        start_km : yup
        .string().matches(/^[0-9]*$/, "Must be in Digits").required('Required'),
        end_km : yup
        .string().matches(/^[0-9]*$/, "Must be in Digits").required('Required'),
        milege : yup
        .string().matches(/^[0-9]*\.?[0-9]*$/, "Must be in Digits").required('Required'),
    })

    const calculateTotalKm = (values, setFieldValue) => {
        let totalkm = Math.abs(parseInt(values.start_km) - parseInt(values.end_km))
        console.log(values)
        console.log(totalkm)
        if(!isNaN(totalkm))
            setFieldValue('total_km', String(totalkm))
    }
    return (
        <div>
            <Container maxWidth = "md" className = { classes.alignItemsAndJustifyContent }>
                <Formik 
                    initialValues = { formdata }
                    validationSchema = { validationSchema }
                    onSubmit = { onSubmit }
                >
                {(formik) => {
                    return (
                        <Form>
                            <Row className = { classes.rowStyles }>
                                <Col md>
                                    <TextFieldComponent 
                                        name = "calc_date"
                                        label = "Today's date"
                                        type = 'date'
                                        InputLabelProps={{
                                            shrink : true,
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className = { classes.rowStyles }>
                                <Col md>
                                    <TextFieldComponent 
                                        name = "advance_amount"
                                        label = "Advance Amount"
                                        type = 'number'
                                    />
                                </Col>
                            </Row>
                            <Divider />
                            <Row className = { classes.rowStyles }>
                                <Col md>
                                    <Typography color="primary" variant = "h6">
                                        Travelled km
                                    </Typography>
                                </Col>
                            </Row>

                            <Row className = { classes.rowStyles }>
                                <Col md>
                                    <TextFieldComponent 
                                        name = "start_km"
                                        label = "Start KM"
                                        type = 'number'
                                        onBlur = {() => calculateTotalKm(formik.values, formik.setFieldValue)}
                                    />
                                </Col>
                            </Row>

                            <Row className = { classes.rowStyles }>
                                <Col md>
                                    <TextFieldComponent 
                                        name = "end_km"
                                        label = "End KM"
                                        type = 'number'
                                        onBlur = {() => calculateTotalKm(formik.values, formik.setFieldValue)}
                                    />
                                </Col>
                            </Row>
                            
                            <Row className = { classes.rowStyles }>
                                <Col md>
                                    <Typography color = "secondary">
                                        Total km : { formik.values.total_km }
                                    </Typography>
                                </Col>
                            </Row>

                            <Row className = { classes.rowStyles }>
                                <Col md>
                                    <TextFieldComponent 
                                        name = "milege"
                                        label = "Mileage"
                                        type = 'number'
                                    />
                                </Col>
                            </Row>

                            <Row className = { classes.submitStyle }>
                                <Col md >
                                    <Button
                                        style={{ margin: "4px", }}
                                        variant="contained"
                                        color="primary"
                                        onClick = {() => prevStep() }
                                    >
                                        <ArrowBackIcon />Vehicle
                                    </Button>
                                    <Button
                                        style={{ margin: "4px", }}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Load
                                        <ArrowForwardOutlinedIcon />
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

export default TripComponent

TripComponent.propTypes = {
    formdata : PropTypes.object.isRequired,
    setFormdata : PropTypes.func.isRequired,
    nextStep : PropTypes.func.isRequired,
    prevStep : PropTypes.func.isRequired,
}
