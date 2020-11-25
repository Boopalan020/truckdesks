import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Formik, Form, Field, ErrorMessage } from "formik"
// import { useToasts } from 'react-toast-notifications'
import { Row, Col, FormGroup } from "react-bootstrap"
import { TextField, Container, Button, Divider, Typography, FormHelperText } from "@material-ui/core"
import * as yup from "yup"

import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Axios from 'axios'
import toast from 'toasted-notes' 
import Alert from '@material-ui/lab/Alert'

const apiOrigin  = "http://localhost:3001"
const useStyles = makeStyles((theme) => ({
    alignItemsAndJustifyContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    headingStyle : {
        padding:'10px',
        color : '#4615b2'
    },
  }));

function YearPopComponent({ id, handleClose }) {
    const classes = useStyles();

    const [formdata, setFormdata] = useState({
        national_date : '', national_cost : '', insurance_date : '', insurance : '', fc_date : '', fc : '', quarter_tax_date : '',
        quarter_tax : '', rto : '', year : '', status : ''
    })

    const validationSchema = yup.object({
        national_date : yup.string().required('Required'),
        national_cost : yup.string().matches(/^[0-9]*$/, "Must be in Digits").required("Required").nullable(),
        insurance_date : yup.string().required('Required'),
        insurance : yup.string().matches(/^[0-9]*$/, "Must be in Digits").required("Required").nullable(),
        fc_date : yup.string().required('Required'),
        fc : yup.string().matches(/^[0-9]*$/, "Must be in Digits").required("Required").nullable(),
        quarter_tax_date : yup.string().required('Required'),
        quarter_tax : yup.string().matches(/^[0-9]*$/, "Must be in Digits").required("Required").nullable(),
        rto : yup.string().matches(/^[0-9]*$/, "Must be in Digits").required("Required").nullable(),
        year : yup.string().required("Required"),
        status : yup.string().required("Required")
    });

    const onSubmit = (values) => {
        setFormdata(values)
        Axios.post(`${apiOrigin}/dashboard/addyear`, {id, values})
        .then(addres => {
            // console.log(addres)
            toast.notify(
                <Alert size="small" severity="success">
                  Added successfully
                </Alert>,
                {
                  position : "top",
                  duration : "4000"
                }
              )
            handleClose()
        })
        .catch(err => {
            // console.log(err)
            toast.notify(
                <Alert size="small" severity="warning">
                  Error
                </Alert>,
                {
                  position : "top",
                  duration : "4000"
                }
              )
        })
      };
    return (
        <div>
            <Container maxWidth="md" className={classes.alignItemsAndJustifyContent}>
                <Formik
                initialValues={formdata}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                {(formik) => {
                    return (
                    <Form>

                        <Row>
                            <Typography className = { classes.headingStyle } > National Permit </Typography>
                        </Row>
                        <Row>
                            <Col lg = {6}>
                                <Field name="national_date">
                                {(props) => {
                                    const { field, meta } = props;
                                    return (
                                    <FormGroup>
                                        <TextField
                                            id="date"
                                            label="Permit Date"
                                            type="date"
                                            name = "national_date"
                                            variant = "outlined"
                                            size = "small"
                                            error = { Boolean(meta.touched && meta.error) }
                                            helperText = { <ErrorMessage name = "national_date" /> }
                                            {...field}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormGroup>
                                    );
                                }}
                                </Field>
                            </Col>
                            <Col lg = {6}>
                                <Field name="national_cost">
                                {(props) => {
                                    const { field, meta } = props;
                                    return (
                                    <FormGroup>
                                        <TextField
                                            name="national_cost"
                                            size="small"
                                            placeholder="Rs : "
                                            label="Cost"
                                            variant="outlined"
                                            {...field}
                                            error = {Boolean(meta.touched && meta.error)}
                                            helperText = { <ErrorMessage name = "national_cost" /> }
                                        />
                                    </FormGroup>
                                    );
                                }}
                                </Field>
                            </Col>
                        </Row>
                        <Divider />

                        <Row>
                            <Typography className = { classes.headingStyle } > Insurance Detail </Typography>
                        </Row>
                        <Row>
                            <Col lg = {6}>
                                <Field name="insurance_date">
                                    {(props) => {
                                        const { field, meta } = props;
                                        return (
                                        <FormGroup>
                                            <TextField
                                                id="date"
                                                label="Insurance Date"
                                                type="date"
                                                name = "insurance_date"
                                                variant = "outlined"
                                                size = "small"
                                                error = { Boolean(meta.touched && meta.error) }
                                                helperText = { <ErrorMessage name = "insurance_date" /> }
                                                {...field}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </FormGroup>
                                        );
                                    }}
                                </Field>
                            </Col>
                            <Col lg = {6}>
                                <Field name="insurance">
                                    {(props) => {
                                        const { field, meta } = props;
                                        return (
                                        <FormGroup>
                                            <TextField
                                                name="insurance"
                                                size="small"
                                                placeholder="Rs : "
                                                label="Cost"
                                                variant="outlined"
                                                {...field}
                                                error = {Boolean(meta.touched && meta.error)}
                                                helperText = { <ErrorMessage name = "insurance" /> }
                                            />
                                        </FormGroup>
                                        );
                                    }}
                                </Field>
                            </Col>
                        </Row>
                        <Divider />

                        <Row>
                            <Typography className = { classes.headingStyle }> Fitness Certificate Detail </Typography>
                        </Row>
                        <Row>
                            <Col lg = {6}>
                                <Field name="fc_date">
                                    {(props) => {
                                        const { field, meta } = props;
                                        return (
                                        <FormGroup>
                                            <TextField
                                                id="date"
                                                label="FC Date"
                                                type="date"
                                                name = "fc_date"
                                                variant = "outlined"
                                                size = "small"
                                                error = { Boolean(meta.touched && meta.error) }
                                                helperText = { <ErrorMessage name = "fc_date" /> }
                                                {...field}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </FormGroup>
                                        );
                                    }}
                                </Field>
                            </Col>
                            <Col lg = {6}>
                                <Field name="fc">
                                    {(props) => {
                                        const { field, meta } = props;
                                        return (
                                        <FormGroup>
                                            <TextField
                                                name="fc"
                                                size="small"
                                                placeholder="Rs : "
                                                label="Cost"
                                                variant="outlined"
                                                {...field}
                                                error = {Boolean(meta.touched && meta.error)}
                                                helperText = { <ErrorMessage name = "fc" /> }
                                            />
                                        </FormGroup>
                                        );
                                    }}
                                </Field>
                            </Col>
                        </Row>
                        <Divider />

                        <Row>
                            <Typography className = { classes.headingStyle }> Quarter Tax Detail </Typography>
                        </Row>

                        <Row>
                            <Col lg = {6}>
                                <Field name="quarter_tax_date">
                                    {(props) => {
                                        const { field, meta } = props;
                                        return (
                                        <FormGroup>
                                            <TextField
                                                id="date"
                                                label="Quarter Tax Date"
                                                type="date"
                                                name = "quarter_tax_date"
                                                variant = "outlined"
                                                size = "small"
                                                error = { Boolean(meta.touched && meta.error) }
                                                helperText = { <ErrorMessage name = "quarter_tax_date" /> }
                                                {...field}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </FormGroup>
                                        );
                                    }}
                                </Field>
                            </Col>
                            <Col lg = {6}>
                                <Field name="quarter_tax">
                                    {(props) => {
                                        const { field, meta } = props;
                                        return (
                                        <FormGroup>
                                            <TextField
                                                name="quarter_tax"
                                                size="small"
                                                placeholder="Rs : "
                                                label="Cost"
                                                variant="outlined"
                                                {...field}
                                                error = {Boolean(meta.touched && meta.error)}
                                                helperText = { <ErrorMessage name = "quarter_tax" /> }
                                            />
                                        </FormGroup>
                                        );
                                    }}
                                </Field>
                            </Col>
                        </Row>

                        <Row >
                            <Col md={6}>
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
                                        error = {Boolean(meta.touched && meta.error)}
                                        helperText = { <ErrorMessage name = "rto" /> }
                                        />
                                    </FormGroup>
                                    );
                                }}
                                </Field>
                            </Col>
                            
                            <Col md={6}>
                                <Field name="year">
                                {(props) => {
                                    const { field, meta } = props;
                                    return (
                                    <FormGroup>
                                        <TextField
                                        name="year"
                                        size="small"
                                        placeholder="Rs : "
                                        label="Year"
                                        variant="outlined"
                                        {...field}
                                        error = {Boolean(meta.touched && meta.error)}
                                        helperText = { <ErrorMessage name = "year" /> }
                                        />
                                    </FormGroup>
                                    );
                                }}
                                </Field>
                            </Col>

                        </Row>

                        <Row >
                        <Col md>
                            <Field name="status">
                            {(props) => {
                                const { field, meta } = props;
                                return (
                                    <FormControl component="fieldset">
                                        <FormLabel className = { classes.headingStyle } >Payment Status</FormLabel>
                                        <div>
                                            <Radio color = "primary" id = "paid" {...field} value = "Paid" checked = { field.value === "Paid" } />Paid
                                            <Radio color = "primary" id = "unpaid" {...field} value = "Unpaid" checked = { field.value === "Unpaid" } />Unpaid
                                            <FormHelperText error = {Boolean(meta.touched && meta.error)}> { <ErrorMessage name = "status" /> } </FormHelperText>
                                        </div>
                                    </FormControl>
                                );
                            }}
                            </Field>
                        </Col>
                        </Row>

                        <Row md style={{ padding : "5px" }} >

                            <Col md = {4} style={{ padding : "5px" }} >
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    className={classes.button}
                                    >
                                    Add
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

export default YearPopComponent
