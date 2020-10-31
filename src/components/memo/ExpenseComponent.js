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
const EmptyExpense = {
    reason : '',
    amount : ''
}
function ExpenseComponent({formdata, setFormdata, nextStep, prevStep}) {
    const classes = useStyles();

    const onSubmit = (values) => {
        setFormdata(values)
        nextStep()
    }; 

    const validationSchema = yup.object({
        new_tyre : yup.string().required('Required'),
        old_tyre : yup.string().required('Required'),
        expense_details : yup.array().of(
            yup.object().shape({
                reason : yup.string().required('Required'),
                amount : yup.string().matches(/^[0-9]*$/, 'Enter in Amount').required('Required')
            })
        )
     })

    const totalExpense=(ev, handleBlur, values, setFieldValue)=>{
        handleBlur(ev)
        let fullExpense = 0
        for (let i = 0; i < values.expense_details.length; i++)
            fullExpense += parseInt(values.expense_details[i].amount);
        if(!isNaN(fullExpense))
            setFieldValue('total_expense', String(fullExpense))
    }

    const OnRemoveArray=( values, setFieldValue) => {
        let fullExpense = 0
        for (let i = 0; i < values.expense_details.length-1 ; i++)
            fullExpense += parseInt(values.expense_details[i].amount);

        if(!isNaN(fullExpense))
            setFieldValue('total_expense', String(fullExpense))
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
                            <Row className = { classes.rowStyles }>
                                <Col md>
                                    <TextFieldComponent 
                                        name = 'new_tyre'
                                        type = 'text'
                                        label = 'New Tyre Rate'
                                        InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <span>&#8377;</span> 
                                              </InputAdornment>
                                            ),
                                        }}
                                       
                                    />
                                </Col>
                            </Row>

                            <Row className = { classes.rowStyles }>
                                <Col md>
                                    <TextFieldComponent 
                                        name = 'old_tyre'
                                        type = 'text'
                                        label = 'Old Tyre Rate'
                                        InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <span>&#8377;</span> 
                                              </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Divider />
                            <FieldArray name = "expense_details">
                            {(fieldArrayprops) => {
                                const { form, push, remove } = fieldArrayprops
                                const { values } = form
                                const { expense_details } = values
                                return (
                                    <div>
                                    {
                                        expense_details.map((obj, index) => (
                                            <div key = { index }>
                                                 <Typography className = { classes.rowStyles } color="primary" variant = "h6">
                                                    REASON : { index+1 }
                                                </Typography>
                                                <Row className = { classes.rowStyles }>
                                                    <Col md >
                                                        <TextFieldComponent 
                                                            name = { `expense_details[${index}].reason` }
                                                            type = 'text'
                                                            label = "Reason"
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className = { classes.rowStyles }>
                                                    <Col md >
                                                        <TextFieldComponent 
                                                            name = { `expense_details[${index}].amount` }
                                                            type = 'text'
                                                            label = "Amount"
                                                            InputProps={{
                                                                startAdornment: (
                                                                  <InputAdornment position="start">
                                                                    <span>&#8377;</span> 
                                                                  </InputAdornment>
                                                                ),
                                                            }}
                                                            onBlur = {(ev) => totalExpense(ev, formik.handleBlur, form.values, form.setFieldValue)}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Divider />
                                            </div>
                                        ))
                                    }
                                        <div>
                                            <Button
                                                onClick={() => push(EmptyExpense)}
                                            >
                                                Add exp
                                                <AddCircleIcon color="primary" style={{margin:'3px'}} />
                                            </Button>
                                            {
                                                form.values.expense_details.length !== 1 ?
                                                
                                                <Button
                                                    onClick={() => { 
                                                        remove(form.values.expense_details.length-1)
                                                        OnRemoveArray( form.values, form.setFieldValue) 
                                                    }}
                                                >
                                                    Remove exp
                                                    <IndeterminateCheckBoxIcon color="primary" style={{margin:'3px'}} />
                                                </Button> : null
                                            }
                                        </div>
                                    </div>
                                )
                            }}
                            </FieldArray>
                            <Divider />
                            <Row className = { classes.rowStyles }>
                                <Col md = {7}>
                                    <Typography color="secondary">
                                        Total Expense
                                    </Typography>
                                </Col>
                                <Col md = {5}>
                                    <Typography color="secondary">
                                        : <span>&#8377;</span> { formik.values.total_expense }
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
                                        <ArrowBackIcon fontSize="small" style={{margin:"5px"}} /><u>Diesel info</u>
                                    </Button>
                                    <Button
                                        style={{ margin: "4px", }}
                                        type="submit"
                                    >
                                        <u>RTO-PC </u>
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
export default ExpenseComponent
ExpenseComponent.propTypes = {
    formdata : PropTypes.object.isRequired,
    setFormdata : PropTypes.func.isRequired,
    nextStep : PropTypes.func.isRequired,
    prevStep : PropTypes.func.isRequired,
}
