import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Row, Col, FormGroup } from "react-bootstrap";
import { TextField, Container, Button, Typography, Divider } from "@material-ui/core";
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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
const EmptyDiesel = {
    filled_date : '',
    litre : '',
    rate : '',
    rate_on_day : '',
    place : ''
}
function DieselComponent({formdata, setFormdata, nextStep, prevStep}) {
    const classes = useStyles();

    const onSubmit = (values) => {
        setFormdata(values)
        console.log(values)
        nextStep()
    }; 
    const validationSchema = yup.object({
        diesel : yup
        .array().of(
            yup.object().shape({
                filled_date : yup.string().required('Required'),
                litre : yup.string().matches(/^[0-9]*$/, "Enter in Litres").required('Required'),
                rate : yup.string().matches(/^[0-9]*$/, "Enter Amount in number").required('Required'),
                rate_on_day : yup.string().matches(/^[0-9]*\.?[0-9]*$/, "Enter Amount in number").required('Required'),
                place : yup.string().required('Required')
            })
        )
    })
    const totalLitres = (ev, handleBlur, values, setFieldValue) => {
        handleBlur(ev)
        let fullLitres = 0
        for (let i = 0; i < values.diesel.length; i++) {
            fullLitres += parseInt(values.diesel[i].litre)
        }
        console.log(fullLitres)
        if(!isNaN(fullLitres))
            setFieldValue('total_diesel_litre', String(fullLitres))
    }
    const totalAmount = (ev, handleBlur, values, setFieldValue) => {
        handleBlur(ev)
        let fullAmount = 0
        for (let i = 0; i < values.diesel.length; i++) {
            fullAmount += parseInt(values.diesel[i].rate)
        }
        console.log(fullAmount)
        if(!isNaN(fullAmount))
            setFieldValue('total_diesel_amount', String(fullAmount))
    }
    const OnRemoveArray = ( values, setFieldValue) => {
        let fullLitres = 0
        let fullAmount = 0
        for (let i = 0; i < values.diesel.length-1; i++) {
            fullLitres += parseInt(values.diesel[i].litre)
            fullAmount += parseInt(values.diesel[i].rate)
        }
        if(!isNaN(fullAmount) && !isNaN(fullLitres) )
        {
            setFieldValue('total_diesel_amount', String(fullAmount))
            setFieldValue('total_diesel_litre', String(fullLitres))
        }
    }
    return (
        <div>
            <Container maxWidth="md" className = { classes.alignItemsAndJustifyContent }>
                <Formik 
                    initialValues = { formdata }
                    validationSchema = { validationSchema }
                    onSubmit = { onSubmit }
                >
                {(formik) => {
                    return (
                        <Form>
                            <FieldArray name='diesel'>
                            {
                                (fieldArrayprops) => {
                                    const { form, remove, push } = fieldArrayprops
                                    const { values } = form
                                    const { diesel } = values
                                    return (
                                    <div>
                                        {
                                            diesel.map((dieselObj, index) => (
                                                <div key = { index }>
                                                    <Typography className = { classes.rowStyles } color="primary" variant = "h6">
                                                        PLACE : { index+1 }
                                                    </Typography>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `diesel[${index}].filled_date` }
                                                                type = 'date'
                                                                label = "Filled Date"
                                                                InputLabelProps={{
                                                                    shrink : true,
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `diesel[${index}].litre` }
                                                                type = 'number'
                                                                label = "Litres Filled"
                                                                onBlur = {(ev) => totalLitres(ev, formik.handleBlur, form.values, form.setFieldValue)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `diesel[${index}].rate` }
                                                                type = 'number'
                                                                label = "Amount"
                                                                onBlur = {(ev) => totalAmount(ev, formik.handleBlur, form.values, form.setFieldValue)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `diesel[${index}].rate_on_day` }
                                                                type = 'number'
                                                                label = "Rate per day"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `diesel[${index}].place` }
                                                                type = 'text'
                                                                label = "Filled Place"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Divider variant="middle" />
                                                </div>
                                            ))
                                        }
                                        <Row className = { classes.rowStyles }>
                                            <Col md= {7}>
                                                <Typography color = "secondary">
                                                    Diesel Litres 
                                                </Typography>
                                            </Col>
                                            <Col md = {5}>
                                                <Typography color = "secondary">
                                                    : Rs. { formik.values.total_diesel_litre }
                                                </Typography>
                                            </Col>
                                        </Row>
                                        <Row className = { classes.rowStyles }>
                                            <Col md = {7}>
                                                <Typography style={{color : "#16a085"}}>
                                                    Total Amount
                                                </Typography>
                                            </Col>
                                            <Col md = {5}>
                                                <Typography style={{color : "#16a085"}}>
                                                    : Rs. { formik.values.total_diesel_amount }
                                                </Typography>
                                            </Col>
                                        </Row>
                                        <div>
                                            <Button
                                                onClick={() => push(EmptyDiesel)}
                                            >
                                                Add Diesel
                                                <AddCircleIcon color="primary" style={{margin:'3px'}} />
                                            </Button>
                                            {
                                                form.values.diesel.length !== 1 ?
                                                
                                                <Button
                                                    onClick={() => { 
                                                        remove(form.values.diesel.length-1)
                                                        OnRemoveArray( form.values, form.setFieldValue) 
                                                    }}
                                                >
                                                    Remove Diesel
                                                    <IndeterminateCheckBoxIcon color="primary" style={{margin:'3px'}} />
                                                </Button> : null
                                            }
                                        </div>
                                    </div>
                                    )
                                }
                            }
                            </FieldArray>
                            <Divider variant="middle" />
                            <Row className = { classes.submitStyle } >
                                <Col md style={{textAlign:"center"}}>
                                    <Button
                                        style={{ margin: "4px", }}
                                        onClick = {() => prevStep() }
                                    >
                                        <ArrowBackIcon fontSize="small" style={{margin:"5px"}} /><u>Load Info</u>
                                    </Button>
                                    <Button
                                        style={{ margin: "4px", }}
                                        type="submit"
                                    >
                                        <u>Others</u>
                                        <ArrowForwardOutlinedIcon fontSize = "small" style={{margin:"5px"}} />
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
export default DieselComponent
DieselComponent.propTypes = {
    formdata : PropTypes.object.isRequired,
    setFormdata : PropTypes.func.isRequired,
    nextStep : PropTypes.func.isRequired,
    prevStep : PropTypes.func.isRequired,
}