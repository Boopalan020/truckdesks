import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
// import { useToasts } from 'react-toast-notifications'
import { Row, Col, FormGroup } from "react-bootstrap";
import { TextField, Container, Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as yup from "yup";

import SaveIcon from "@material-ui/icons/Save";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { toggleNextButton, saveVehicleData } from "../../redux";

const useStyles = makeStyles((theme) => ({
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function VehicleInfo(props) {
  const classes = useStyles();

  // INITIAL VALUES
  const initialValues = {
    vehicle_no: "",
    chasis_no: "",
    engine_no: "",
    vehicle_model: "",
    total: null,
    completed: null,
  };
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
    total: yup
      .number("Must be number")
      .positive("Positive digit")
      .required("Required"),
    completed: yup
      .number("Must be number")
      .positive("Positive digit")
      .required("Required"),
  });
  // ONSUBMITTING FORM
  const onSubmit = (values) => {};  
  //Saving data
  const saveData = datas => {
      props.saveVehicleInfo(datas)
      console.log(props.savedData)
  }
  return (
    <div>
      <Container maxWidth="md" className={classes.alignItemsAndJustifyContent}>
        <Formik
          initialValues={initialValues}
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
                    <span style={{ padding: "10px" }}>Due Info</span>
                    <Field name="total">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              type="number"
                              name="total"
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
                    <Field name="completed">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <FormGroup>
                            <TextField
                              type="number"
                              name="completed"
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
                  style={{ margin: "4px" }}
                  onClick={props.togglenext}
                  disabled={!(formik.isValid && formik.dirty)}
                  startIcon={<SaveIcon />}
                  variant="contained"
                  color="secondary"
                >
                  <span align="center">Save</span>
                </Button>

                <Button
                  style={{ margin: "4px" }}
                  disabled={ saveData(formik.values) }
                  startIcon={<NavigateNextIcon />}
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

const mapStateToProps = (state) => {
  return {
    vehiclenext: state.vehicleinfo.enablenext,
    savedData : state.vehicleinfo.vehicleDatas
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    togglenext: () => dispatch(toggleNextButton()),
    saveVehicleInfo : (datas) => dispatch(saveVehicleData(datas))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInfo);
