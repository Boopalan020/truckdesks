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
const EmptyRTO = {
    place : '',
    amount : ''
}

function RtoComponent({formdata, setFormdata, nextStep, prevStep}) {
    const classes = useStyles();

    const onSubmit = (values) => {
        setFormdata(values)
        nextStep()
    }; 
    const validationSchema = yup.object({
        rto_details : yup.array().of(
            yup.object({
                place : yup.string().required('Required'),
                amount : yup.string().matches(/^[0-9]*$/, 'Enter in Numbers').required('Required')
            })
        )
    })
    const totalRTO = (ev, handleBlur, values, setFieldValue) => {
        handleBlur(ev)
        let fullRTO = 0
        for (let i = 0; i < values.rto_details.length; i++)
            fullRTO += parseInt(values.rto_details[i].amount);
        console.log(fullRTO)
        if(!isNaN(fullRTO))
            setFieldValue('total_rto', String(fullRTO))
    }
    const OnRemoveArray = (values, setFieldValue) => {
        let fullRTO = 0
        for (let i = 0; i < values.rto_details.length-1; i++)
            fullRTO += parseInt(values.rto_details[i].amount);
        console.log(fullRTO)
        if(!isNaN(fullRTO))
            setFieldValue('total_rto', String(fullRTO))
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
                    return(
                        <Form>
                            <FieldArray name = "rto_details">
                            {
                                (fieldArrayprops) => {
                                    const { form, push, remove } = fieldArrayprops
                                    const { values } = form
                                    const { rto_details } = values
                                    return(
                                    <div>
                                        {
                                            rto_details.map((rto, index) => (
                                                <div key = { index }>
                                                    <Typography className = { classes.rowStyles } color="primary" variant = "h6">
                                                        PLACE : { index+1 }
                                                    </Typography>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `rto_details[${index}].place` }
                                                                type = 'text'
                                                                label = "RTO Place Name"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `rto_details[${index}].amount` }
                                                                type = 'number'
                                                                label = "Amount"
                                                                onBlur = {(ev) => totalRTO(ev, formik.handleBlur, form.values, form.setFieldValue)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))
                                        }
                                        <div>
                                            <Button
                                                onClick={() => push(EmptyRTO)}
                                            >
                                                Add RTO
                                                <AddCircleIcon color="primary" style={{margin:'3px'}} />
                                            </Button>
                                            {
                                                form.values.rto_details.length !== 1 ?
                                                
                                                <Button
                                                    onClick={() => { 
                                                        remove(form.values.rto_details.length-1)
                                                        OnRemoveArray( form.values, form.setFieldValue) 
                                                    }}
                                                >
                                                    Remove RTO
                                                    <IndeterminateCheckBoxIcon color="primary" style={{margin:'3px'}} />
                                                </Button> : null
                                            }
                                        </div>
                                    </div>
                                    )
                                }
                            }
                            </FieldArray>
                            <Divider />
                            <Row className = { classes.rowStyles }>
                                <Col md = {7}>
                                    <Typography color="secondary">
                                        Total RTO
                                    </Typography>
                                </Col>
                                <Col md = {5}>
                                    <Typography color="secondary">
                                        : Rs. { formik.values.total_rto }
                                    </Typography>
                                </Col>
                            </Row>
                            <Divider />
                            <Row className = { classes.submitStyle } >
                                <Col md style={{textAlign:"center"}}>
                                    <Button
                                        style={{ margin: "4px", }}
                                        onClick = {() => prevStep() }
                                    >
                                        <ArrowBackIcon fontSize="small" style={{margin:"5px"}} /><u>Others</u>
                                    </Button>
                                    <Button
                                        style={{ margin: "4px", }}
                                        type="submit"
                                    >
                                        <u>Overall</u>
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
export default RtoComponent
RtoComponent.propTypes = {
    formdata : PropTypes.object.isRequired,
    setFormdata : PropTypes.func.isRequired,
    nextStep : PropTypes.func.isRequired,
    prevStep : PropTypes.func.isRequired,
}

