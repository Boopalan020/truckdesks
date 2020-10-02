import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Row, Col, FormGroup } from "react-bootstrap"
import {
  TextField,
  Container,
  Button,
  Typography,
  Divider, Paper, InputAdornment
} from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import PropTypes from "prop-types"
import * as yup from "yup"

const useStyles = makeStyles((theme) => ({
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rowStyles: {
    padding: "5px",
  },
  submitStyle: {
    padding: "5px",
    paddingBottom: "30px",
  },
  paperStyle : {
    maxHeight:600, 
    overflowY:"auto", 
    overflowX:"hidden", 
    padding:"25px"
  },
}));

function OverallComponent({formdata, setFormdata, prevStep, firstStep }) {
  const classes = useStyles();
  const onSubmit = (values) => {
    setFormdata(values);
    console.log(values);
  };
  const validationSchema = yup.object({});
  const totalExpense = (ev, handleBlur, values, setFieldValue) => {
    handleBlur(ev)
    totalExpenseOnClick(values, setFieldValue)
  };
  const totalExpenseOnClick = (values, setFieldValue) => {
    let fullExpenses = 0
    fullExpenses +=
      parseInt(values.total_diesel_amount) +
      parseInt(values.total_commission) +
      parseInt(values.total_loading) +
      parseInt(values.total_unloading) +
      parseInt(values.total_expense) +
      parseInt(values.driver_salary) +
      parseInt(values.cleaner_salary) +
      parseInt(values.pathayam) +
      parseInt(values.workshop) +
      parseInt(values.total_rto) +
      parseInt(values.bill_padi) +
      parseInt(values.toll_gate);
    console.log(fullExpenses);
    if(!isNaN(fullExpenses))
        setFieldValue("trip_expense", String(fullExpenses));
  };

  const finalAmountCalc = (values, setFieldValue) => {
    let handOn = 0
    let iperkm = 0
    let expenseperkm = 0
    let iperday = 0

    handOn += (parseInt(values.total_rent) - parseInt(values.trip_expense))
    iperkm += (handOn/parseInt(values.total_km))
    expenseperkm += (parseInt(values.trip_expense)/parseInt(values.total_km))

    const date1 = new Date(values.from)
    const date2 = new Date(values.to)
    const diffDays = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)); 
    iperday += (parseInt(handOn)/diffDays)
    console.log("Days", diffDays)

    setFieldValue("trip_duration", String(diffDays))
    setFieldValue("final_balance.hands_on", String(handOn))
    setFieldValue("final_balance.income_km", String(iperkm.toFixed(2)))
    setFieldValue("final_balance.expense_km", String(expenseperkm.toFixed(2)))
    setFieldValue("final_balance.income_day", String(iperday.toFixed(2)))
  }
  return (
    <div>
      <Container maxWidth="md">
        <Formik initialValues={formdata} validationSchema={validationSchema} onSubmit = { onSubmit }>
          {(formik) => {
            return (
              <Form>
                <Row className = { classes.rowStyles }>
                    <Col md = {6}>
                        <Paper elevation = {3} className = {classes.paperStyle}>
                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="total_diesel_amount"
                                label="Diesel"
                                type="text"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                disabled="true"
                                />
                            </Col>
                            </Row>
                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="total_commission"
                                label="Commission"
                                type="text"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <span>&#8377;</span> 
                                    </InputAdornment>
                                  ),
                              }}
                                disabled="true"
                                />
                            </Col>
                            </Row>
                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="total_loading"
                                label="Loading"
                                type="text"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                disabled="true"
                                />
                            </Col>
                            </Row>
                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="total_unloading"
                                label="Unloading"
                                type="text"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                disabled="true"
                                />
                            </Col>
                            </Row>
                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="total_expense"
                                label="Other Expense"
                                type="text"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                disabled="true"
                                />
                            </Col>
                            </Row>
                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="driver_salary"
                                label="Driver salary"
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                onBlur = {(ev) => totalExpense (ev, formik.handleBlur, formik.values, formik.setFieldValue)}
                                />
                            </Col>
                            </Row>
                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="cleaner_salary"
                                label="Cleaner salary"
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                onBlur = {(ev) => totalExpense (ev, formik.handleBlur, formik.values, formik.setFieldValue)}
                                />
                            </Col>
                            </Row>
                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="pathayam"
                                label="Pathayam"
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                onBlur = {(ev) => totalExpense (ev, formik.handleBlur, formik.values, formik.setFieldValue)}
                                />
                            </Col>
                            </Row>

                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="workshop"
                                label="workshop"
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                onBlur = {(ev) => totalExpense (ev, formik.handleBlur, formik.values, formik.setFieldValue)}
                                />
                            </Col>
                            </Row>

                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="total_rto"
                                label="RTO & PC"
                                type="text"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                disabled="true"
                                />
                            </Col>
                            </Row>

                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="toll_gate"
                                label="Toll gate"
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                onBlur = {(ev) => totalExpense (ev, formik.handleBlur, formik.values, formik.setFieldValue)}
                                />
                            </Col>
                            </Row>

                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="bill_padi"
                                label="Bill Padi"
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                onBlur = {(ev) => totalExpense (ev, formik.handleBlur, formik.values, formik.setFieldValue)}
                                />
                            </Col>
                            </Row>

                            <Row className={classes.rowStyles}>
                            <Col md>
                                <TextFieldComponent
                                name="total_rent"
                                label="Collection"
                                type="text"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <span>&#8377;</span> 
                                      </InputAdornment>
                                    ),
                                }}
                                disabled="true"
                                />
                            </Col>
                            </Row>
                        </Paper>
                    </Col>

                    <Col md = {6} style={{padding:"10px"}} >
                        <Row className = { classes.rowStyles }>
                            <Col md>
                                Trip Expense : <span>&#8377;</span> { formik.values.trip_expense }
                            </Col>
                        </Row>
                        <Row className = { classes.rowStyles }>
                            <Col>
                                Total Collection : <span>&#8377;</span> { formik.values.total_rent }
                            </Col>
                        </Row>
                        <Row className = { classes.rowStyles }>
                            <Col>
                                Trip Duration : { formik.values.trip_duration } Day(s)
                            </Col>
                        </Row>
                        <Divider variant = "middle"/>
                        <Row className = { classes.rowStyles } style={{textAlign : "center"}} >
                            <Col>
                                <Typography variant = "h5" color="secondary" >
                                  <b>On Hand Amount : <span>&#8377;</span> { formik.values.final_balance.hands_on }</b>
                                </Typography>
                            </Col>
                        </Row>
                        <Divider variant = "middle"/>
                        <Row className = { classes.rowStyles }>
                            <Col style = {{color : "#27ae60",textAlign : "center"}}>
                                Income/day : <span>&#8377;</span> { formik.values.final_balance.income_day }
                            </Col>
                        </Row>
                        <Row className = { classes.rowStyles }>
                            <Col style = {{color : "#e67e22", textAlign : "center"}}>
                                Income/km : <span>&#8377;</span> { formik.values.final_balance.income_km }
                            </Col>
                        </Row>
                        <Row className = { classes.rowStyles }>
                            <Col style = {{color : "#8e44ad", textAlign : "center"}}>
                                Expense/km : <span>&#8377;</span> { formik.values.final_balance.expense_km }
                            </Col>
                        </Row>
                        <Row className = { classes.rowStyles }>
                          <Col style = {{textAlign : "center"}}>
                            <Button
                              variant = "contained"
                              color = "primary"
                              onClick = {() => finalAmountCalc(formik.values, formik.setFieldValue)}
                            >
                              Finish
                            </Button>
                          </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider variant = 'middle'/>
                <Row style = {{marginBottom : "10px"}} >
                    <Col md style={{ textAlign: "center" }}>
                    <Button
                        style={{ margin: "4px" }}
                        onClick={() => prevStep()}
                    >
                        <ArrowBackIcon
                        fontSize="small"
                        style={{ margin: "5px" }}
                        />
                        <u>RTO & PC info</u>
                    </Button>
                    <Button style={{ margin: "4px" }} type="submit">
                        <u>Save Memo </u>
                        <SaveIcon
                        fontSize="small"
                        style={{ margin: "5px" }}
                        />
                    </Button>
                    </Col>
                </Row>

              </Form>
            );
          }}
        </Formik>
      </Container>
    </div>
  );
}

function TextFieldComponent(props) {
  const { label, name, disabled, type, ...rest } = props;
  return (
    <Field name={name} {...rest}>
      {(fieldprops) => {
        const { field, meta } = fieldprops;
        return (
          <FormGroup>
            <TextField
              name={name}
              type={type}
              fullWidth
              size="small"
              label={label}
              variant="outlined"
              {...field}
              {...rest}
              disabled={Boolean(disabled)}
              error={Boolean(meta.touched && meta.error)}
              helperText={<ErrorMessage name={name} />}
            />
          </FormGroup>
        );
      }}
    </Field>
  );
}
export default OverallComponent;
OverallComponent.propTypes = {
  formdata: PropTypes.object.isRequired,
  setFormdata: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  firstStep: PropTypes.func.isRequired,
};
