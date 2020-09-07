import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
// import { useToasts } from 'react-toast-notifications'
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
        "Ex : TN 00 AB 1234"
      )
      .required("Required"),
    chasis_no: yup
      .string()
      .length(17, "Length Must be 17")
      .required("Required"),
    engine_no: yup.string().required("Required"),
    vehicle_model: yup.string().required("Required"),
    total_due: yup.string()
      .matches(/^[0-9]*$/, "Must be digit")
      .required("Required").nullable(),
    completed_due: yup.string()
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
                    <Typography style={{padding:'10px'}}>Due detail</Typography>
                    <Field name="total_due" >
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              name="total_due"
                              size="small"
                              label="Total Due"
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
                    <Field name="completed_due">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              name="completed_due"
                              size="small"
                              label="Complted Due"
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

                <Button
                  type = 'reset'
                  style={{ margin: "4px" }}
                  variant="outlined"
                  color="primary"
                >
                  <span align="center">Clear</span>
                </Button>

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
    formdata: PropTypes.object.isRequired,
    setFormdata: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired
  };
