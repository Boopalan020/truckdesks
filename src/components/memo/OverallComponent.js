import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Row, Col, FormGroup } from "react-bootstrap"
import { TextField, Container, Button, Typography, Divider, Paper, InputAdornment } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import PropTypes from "prop-types"
import * as yup from "yup"
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import Axios from 'axios'
import toast from 'toasted-notes' 
import Alert from '@material-ui/lab/Alert'

// const apiOrigin = "https://truckdesks.herokuapp.com"
const apiOrigin = "https://localhost:3001"
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
  paperStyle: {
    maxHeight: 600,
    overflowY: "auto",
    overflowX: "hidden",
    padding: "25px",
  },
}));

function OverallComponent({ formdata, setFormdata, prevStep, firstStep }) {
  const classes = useStyles();
  const [previewstate, setPreviewstate] = useState('true')
  const onSubmit = (values) => {
    setFormdata(values);
    Axios.post(`${apiOrigin}/memo/savememo`, {data : values})
    .then(res => {
      if(res.status === 200 && res.data.flags === true)
      {
        toast.notify(
          <Alert size="small" severity="success">
            Memo Saved successfully
          </Alert>,
          {
            position : "top",
            duration : "4000"
          }
        )
      }
      else
      {
        toast.notify(
          <Alert size="small" severity="error">
            Error occured on saving Memo
          </Alert>,
          {
            position : "top",
            duration : "4000"
          }
        )
      }
    })
    .catch(err => {
      toast.notify(
        <Alert size="small" severity="error">
          Connection Error
        </Alert>,
        {
          position : "top",
          duration : "4000"
        }
      )
    })
    firstStep()
  };
  const validationSchema = yup.object({});
  const totalExpense = (ev, handleBlur, values, setFieldValue) => {
    handleBlur(ev);
    totalExpenseOnClick(values, setFieldValue);
  };
  // Total Expense Calculation
  const totalExpenseOnClick = (values, setFieldValue) => {
    let fullExpenses = 0;
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
    if (!isNaN(fullExpenses))
      setFieldValue("trip_expense", String(fullExpenses));
  };
  //Final Amount calculation 
  const finalAmountCalc = (values, setFieldValue) => {
    let handOn = 0;
    let iperkm = 0;
    let expenseperkm = 0;
    let iperday = 0;

    handOn += parseInt(values.total_rent) - parseInt(values.trip_expense);
    iperkm += handOn / parseInt(values.total_km);
    expenseperkm += parseInt(values.trip_expense) / parseInt(values.total_km);

    const date1 = new Date(values.from);
    const date2 = new Date(values.to);
    const diffDays = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    iperday += parseInt(handOn) / diffDays;

    setFieldValue("trip_duration", String(diffDays));
    setFieldValue("final_balance.hands_on", String(handOn));
    setFieldValue("final_balance.income_km", String(iperkm.toFixed(2)));
    setFieldValue("final_balance.expense_km", String(expenseperkm.toFixed(2)));
    setFieldValue("final_balance.income_day", String(iperday.toFixed(2)));

    setPreviewstate(0)
  };
  // Generating PDF function
  const getPDFfunction = (memoData) => {
    var buf;
    Axios.get(`${apiOrigin}/memo/getpdf`, {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pdf",
      },
    }).then(async (res) => {
      var d = new Date(memoData.calc_date);
      var calc_dates =
        d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

      d = new Date(memoData.from);
      var from_date =
        d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

      d = new Date(memoData.to);
      var to_date =
        d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

      buf = new Buffer.alloc(res.data.byteLength);
      var view = new Uint8Array(res.data);
      for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
      }
      const pdfDoc = await PDFDocument.load(buf);

      // ---------------------------------------
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const secondPage = pages[1];

      // For Top 3 rows============
      firstPage.drawText(memoData.vehicle_no, {
        // Vehicle Number
        x: 110,
        y: 560,
        size: 12,
      });
      firstPage.drawText(memoData.advance_amount, {
        //Advance amount
        x: 330,
        y: 560,
        size: 12,
      });
      firstPage.drawText(memoData.milege + " km/lit", {
        //Mileage
        x: 530,
        y: 560,
        size: 12,
      });
      firstPage.drawText(calc_dates, {
        // Calculated date
        x: 700,
        y: 560,
        size: 12,
      });
      //----------------------------------------
      firstPage.drawText(memoData.start_km, {
        // Starting kilometer
        x: 120,
        y: 540,
        size: 12,
      });
      firstPage.drawText(memoData.end_km, {
        //End kilo meter
        x: 320,
        y: 540,
        size: 12,
      });
      firstPage.drawText(memoData.total_km, {
        //Total km
        x: 540,
        y: 540,
        size: 12,
      });
      firstPage.drawText(memoData.total_diesel_litre, {
        // Total Diesel litres
        x: 700,
        y: 540,
        size: 12,
      });
      //------------------------------------------
      firstPage.drawText(memoData.driver_name, {
        //driver name
        x: 150,
        y: 515,
        size: 12,
      });
      firstPage.drawText(memoData.cleaner_name, {
        //cleaner name
        x: 510,
        y: 515,
        size: 12,
      });
      firstPage.drawText(from_date, {
        //from date
        x: 630,
        y: 515,
        size: 12,
      });
      firstPage.drawText(to_date, {
        //to date
        x: 720,
        y: 515,
        size: 12,
      });
      // end ---- top 3 rows=======

      // printing trip information
      var xval = 34;
      var yval = 470;
      var printable = "";
      for (i = 0; i < memoData.loads.length; i++) {
        console.log("i-Value", memoData.loads.length);
        xval = 34;
        for (var col = 1; col <= 8; col++) {
          printable = "";
          switch (col) {
            case 1:
              d = new Date(memoData.loads[i].date);
              printable +=
                d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
              break;
            case 2:
              printable +=
                memoData.loads[i].origin + " to " + memoData.loads[i].end_point;
              xval = 95;
              break;
            case 3:
              printable += memoData.loads[i].type;
              xval = 287;
              break;
            case 4:
              printable += memoData.loads[i].weight;
              xval = 345;
              break;
            case 5:
              printable += memoData.loads[i].rent;
              xval = 368;
              break;
            case 6:
              printable += memoData.loads[i].commission;
              xval = 420;
              break;
            case 7:
              printable += memoData.loads[i].loading_cost;
              xval = 500;
              break;
            case 8:
              printable += memoData.loads[i].unloading_cost;
              xval = 580;
              break;
            default:
              printable = "";
          }
          firstPage.drawText(printable, {
            x: xval,
            y: yval,
            size: 10,
          });
        }
        yval -= 16;
      }
      firstPage.drawText(memoData.total_rent, {
        //Total rent
        x: 368,
        y: yval,
        size: 10,
      });
      firstPage.drawText(memoData.total_commission, {
        // Tota commission
        x: 420,
        y: yval,
        size: 10,
      });
      firstPage.drawText(memoData.total_loading, {
        //total Loading
        x: 500,
        y: yval,
        size: 10,
      });
      firstPage.drawText(memoData.total_unloading, {
        //total unloading
        x: 580,
        y: yval,
        size: 10,
      });
      // ending trip information

      //Other Expense Data
      yval = 470;

      for (i = 0; i < memoData.expense_details.length; i++) {
        firstPage.drawText(memoData.expense_details[i].reason, {
          x: 640,
          y: yval,
          size: 10,
        });
        firstPage.drawText(memoData.expense_details[i].amount, {
          x: 740,
          y: yval,
          size: 10,
        });
        if (i <= 14) yval -= 16;
        else yval -= 17;
      }
      firstPage.drawText("Total", {
        x: 640,
        y: yval,
        size: 12,
      });
      firstPage.drawText(memoData.total_expense, {
        x: 740,
        y: yval,
        size: 12,
      });
      //End of Other expense data

      // printing diesel data
      yval = 307;
      for (i = 0; i < memoData.diesel.length; i++) {
        printable = "";
        d = new Date(memoData.diesel[i].filled_date);
        printable += d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        firstPage.drawText(printable, {
          x: 34,
          y: yval,
          size: 10,
        });
        firstPage.drawText(memoData.diesel[i].litre, {
          x: 95,
          y: yval,
          size: 10,
        });
        firstPage.drawText(memoData.diesel[i].rate, {
          x: 156,
          y: yval,
          size: 10,
        });
        firstPage.drawText(memoData.diesel[i].rate_on_day + "/lit", {
          x: 245,
          y: yval,
          size: 10,
        });
        firstPage.drawText(memoData.diesel[i].place, {
          x: 368,
          y: yval,
          size: 10,
        });
        if (i <= 14) yval -= 16;
        else yval -= 17;
      }
      firstPage.drawText("Total", {
        x: 34,
        y: yval,
        size: 12,
      });
      firstPage.drawText(memoData.total_diesel_litre, {
        x: 95,
        y: yval,
        size: 12,
      });
      firstPage.drawText(memoData.total_diesel_amount, {
        x: 156,
        y: yval,
        size: 12,
      });
      // end of printing diesel data

      // Overall expense printing
      firstPage.drawText(memoData.total_diesel_amount, {
        x: 560,
        y: 307,
        size: 10,
      });
      firstPage.drawText(memoData.total_commission, {
        x: 560,
        y: 290,
        size: 10,
      });

      firstPage.drawText(memoData.total_loading, {
        x: 560,
        y: 275,
        size: 10,
      });

      firstPage.drawText(memoData.total_unloading, {
        x: 560,
        y: 259,
        size: 10,
      });
      firstPage.drawText(memoData.total_expense, {
        x: 560,
        y: 242,
        size: 10,
      });
      firstPage.drawText(memoData.driver_salary, {
        x: 560,
        y: 225,
        size: 10,
      });
      firstPage.drawText(memoData.cleaner_salary, {
        x: 560,
        y: 209,
        size: 10,
      });
      firstPage.drawText(memoData.workshop, {
        x: 560,
        y: 193,
        size: 10,
      });
      firstPage.drawText(memoData.total_rto, {
        x: 560,
        y: 177,
        size: 10,
      });
      firstPage.drawText(memoData.toll_gate, {
        x: 560,
        y: 161,
        size: 10,
      });
      firstPage.drawText(memoData.bill_padi, {
        x: 560,
        y: 129,
        size: 10,
      });
      firstPage.drawText(memoData.pathayam, {
        x: 560,
        y: 113,
        size: 10,
      });
      firstPage.drawText(memoData.trip_expense, {
        x: 560,
        y: 97,
        size: 10,
      });
      firstPage.drawText(memoData.total_rent, {
        x: 560,
        y: 81,
        size: 10,
      });
      firstPage.drawText(memoData.final_balance.hands_on, {
        x: 560,
        y: 65,
        size: 10,
      });
      //end of Overall expense printing

      // printing RTO details
      yval = 500;
      for (i = 0; i < memoData.rto_details.length; i++) {
        secondPage.drawText(memoData.rto_details[i].place, {
          x: 50,
          y: yval,
          size: 12,
        });
        secondPage.drawText(memoData.rto_details[i].amount, {
          x: 190,
          y: yval,
          size: 12,
        });
        if (i < 10) yval -= 16;
        else if (i >= 10 && i < 20) yval -= 15;
        else if (i >= 20 && i < 24) yval -= 17;
        else yval -= 15;
      }
      secondPage.drawText("Total", {
        x: 100,
        y: yval,
        size: 12,
      });
      secondPage.drawText(memoData.total_rto, {
        x: 190,
        y: yval,
        size: 12,
      });

      //printing final balance
      secondPage.drawText("varavu/km : " + memoData.final_balance.income_km, {
        x: 500,
        y: 200,
        size: 13,
      });
      secondPage.drawText("selavu/km : " + memoData.final_balance.expense_km, {
        x: 500,
        y: 180,
        size: 13,
      });
      secondPage.drawText("income/day : " + memoData.final_balance.income_day, {
        x: 500,
        y: 160,
        size: 13,
      });
      //end of printing final balance
      // end of RTO details printing

      // ---------------------------------------
      const pdfBytes = await pdfDoc.save();
      var blob = new Blob([pdfBytes], {
        type: "application/pdf;charset=utf-8",
      });
      console.log(blob);
      saveAs(blob, calc_dates + ".pdf");
    });
  };
  return (
    <div>
      <Container maxWidth="md">
        <Formik
          initialValues={formdata}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Row className={classes.rowStyles}>
                  <Col md={6}>
                    <Paper elevation={3} className={classes.paperStyle}>
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
                            type="text"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <span>&#8377;</span>
                                </InputAdornment>
                              ),
                            }}
                            onBlur={(ev) =>
                              totalExpense(
                                ev,
                                formik.handleBlur,
                                formik.values,
                                formik.setFieldValue
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className={classes.rowStyles}>
                        <Col md>
                          <TextFieldComponent
                            name="cleaner_salary"
                            label="Cleaner salary"
                            type="text"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <span>&#8377;</span>
                                </InputAdornment>
                              ),
                            }}
                            onBlur={(ev) =>
                              totalExpense(
                                ev,
                                formik.handleBlur,
                                formik.values,
                                formik.setFieldValue
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row className={classes.rowStyles}>
                        <Col md>
                          <TextFieldComponent
                            name="pathayam"
                            label="Pathayam"
                            type="text"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <span>&#8377;</span>
                                </InputAdornment>
                              ),
                            }}
                            onBlur={(ev) =>
                              totalExpense(
                                ev,
                                formik.handleBlur,
                                formik.values,
                                formik.setFieldValue
                              )
                            }
                          />
                        </Col>
                      </Row>

                      <Row className={classes.rowStyles}>
                        <Col md>
                          <TextFieldComponent
                            name="workshop"
                            label="workshop"
                            type="text"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <span>&#8377;</span>
                                </InputAdornment>
                              ),
                            }}
                            onBlur={(ev) =>
                              totalExpense(
                                ev,
                                formik.handleBlur,
                                formik.values,
                                formik.setFieldValue
                              )
                            }
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
                            type="text"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <span>&#8377;</span>
                                </InputAdornment>
                              ),
                            }}
                            onBlur={(ev) =>
                              totalExpense(
                                ev,
                                formik.handleBlur,
                                formik.values,
                                formik.setFieldValue
                              )
                            }
                          />
                        </Col>
                      </Row>

                      <Row className={classes.rowStyles}>
                        <Col md>
                          <TextFieldComponent
                            name="bill_padi"
                            label="Bill Padi"
                            type="text"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <span>&#8377;</span>
                                </InputAdornment>
                              ),
                            }}
                            onBlur={(ev) =>
                              totalExpense(
                                ev,
                                formik.handleBlur,
                                formik.values,
                                formik.setFieldValue
                              )
                            }
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

                  <Col md={6} style={{ padding: "10px" }}>
                    <Row className={classes.rowStyles}>
                      <Col md>
                        Trip Expense : <span>&#8377;</span>{" "}
                        {formik.values.trip_expense}
                      </Col>
                    </Row>
                    <Row className={classes.rowStyles}>
                      <Col>
                        Total Collection : <span>&#8377;</span>{" "}
                        {formik.values.total_rent}
                      </Col>
                    </Row>
                    <Row className={classes.rowStyles}>
                      <Col>
                        Trip Duration : {formik.values.trip_duration} Day(s)
                      </Col>
                    </Row>
                    <Divider variant="middle" />
                    <Row
                      className={classes.rowStyles}
                      style={{ textAlign: "center" }}
                    >
                      <Col>
                        <Typography variant="h5" color="secondary">
                          <b>
                            On Hand Amount : <span>&#8377;</span>{" "}
                            {formik.values.final_balance.hands_on}
                          </b>
                        </Typography>
                      </Col>
                    </Row>
                    <Divider variant="middle" />
                    <Row className={classes.rowStyles}>
                      <Col style={{ color: "#27ae60", textAlign: "center" }}>
                        Income/day : <span>&#8377;</span>{" "}
                        {formik.values.final_balance.income_day}
                      </Col>
                    </Row>
                    <Row className={classes.rowStyles}>
                      <Col style={{ color: "#e67e22", textAlign: "center" }}>
                        Income/km : <span>&#8377;</span>{" "}
                        {formik.values.final_balance.income_km}
                      </Col>
                    </Row>
                    <Row className={classes.rowStyles}>
                      <Col style={{ color: "#8e44ad", textAlign: "center" }}>
                        Expense/km : <span>&#8377;</span>{" "}
                        {formik.values.final_balance.expense_km}
                      </Col>
                    </Row>
                    <Row className={classes.rowStyles}>
                      <Col style={{ textAlign: "center", padding : '5px' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            finalAmountCalc(formik.values, formik.setFieldValue)
                          }
                        >
                          Finish
                        </Button>
                        <Col style={{ textAlign: "center", padding : '5px' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => getPDFfunction(formik.values)}
                            disabled = { Boolean(previewstate) }
                          >
                            Preview Memo
                          </Button>
                        </Col>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Divider variant="middle" />
                <Row style={{ marginBottom: "10px" }}>
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
                      <SaveIcon fontSize="small" style={{ margin: "5px" }} />
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
