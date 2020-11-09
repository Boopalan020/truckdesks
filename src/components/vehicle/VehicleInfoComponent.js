import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col, FormGroup } from "react-bootstrap";
import { TextField, Container, Button, Typography } from "@material-ui/core";
import PropTypes from 'prop-types'
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function VehicleInfoComponent({formData, setFormData, nextStep}) {
  const classes = useStyles();

  const validationSchema = yup.object({
    vehicle_no: yup
      .string()
      .matches(
        /^[a-z]{2}\s[0-9]{2}\s[a-z]{1,2}\s[0-9]{4}$/i,
        "Ex : TN 12 AB 1234"
      )
      .required("Required"),
    reg_date : yup
      .string().required('Required'),
    due_date : yup
    .string().required('Required'),
    chasis_no: yup
      .string()
      .length(17, "Length Must be 17")
      .required("Required"),
    engine_no: yup.string().required("Required"),
    vehicle_model: yup.string().required("Required"),
    total_due_amount: yup.string()
      .matches(/^[0-9]*$/, "Must be digit")
      .required("Required").nullable(),
    due_interest : yup
    .string().matches(/^[0-9]*\.?[0-9]*$/, "Interest in Number")
      .required("Required").nullable(),
    total_months : yup.string()
    .matches(/^[0-9]*$/, "Must be digit")
    .required("Required").nullable(),
    completed_month: yup.string()
      .matches(/^[0-9]*$/, "Must be digit")
      .required("Required").nullable(),
  });
  // ONSUBMITTING FORM
  const onSubmit = (values) => {
    setFormData(values)
    nextStep()
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
                    <Field name="vehicle_no">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              name="vehicle_no"
                              size="small"
                              label="Vehicle Number"
                              variant="outlined"
                              {...field}
                              error = { Boolean(meta.touched && meta.error) }
                              helperText = { <ErrorMessage name = "vehicle_no" /> }
                            />
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                </Row>

                <Row style={{ padding: "5px" }}>
                  <Col md>
                    <Field name="reg_date">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                                id="date"
                                label="Registration date"
                                type="date"
                                name = "reg_date"
                                variant = "outlined"
                                size = "small"
                                error = { Boolean(meta.touched && meta.error) }
                                helperText = { <ErrorMessage name = "reg_date" /> }
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
                </Row>

                <Row style={{ padding: "5px" }}>
                  <Col md>
                    <Field name="chasis_no">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              name="chasis_no"
                              size="small"
                              label="Chasis Number"
                              variant="outlined"
                              {...field}
                              error = {Boolean(meta.touched && meta.error)}
                              helperText = { <ErrorMessage name = "chasis_no" /> }
                            />
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                </Row>

                <Row style={{ padding: "5px" }}>
                  <Col md>
                    <Field name="engine_no">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              name="engine_no"
                              size="small"
                              label="Engine Number"
                              variant="outlined"
                              {...field}
                              error = {Boolean(meta.touched && meta.error)}
                              helperText = { <ErrorMessage name = "engine_no" /> }
                            />
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                </Row>

                <Row style={{ padding: "5px" }}>
                  <Col md>
                    <Field name="vehicle_model">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              name="vehicle_model"
                              size="small"
                              label="Vehicle Model"
                              variant="outlined"
                              {...field}
                              error = {Boolean(meta.touched && meta.error)}
                              helperText = { <ErrorMessage name = "vehicle_model" /> }
                            />
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                </Row>

                <Row style={{ padding: "5px" }}>
                  <Col md>
                    <Typography style={{padding:'10px'}}>Due detail</Typography>
                    <Field name="total_due_amount" >
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              name="total_due_amount"
                              size="small"
                              label="Total Due Amount"
                              variant="outlined"
                              {...field}
                              error = {Boolean(meta.touched && meta.error)}
                              helperText = { <ErrorMessage name = "total_due_amount" /> }
                            />
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                </Row>

                <Row style={{ padding: "5px" }}>
                  <Col md>
                    <Field name="due_date">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                                id="date"
                                label="Due date"
                                type="date"
                                name = "due_date"
                                variant = "outlined"
                                size = "small"
                                error = { Boolean(meta.touched && meta.error) }
                                helperText = { <ErrorMessage name = "due_date" /> }
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
                </Row>

                <Row style={{ padding: "5px" }}>
                  <Col md>
                    <Field name = "due_interest" >
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              name="due_interest"
                              size="small"
                              label="Due Interest"
                              variant="outlined"
                              {...field}
                              error = {Boolean(meta.touched && meta.error)}
                              helperText = { <ErrorMessage name = "due_interest" /> }
                            />
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                </Row>

                <Row style={{ padding: "5px" }}>
                  <Col md>
                    <Field name = "total_months" >
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              name="total_months"
                              size="small"
                              label="Total Due Month"
                              variant="outlined"
                              {...field}
                              error = {Boolean(meta.touched && meta.error)}
                              helperText = { <ErrorMessage name = "total_months" /> }
                            />
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                </Row>

                <Row style={{ padding: "5px" }}>
                  <Col md>
                    <Field name="completed_month">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              name="completed_month"
                              size="small"
                              label="Completed Due month"
                              variant="outlined"
                              {...field}
                              error = {Boolean(meta.touched && meta.error)}
                              helperText = { <ErrorMessage name = "completed_month" /> }
                            />
                          </FormGroup>
                        );
                      }}
                    </Field>
                  </Col>
                </Row>
                <Button
                  style={{ margin: "4px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                <span align="center">Next</span>
                </Button>

              </Form>
            );
          }}
        </Formik>
      </Container>
    </div>
  );
}

export default VehicleInfoComponent;

VehicleInfoComponent.propTypes = {
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired
  };
