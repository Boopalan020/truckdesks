import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col, FormGroup } from "react-bootstrap";
import { TextField, Container, Button } from "@material-ui/core";
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
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
  }));

function VechinfoComponent({ formdata, setFormdata, nextStep }) {
    const classes = useStyles();

    const onSubmit = (values) => {
        setFormdata(values)
        console.log(values)
        nextStep()
    };  

    const validationSchema = yup.object({
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
                                <TextFieldComponent 
                                    name = "vehicle_no"
                                    label = "vehicle number"
                                    type = 'text'        
                                />
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
                                <TextFieldComponent
                                    name = 'driver_name'
                                    label = "Driver Name"
                                    type = "text"
                                />
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
