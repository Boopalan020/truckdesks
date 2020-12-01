import React, { useEffect, useState } from 'react'
import { BarChart } from 'react-chartkick'   // React - ChartKick is fixed
import 'chart.js'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Chip, Grid, Paper, TextField } from '@material-ui/core'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Row, Col, FormGroup } from 'react-bootstrap'
import InputIcon from '@material-ui/icons/Input'

import { Formik, Form, Field, ErrorMessage } from "formik"
import YearComponent from './YearComponent'
import VisibilityIcon from '@material-ui/icons/Visibility'
import AddIcon from '@material-ui/icons/Add'
import MenuComponent from "./MenuComponent"
import FinalCalComponent from './FinalCalComponent'

import { numberFormat } from '../moneyFunction'

const apiOrigin = "https://truckdesks.herokuapp.com"
// const apiOrigin  = "http://localhost:3001"
const useStyles = makeStyles((theme) => ({
    paperStyle : {
        maxHeight:600,
        maxWidth : 3000,
        minHeight : 250,
        overflowY:"auto", 
        overflowX:"auto", 
        padding:"25px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
}))
function DashboardComponent(props) {

    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false);
    const [vehicles, setVehicles] = useState([])
    const [chartdata, setChartdata] = useState([])
    const [errordata, setErrordata] = useState(false)
    const [years, setYears] = useState([])
    const [yearDiv, setYearDiv] = useState(false)
    const [yearData, setYearData] = useState({})
    const [memoid, setMemoid] = useState("")
    const [decide, setDecide] = useState()
    const [yearhand, setYearhand] = useState(0)
    const [yearexpense, setYearexpense] = useState(0)
    const [uptonow, setUptonow] = useState(0)
    
    // For dialog box
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper')

    // States for dialog components
    const [yeardialog, setYeardialog] = useState([])
    
    const initialValues = {
        year : ''
    }

    // API call to Specified year Memos and Yearly details
    const onSubmit = (values, vid) => {
        // console.log("values : ", values)
        // console.log("Vehicle ID : ", vid)

        Axios.get(`${apiOrigin}/dashboard/get/${vid}/${values.year}`)
        .then(yeares => {
            // console.log(yeares)

            if(yeares.data.memos.length === 0)
            {
                setErrordata(true)
                setYearDiv(false)

                setYearhand(0)
                setYearexpense(0)
            }
            else
            {
                setErrordata(false)
                setChartdata(yeares.data.memos)
                setYearDiv(true)
                setYearData(yeares.data.year_det)
                
                // For finalised data
                setYearhand(yeares.data.hand_on)
                setYearexpense(yeares.data.t_exp)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    // Gets the vehicle data to render vehicle components
    useEffect(() => {
        function FetchMonthDetail() {
            Axios.get(`${apiOrigin}/vehicle/getvehicles`)
            .then(vehicles => {
                setVehicles(vehicles.data)
                // console.log(vehicles)
            })
            .catch(err => {
                console.log(err)            // Set one error alert (Network error)
            })
        }
        FetchMonthDetail()
    }, [])

    // To open Dialog box
    const handleClickOpen = (scrollType)=> {
        setOpen(true);
        setScroll(scrollType);
    };
    
    // To cloase dialog box
    const handleDialogClose = () => {
        setOpen(false);
    };

    // On clicking Add and see list button
    const editDriver = async(e, id, decision) => {
        // console.log(id)
        setMemoid(id)
        if(!decision)
        {
            Axios.get(`${apiOrigin}/dashboard/getyearinfo/${id}`)
            .then(yres => {
                if(yres)
                {
                    setYeardialog(yres.data.yearly_Det)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        else{
            setYeardialog([])
        }
        handleClickOpen('paper')
        setDecide(decision)
    }

    // Toggling the Accordion component 
    const handleExpandChange = (panel, vid) => (event, isExpanded) => {
        if(isExpanded === true)
        {
            Axios.get(`${apiOrigin}/dashboard/getmonthdata/${vid}`)
            .then(chartRes => {
                // console.log(chartRes.data)
                if(chartRes.data.flag === true)
                {
                    setErrordata(chartRes.data.flag)
                    setYearDiv(false)
                    setYearhand(0)
                    setYearexpense(0)
                    setYears([])
                }
                else
                {
                    // console.log(chartRes.data.memoarray)
                    setChartdata(chartRes.data.memoarray)
                    setYears(chartRes.data.years)
                    if(chartRes.data.yeardata)
                    {
                        setYearDiv(true)
                        setYearData(chartRes.data.yeardata)
                    }
                    setErrordata(false)
                    setYearhand(chartRes.data.hand_on)
                    setYearexpense(chartRes.data.t_exp)
                    setUptonow(chartRes.data.tillnowBalance)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        else
        {
            setChartdata([])
            setYears([])
            setYearDiv(false)
            setYearData({})
            setUptonow(0)
        }
        setExpanded(isExpanded ? panel : false);
      };

    return (
        <div>
            {
                vehicles.map( (vdet, index) => 
                    <Accordion key = { vdet._id } expanded={expanded === 'panel'+index} onChange={handleExpandChange('panel'+index, vdet._id)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                        <Row style = {{ paddingTop : "30px", paddingBottom : "30px" }} >
                            <Col sm>
                                <Typography className={classes.heading}>{ vdet.vehicle_no } </Typography>
                            </Col>
                        </Row>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper elevation = {3} className = { classes.paperStyle }>
                                <Grid container spacing={2} alignItems = "center" justify = "center" style={{padding: '5px', minHeight: "100vh"}}>
                                    
                                    <Row style = {{ padding : "5px" }}>
                                        <Col md style = {{ textAlign : "right" }} >
                                            <Typography color = "secondary" >
                                                <b>Upto Last Trip : { numberFormat(uptonow) }</b>
                                            </Typography>
                                        </Col>
                                    </Row>

                                    <Row style ={{ padding : "5px" }} >
                                        <Col md>
                                            {/* Formik year component */}
                                            <Formik
                                                initialValues = { initialValues }
                                            >
                                                {(formik) => {
                                                return(
                                                <Form>
                                                    <Row className = { classes.rowStyles }>
                                                        <Col md>
                                                        <Field name = "year">
                                                        {
                                                            (fieldprops) => {
                                                                const { field, meta } = fieldprops
                                                                return (
                                                                    <FormGroup>
                                                                        <TextField 
                                                                            {...field}
                                                                            name = "year"
                                                                            type = "text"
                                                                            select
                                                                            size = 'small'
                                                                            label = "Year"
                                                                            variant = "outlined"
                                                                            SelectProps={{
                                                                                native: true,
                                                                            }}
                                                                            error = { Boolean(meta.touched && meta.error) }
                                                                            helperText = { <ErrorMessage name = "year" /> }
                                                                        >
                                                                            <option value = ""> </option>
                                                                            {
                                                                                years.map(numb => {
                                                                                    return(
                                                                                        <option key={ numb } value={ numb }>
                                                                                        { numb }
                                                                                        </option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </TextField>
                                                                        <Button
                                                                            color = "primary"
                                                                            onClick = { e => onSubmit(formik.values, vdet._id) }
                                                                        >
                                                                            <InputIcon size = "small" />
                                                                        </Button>

                                                                        <Button onClick = { e => editDriver(e, vdet._id, true) } >
                                                                            <AddIcon size = " small" />
                                                                        </Button>
                                                                        <Button onClick = { e => editDriver(e, vdet._id, false) }>
                                                                            <VisibilityIcon size = "small" />
                                                                        </Button>

                                                                        <MenuComponent 
                                                                            open = { open }
                                                                            scroll = { scroll }
                                                                            divDecide = { decide }
                                                                            handleClose = { handleDialogClose }
                                                                            vid = { memoid }
                                                                            dialogdata = { yeardialog }
                                                                        />
                                                                    </FormGroup>
                                                                )
                                                            }
                                                        }
                                                        </Field>

                                                        </Col>
                                                    </Row>
                                                </Form>
                                                )
                                            }}
                                            </Formik>
                                        </Col>
                                    </Row>

                                    { errordata ?
                                        <Row >
                                            <Col md >
                                                <Chip
                                                    label="No Memo found"
                                                    color="secondary"
                                                />
                                            </Col>
                                        </Row>
                                        :
                                        <Row>
                                            <Col md>
                                                <BarChart download = {true} height = "200vh" data={chartdata} />
                                            </Col>
                                        </Row>
                                    }

                                    {
                                        yearDiv 
                                        ?
                                        <div>
                                            <YearComponent yearData = { yearData } />
                                            <FinalCalComponent 
                                                yearData = { yearData }  
                                                yearhandson = { yearhand }
                                                yearexpense = { yearexpense }
                                            />
                                        </div>
                                        : null
                                    }
                                </Grid>
                            </Paper>
                        </AccordionDetails>
                    </Accordion>
                )
            }
        </div>
    )
}

export default DashboardComponent
