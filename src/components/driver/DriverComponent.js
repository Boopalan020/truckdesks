import React, { useEffect, useState } from 'react'
import AddDriverComponent from './AddDriverComponent'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { connect } from 'react-redux'
import toast from 'toasted-notes' 
import Alert from '@material-ui/lab/Alert'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import Grid from '@material-ui/core/Grid'
import Axios from 'axios'
import { Paper, Button, Container, TextField, Card, CardContent, Typography } from '@material-ui/core'

import { Formik, Form, Field, ErrorMessage } from "formik"
import { Row, Col, FormGroup } from "react-bootstrap"
import * as yup from "yup"

import { changeDriverState } from '../../redux/index'

// const apiOrigin = "https://truckdesks.herokuapp.com"
const apiOrigin  = "http://localhost:3001"
const useStyles = makeStyles({
    root: {
      minWidth: 250,
      maxWidth: 345,
    },
    title: {
      marginBottom: 5,
      fontSize: 17,
      color : '#3f51b5'
    },
    paperStyle : {
        maxHeight:600, 
        overflowY:"auto", 
        overflowX:"hidden", 
        padding:"25px"
    },
    subtitle : {
        color : '#616161',
        fontSize : 13,
        display: 'flex',
        alignItems: 'center'
    },
    address : {
        color:"#5d4037",
        padding : 5,
        display: 'flex',
        alignItems: 'center'
    },
    phone : {
        color:"#2e7d32",
        padding : 5,
        display: 'flex',
        alignItems: 'center'
    },
    age : {
        color : "#ff5722",
        padding : 5,
        display : 'flex',
        alignItems : 'center'
    },
    alignItemsAndJustifyContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
  });
function DriverComponent(props) {
    const classes = useStyles()
    const [drivers, setDrivers] = useState([])
    const [length, setLength] = useState(0)

    // For dialog box
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    // formvalues
    const [form, setForm] = useState({})
  
    // To open Dialog box
    const handleClickOpen = (scrollType)=> {
      setOpen(true);
      setScroll(scrollType);
    };
  
    // To cloase dialog box
    const handleClose = () => {
      setOpen(false);
    };

    // To fetch driver details
    useEffect(() => {
        function FetchDriver() {
            Axios.get(`${apiOrigin}/drivers`)
            .then(result => {
                // console.log(result)
                if(result.data.length === 0)
                {
                    toast.notify(
                        <Alert size="small" severity="warning">
                          No drivers found
                        </Alert>,
                        {
                          position : "top",
                          duration : "4000"
                        }
                      )
                }
                else{
                    setDrivers(result.data)
                    setLength(result.data.length)
                }
            })
            .catch(err => {
                toast.notify(
                    <Alert size="small" severity="error">
                      No network
                    </Alert>,
                    {
                      position : "top",
                      duration : "4000"
                    }
                  )
                console.log(err)
            })
        }
        FetchDriver()
    }, [props.showview, length])

    const editDriver = (e, id) => {
        // console.log(id)
        Axios.get(`${apiOrigin}/drivers/editdriver/${id}`)
        .then(res => {
            // console.log(res.data)
            setForm(res.data)
            handleClickOpen('paper')
        })
        .catch(err => {
            toast.notify(
                <Alert size="small" severity="error">
                  No network
                </Alert>,
                {
                  position : "top",
                  duration : "4000"
                }
              )
            console.log(err)
        })
    }

    const deletItem = (e) => {
        // console.log(e.target.id);
        Axios.delete(`${apiOrigin}/drivers/deletedriver`, {data : {id : e.target.id}})
        .then(response => {
            if(response)
            {
                toast.notify(
                    <Alert size="small" severity="success">
                      {response.data.msg }
                    </Alert>,
                    {
                      position : "top",
                      duration : "4000"
                    }
                  )
                setLength(length-1)
            }
            
        })
        .catch(err => {
            toast.notify(
                    <Alert size="small" severity="error">
                      Action Failed
                    </Alert>,
                    {
                      position : "top",
                      duration : "4000"
                    }
                  )
        })
    }

    return (
        <div>
            {
                props.showview && (
                    <Container maxWidth ="md">
                        <div className={classes.alignItemsAndJustifyContent} style={{padding:"10px", fontSize:"24px"}}>
                            Driver List 
                        </div>
                        <div >
                            <Paper elevation={3} className={classes.paperStyle} >
                                {
                                    length === 0 ? 
                                    <Row>
                                        <Col sm style={{textAlign : "center"}} >
                                            No records found
                                        </Col>
                                    </Row> :
                                    null
                                }
                                
                                <Grid container spacing={2} style={{padding: '5px'}}>
                                {
                                    drivers.map(driver => 
                                        <Grid className = {classes.root} key={driver.license} item xs={12} sm={6} md={6} lg={6} xl={6}>
                                            <Card>
                                                <CardContent>
                                                    <Row>
                                                        <Col sm={7}>
                                                            <Typography className={classes.title} style={{display: 'flex',alignItems: 'center'}}>
                                                                <PersonIcon fontSize = "small" style={{paddingRight : "3px"}} /> { driver.drivername }
                                                            </Typography>
                                                        </Col>
                                                        <Col sm = {5}>
                                                            <Typography className={classes.title} style={{display: 'flex',alignItems: 'center'}}>
                                                                Blood : { driver.blood }
                                                            </Typography>
                                                        </Col>
                                                    </Row>

                                                    <Typography className = {classes.subtitle} style={{display: 'flex',alignItems: 'center'}} >
                                                        Liscense.no : { driver.license }
                                                    </Typography>

                                                    <Typography className = {classes.age} style={{display: 'flex',alignItems: 'center'}}>
                                                        Age : {driver.age}
                                                    </Typography>

                                                    <Typography className = {classes.address} style={{display: 'flex',alignItems: 'center'}}>
                                                        Address :  { driver.address }
                                                    </Typography>

                                                    <Typography className = {classes.phone} style={{display: 'flex',alignItems: 'center'}}>
                                                        Mobile : {driver.phone}
                                                    </Typography>       
                                                    
                                                    <Row>
                                                        <Col sm = {6}>
                                                            <EditIcon fontSize="small" />
                                                            <input 
                                                                type="button" 
                                                                style={{background:"none", border:"none", cursor:"pointer"}} 
                                                                value="Edit" 
                                                                onClick = { e => editDriver(e, driver._id) }
                                                                id = {driver.license} 
                                                            />
                                                            
                                                            {/* Dialog box */}
                                                            <MaterialDialog 
                                                                open = { open }
                                                                scroll = { scroll }
                                                                handleClose = { handleClose }
                                                                driver = { form }
                                                            />
                                                        </Col>
                                                        <Col sm = {6}>
                                                            <DeleteIcon fontSize = "small" />
                                                            <input 
                                                                type="button" 
                                                                style={{background:"none", border:"none", cursor:"pointer"}} 
                                                                value="Delete" 
                                                                id = {driver.license} 
                                                                onClick={deletItem}
                                                            />
                                                        </Col>
                                                    </Row>
                                                
                                                </CardContent>
                                            </Card>
                                    </Grid>
                                    )
                                }
                                </Grid>
                            </Paper>
                            <Button 
                                variant="contained" 
                                startIcon={ <PersonAddIcon/> } 
                                color="primary" 
                                onClick={props.changeDriverState}
                                style={{margin:20}}
                                >
                                New driver
                            </Button>
                        </div >
                    </Container>
                )
            }
            {
                props.showform && (
                    <div>
                        <AddDriverComponent/>
                    </div>
                )
            }
        </div>
    )
}

function MaterialDialog(props) {

    //FORM VALIDATION USING YUP PACKAGE
    const validationSchema = yup.object({
        address: yup.string().required("Required"),
        phone: yup
        .string()
        .matches(/^\d{10}$/i, "10 - Digit Number")
        .required("Required"),
        insure_no : yup.string().required("Required")
    });

    const onSubmit = (values) => {
        // console.log(values)
        Axios.post(`${apiOrigin}/drivers/updatedriver`, values)
        .then(response => {
            // console.log(response)
            if(response.status === 200)
            {
                toast.notify(
                    <Alert size="small" severity="success">
                        {response.data.msg }
                    </Alert>,
                    {
                        position : "top",
                        duration : "4000"
                    }
                )
                props.handleClose()
            }
            else toast.notify(
                <Alert size="small" severity="warning">
                    Something went wrong
                </Alert>,
                {
                    position : "top",
                    duration : "4000"
                }
            )
        })
        .catch(err => {
            toast.notify(
                <Alert size="small" severity="error">
                    Network error
                </Alert>,
                {
                    position : "top",
                    duration : "4000"
                }
            )
            console.log(err)
        })
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            scroll={props.scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title"> Edit </DialogTitle>
            <DialogContent dividers={props.scroll === 'paper'}>
                <Formik
                    initialValues = { props.driver }
                    validationSchema = { validationSchema }
                    onSubmit = { onSubmit }
                >
                    <Form noValidate>
                        {/* Driver Address */}
                        <Row style={{padding:"10px"}}>
                            <Col sm >
                                <FormGroup>
                                    <Field name="address">
                                    {(fprops) => {
                                        const { field, meta} = fprops
                                        return ( 
                                        <FormGroup>
                                            <TextField 
                                                name="address" 
                                                size="small" 
                                                label="Address" 
                                                variant="outlined" {...field} 
                                                error = {Boolean(meta.touched && meta.error)} 
                                                helperText ={<ErrorMessage name = "address"></ErrorMessage>} 
                                            />
                                        </FormGroup>)
                                    }}
                                    </Field>    
                                </FormGroup>
                            </Col>
                        </Row>

                        {/* Driver Phone number */}
                        <Row style={{padding:"10px"}}>
                            <Col sm >
                                <Field name="phone">
                                {
                                    (props)=>{
                                        const {field, meta} = props
                                        return (
                                        <FormGroup>
                                            <TextField 
                                                name="phone" 
                                                size="small" 
                                                label="Phone.no" 
                                                variant="outlined" {...field} 
                                                error = {Boolean(meta.touched && meta.error)} 
                                                helperText ={<ErrorMessage name = "phone"></ErrorMessage>} 
                                            />
                                        </FormGroup>
                                        )
                                    }
                                }
                                </Field>
                            </Col>
                        </Row>

                        {/* Driver Insuranse number */}
                        <Row style = {{padding : "10px"}}>
                            <Col sm>
                                <Field name = "insure_no">
                                {
                                    (props) => {
                                        const { field, meta } = props
                                        return (
                                            <FormGroup>
                                                <TextField 
                                                    label = "Driver Insurance"
                                                    variant = "outlined" 
                                                    name = "insure_no"
                                                    size = "small" {...field}
                                                    error = {Boolean(meta.touched && meta.error)} 
                                                    helperText ={<ErrorMessage name = "insure_no" />} 
                                                />
                                            </FormGroup>
                                        )
                                    }
                                }
                                </Field>
                            </Col>
                        </Row>

                        <Row style={{padding:"10px"}}>
                            <Col >
                                <Button 
                                    type = "submit" 
                                    variant="outlined" 
                                    color="primary"
                                    >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Formik>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = (state) => {
    return {
        showview : state.driver.showview,
        showform : state.driver.showform
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        changeDriverState : () => dispatch(changeDriverState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DriverComponent)