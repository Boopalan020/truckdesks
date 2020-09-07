import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
// import { useToasts } from 'react-toast-notifications'
import { Row, Col, FormGroup } from "react-bootstrap";
import { TextField, Container, Button } from "@material-ui/core";
import * as yup from "yup";

import {
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    alignItemsAndJustifyContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }));

function YearlyComponent({formData, setFormData, nextStep, prevStep}) {
    const [direction, setDirection] = useState('back');
    const classes = useStyles();

    const validationSchema = yup.object({
        insurance : yup.string().matches(/^[0-9]*$/, "Must be in Digits").required("Required").nullable(),
        rto : yup.string().matches(/^[0-9]*$/, "Must be in Digits").required("Required").nullable(),
        fc : yup.string().matches(/^[0-9]*$/, "Must be in Digits").required("Required").nullable(),
        quarter_tax : yup.string().matches(/^[0-9]*$/, "Must be in Digits").required("Required").nullable()
    });

    const onSubmit = (values) => {
        setFormData(values)
        direction === 'back' ? prevStep() : nextStep()
      };
    return (
        <div>
            <Container maxWidth="md" className={classes.alignItemsAndJustifyContent}>
                <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                {(formik) => {
                    return (
                    <Form>
                        <Row style={{ padding: "5px" }}>
                        <Col md>
                            <Field name="insurance">
                            {(props) => {
                                const { field, meta } = props;
                                return (
                                <FormGroup>
                                    <TextField
                                    name="insurance"
                                    size="small"
                                    placeholder="Rs : "
                                    label="Insurance"
                                    variant="outlined"
                                    {...field}
                                    />
                                    {meta.touched && meta.error ? (
                                    <div style={{ color: "red", padding: "2px" }}>
                                        {meta.error}
                                    </div>
                                    ) : null}
                                </FormGroup>
                                );
                            }}
                            </Field>
                        </Col>
                        </Row>

                        <Row style={{ padding: "5px" }}>
                        <Col md>
                            <Field name="insurance_date">
                                {(props) => {
                                    return (
                                    <FormGroup>
                                        <KeyboardDatePicker
                                            id="date-picker-dialog"
                                            label="Insurance Date"
                                            name='insurance_date'
                                            size='small'
                                            inputVariant="outlined"
                                            format="MM/dd/yyyy"
                                            value={formik.values.insurance_date}
                                            onChange={value => formik.setFieldValue("insurance_date", value)}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                        />
                                    </FormGroup>
                                    );
                                }}  
                            </Field>

                        </Col>
                        </Row>

                        <Row style={{ padding: "5px" }}>
                        <Col md>
                            <Field name="rto">
                            {(props) => {
                                const { field, meta } = props;
                                return (
                                <FormGroup>
                                    <TextField
                                    name="rto"
                                    size="small"
                                    placeholder="Rs : "
                                    label="RTO"
                                    variant="outlined"
                                    {...field}
                                    />
                                    {meta.touched && meta.error ? (
                                    <div style={{ color: "red", padding: "2px" }}>
                                        {meta.error}
                                    </div>
                                    ) : null}
                                </FormGroup>
                                );
                            }}
                            </Field>
                        </Col>
                        </Row>

                        <Row style={{ padding: "5px" }}>
                        <Col md>
                            <Field name="fc">
                            {(props) => {
                                const { field, meta } = props;
                                return (
                                <FormGroup>
                                    <TextField
                                    name="fc"
                                    size="small"
                                    placeholder="Rs : "
                                    label="Fitness Cert."
                                    variant="outlined"
                                    {...field}
                                    />
                                    {meta.touched && meta.error ? (
                                    <div style={{ color: "red", padding: "2px" }}>
                                        {meta.error}
                                    </div>
                                    ) : null}
                                </FormGroup>
                                );
                            }}
                            </Field>
                        </Col>
                        </Row>

                        <Row style={{ padding: "5px" }}>
                        <Col md>
                        <Field name="fc_date">
                                {(props) => {
                                    return (
                                    <FormGroup>
                                        <KeyboardDatePicker
                                            id="date-picker-dialog"
                                            label="FC Date"
                                            name='fc_date'
                                            size='small'
                                            inputVariant="outlined"
                                            format="MM/dd/yyyy"
                                            value={formik.values.fc_date}
                                            onChange={value => formik.setFieldValue("fc_date", value)}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                        />
                                    </FormGroup>
                                    );
                                }}  
                            </Field>
                        </Col>
                        </Row>
                        
                        <Row style={{ padding: "5px" }}>
                        <Col md>
                            <Field name="quarter_tax">
                            {(props) => {
                                const { field, meta } = props;
                                return (
                                <FormGroup>
                                    <TextField
                                    name="quarter_tax"
                                    size="small"
                                    label="Quarter Tax"
                                    placeholder="Rs : "
                                    variant="outlined"
                                    {...field}
                                    />
                                    {meta.touched && meta.error ? (
                                    <div style={{ color: "red", padding: "2px" }}>
                                        {meta.error}
                                    </div>
                                    ) : null}
                                </FormGroup>
                                );
                            }}
                            </Field>
                        </Col>
                        </Row>

                        <Row style={{ padding: "5px" }}>
                        <Col md>
                            <Field name="status">
                            {(props) => {
                                const { field, meta } = props;
                                return (
                                <FormGroup>
                                    <TextField
                                    name="status"
                                    size="small"
                                    label="Status"
                                    variant="outlined"
                                    {...field}
                                    />
                                    {meta.touched && meta.error ? (
                                    <div style={{ color: "red", padding: "2px" }}>
                                        {meta.error}
                                    </div>
                                    ) : null}
                                </FormGroup>
                                );
                            }}
                            </Field>
                        </Col>
                        </Row>

                        <Row md style={{ padding : "5px" }} >
                            <Col md = {4} >
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    className={classes.button}
                                    onClick={() => prevStep() }
                                    >
                                    Back
                                </Button>
                            </Col>

                            <Col md = {4} >
                                <Button
                                    type='reset'
                                    variant='outlined'
                                    color='primary'
                                    className={classes.button}
                                    >
                                    Clear
                                </Button>
                            </Col>

                            <Col md = {4} >
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    className={classes.button}
                                    onClick={() => setDirection('forward')}
                                    >
                                    Continue
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                    );
                }}
                </Formik>
            </Container>
        </div>
    )
}

export default YearlyComponent

YearlyComponent.propTypes = {
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired
  };
