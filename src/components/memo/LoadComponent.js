import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Row, Col, FormGroup } from "react-bootstrap";
import { TextField, Container, Button, Typography, Divider, InputAdornment } from "@material-ui/core";
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

const EmptyLoad = {
    date : '',
    origin : '',
    end_point : '',
    type : '',
    weight : '',
    rent : '',
    loading_cost : '',
    unloading_cost : '',
    commission : ''
}

function LoadComponent({formdata, setFormdata, nextStep, prevStep}) {
    const classes = useStyles();

    const onSubmit = (values) => {
        setFormdata(values)
        nextStep()
    }; 

    const validationSchema = yup.object({
       Loads : yup
       .array().of(
           yup.object().shape({
                date : yup.string().required('Required'),
                origin : yup.string().required('Required'),
                end_point : yup.string().required('Required'),
                type : yup.string().required('Required'),
                weight : yup.string().matches(/^[0-9]*.[0-9]*$/, 'Enter Weight').required('Required (weight in Tons)'),
                rent : yup.string().matches(/^[0-9]*$/, 'Enter Amount').required('Required'),
                loading_cost : yup.string().matches(/^[0-9]*$/, 'Enter Amount').required('Required'),
                unloading_cost : yup.string().matches(/^[0-9]*$/, 'Enter Amount').required('Required'),
                commission : yup.string().matches(/^[0-9]*$/, 'Enter Amount').required('Required'),
           })
       )
    })
    const totalRent = (ev, handleBlur, values, setFieldValue) => {
        handleBlur(ev)
        let fullRent = 0
        for (let i = 0; i < values.Loads.length; i++) {
            fullRent += parseInt(values.Loads[i].rent)
        }
        console.log(fullRent)
        if(!isNaN(fullRent))
            setFieldValue('total_rent', String(fullRent))
    }
    const totalLoadingCost = (ev, handleBlur, values, setFieldValue) => {
        handleBlur(ev)
        let fullLoadingRent = 0
        for (let i = 0; i < values.Loads.length; i++) {
            fullLoadingRent += parseInt(values.Loads[i].loading_cost)
        }
        console.log(fullLoadingRent)
        if(!isNaN(fullLoadingRent))
            setFieldValue('total_loading', String(fullLoadingRent))
    }
    const totalUnloadingCost = (ev, handleBlur, values, setFieldValue) => {
        handleBlur(ev)

        let fullunLoadingRent = 0
        for (let i = 0; i < values.Loads.length; i++) {
            fullunLoadingRent += parseInt(values.Loads[i].unloading_cost)
        }
        console.log(fullunLoadingRent)
        if(!isNaN(fullunLoadingRent))
            setFieldValue('total_unloading', String(fullunLoadingRent))
    }
    const totalCommission = (ev, handleBlur, values, setFieldValue) => {
        handleBlur(ev)
        let fullCommission = 0
        for (let i = 0; i < values.Loads.length; i++) {
            fullCommission += parseInt(values.Loads[i].commission)
        }
        console.log(fullCommission)
        if(!isNaN(fullCommission))
            setFieldValue('total_commission', String(fullCommission))
    }
    const OnRemoveArray = ( values, setFieldValue) => {
        let fullRent = 0
        let fullLoading = 0
        let fullunLoading = 0
        let fullCommission = 0
        for (let i = 0; i < values.Loads.length-1; i++) 
        {
            fullRent += parseInt(values.Loads[i].rent)
            fullLoading += parseInt(values.Loads[i].loading_cost)
            fullunLoading += parseInt(values.Loads[i].unloading_cost)
            fullCommission += parseInt(values.Loads[i].commission)
        }
        setFieldValue('total_rent', String(fullRent))
        setFieldValue('total_loading', String(fullLoading))
        setFieldValue('total_unloading', String(fullunLoading))
        setFieldValue('total_commission', String(fullCommission))
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
                        <Form >
                            <FieldArray name = "Loads">
                            {
                                (fieldArrayprops) => {
                                    const { form, push, remove } = fieldArrayprops
                                    const { values } = form
                                    const { Loads } = values
                                    return (
                                    <div>
                                        {
                                            Loads.map((loadObj, index) => (
                                                <div key = { index }>
                                                    <Typography className = { classes.rowStyles } color="primary" variant = "h6">
                                                        LOAD : { index+1 }
                                                    </Typography>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `Loads[${index}].date` }
                                                                type = 'date'
                                                                label = "Loaded Date"
                                                                InputLabelProps={{
                                                                    shrink : true,
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `Loads[${index}].origin` }
                                                                type = 'text'
                                                                label = "From place"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `Loads[${index}].end_point` }
                                                                type = 'text'
                                                                label = "Destination"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `Loads[${index}].type` }
                                                                type = 'text'
                                                                label = "Load Type"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `Loads[${index}].weight` }
                                                                type = 'number'
                                                                label = "Weight Ton(s)"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `Loads[${index}].rent` }
                                                                type = 'number'
                                                                label = "Load Rent"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                      <InputAdornment position="start">
                                                                        <span>&#8377;</span> 
                                                                      </InputAdornment>
                                                                    ),
                                                                }}
                                                                onBlur = {
                                                                    (ev) => totalRent(ev, formik.handleBlur, form.values, form.setFieldValue)
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `Loads[${index}].loading_cost` }
                                                                type = 'number'
                                                                label = "Loading Cost"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                      <InputAdornment position="start">
                                                                        <span>&#8377;</span> 
                                                                      </InputAdornment>
                                                                    ),
                                                                }}
                                                                onBlur = {
                                                                    (ev) => totalLoadingCost(ev, formik.handleBlur, form.values, form.setFieldValue)
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `Loads[${index}].unloading_cost` }
                                                                type = 'number'
                                                                label = "Unloading Cost"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                      <InputAdornment position="start">
                                                                        <span>&#8377;</span> 
                                                                      </InputAdornment>
                                                                    ),
                                                                }}
                                                                onBlur = {
                                                                    (ev) => totalUnloadingCost(ev, formik.handleBlur, form.values, form.setFieldValue)
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md >
                                                            <TextFieldComponent 
                                                                name = { `Loads[${index}].commission` }
                                                                type = 'number'
                                                                label = "Commission"
                                                                InputProps={{
                                                                    startAdornment: (
                                                                      <InputAdornment position="start">
                                                                        <span>&#8377;</span> 
                                                                      </InputAdornment>
                                                                    ),
                                                                }}
                                                                onBlur = {
                                                                    (ev) => totalCommission(ev, formik.handleBlur, form.values, form.setFieldValue)
                                                                }
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
                                                    Total Rent 
                                                </Typography>
                                            </Col>
                                            <Col md = {5}>
                                                <Typography color = "secondary">
                                                    : <span>&#8377;</span> { formik.values.total_rent }
                                                </Typography>
                                            </Col>
                                        </Row>

                                        <Row className = { classes.rowStyles }>
                                            <Col md = {7}>
                                                <Typography style={{color : "#16a085"}}>
                                                    Total Loading
                                                </Typography>
                                            </Col>
                                            <Col md = {5}>
                                                <Typography style={{color : "#16a085"}}>
                                                    : <span>&#8377;</span> { formik.values.total_loading }
                                                </Typography>
                                            </Col>
                                        </Row>

                                        <Row className = { classes.rowStyles }>
                                            <Col md = {7}>
                                                <Typography style={{color:"#e67e22"}}>
                                                    Total UnLoading
                                                </Typography>
                                            </Col>
                                            <Col md = {5}>
                                                <Typography style={{color:"#e67e22"}}>
                                                    : <span>&#8377;</span> { formik.values.total_unloading }
                                                </Typography>
                                            </Col>
                                        </Row>

                                        <Row className = { classes.rowStyles }>
                                            <Col md = {7}>
                                                <Typography style={{color:"#9b59b6"}}>
                                                    Total Commission 
                                                </Typography>
                                            </Col>
                                            <Col md = {5}>
                                                <Typography style={{color:"#9b59b6"}}>
                                                    : <span>&#8377;</span> { formik.values.total_commission }
                                                </Typography>
                                            </Col>
                                        </Row>

                                        <div>
                                            <Button
                                                onClick={() => push(EmptyLoad)}
                                            >
                                                Add Load
                                                <AddCircleIcon color="primary" style={{margin:'3px'}} />
                                            </Button>
                                            {
                                                form.values.Loads.length !== 1 ?
                                                
                                                <Button
                                                    onClick={() => { 
                                                        remove(form.values.Loads.length-1)
                                                        OnRemoveArray( form.values, form.setFieldValue) 
                                                    }}
                                                >
                                                    Remove Load
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
                                        <ArrowBackIcon fontSize="small" style={{margin:"5px"}} /><u>Trip info</u>
                                    </Button>
                                    <Button
                                        style={{ margin: "4px", }}
                                        type="submit"
                                    >
                                        <u>Diesel Info</u>
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
export default LoadComponent
LoadComponent.propTypes = {
    formdata : PropTypes.object.isRequired,
    setFormdata : PropTypes.func.isRequired,
    nextStep : PropTypes.func.isRequired,
    prevStep : PropTypes.func.isRequired,
}