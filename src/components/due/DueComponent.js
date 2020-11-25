import React, { useState, useEffect } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Axios from 'axios'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import toast from 'toasted-notes' 
import Alert from '@material-ui/lab/Alert'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const useStyles = makeStyles( (theme) =>({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 510,
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
  }));

const apiOrigin  = "http://localhost:3001";
function DueComponent(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [vehicles, setvehicles] = useState([])
    const [checks, setChecks] = useState([])
    const [due, setDue] = useState(0)
    const [month, setMonth] = useState(0)
    const [paid, setPaid] = useState(0)
    const [unpaid, setUnpaid] = useState(0)
    const [id, setId] = useState('')

    // On mounting component
    useEffect(() => {
        function GetVehicleCard()
        {
            Axios.get(`${apiOrigin}/vehicle/getvehicles`)
            .then(vehicles => {
                setvehicles(vehicles.data)
                // console.log(vehicles)
            })
            .catch(err => {
                console.log(err)            // Set one error alert (Network error)
            })
        }
        GetVehicleCard()
    }, [])

    // Submitting the due table
    const submitDueTable = () => {
        Axios.post(`${apiOrigin}/vehicle/saveduetable`, {
            id : id,
            completed_months : paid,
            dues : checks
        })
        .then(fres => {
            // console.log(fres)
            if(fres.status === 200)
            {
                toast.notify(
                    <Alert size="small" severity="success">
                      { fres.data.msg }
                    </Alert>,
                    {
                      position : "top",
                      duration : "4000"
                    }
                  )
            }
        })
        .catch(err => {
            console.log(err)
            toast.notify
            (
                <Alert size="small" severity="error">
                    Network Error
                </Alert>,
                {
                    position : "top",
                    duration : "4000"
                }
            )
        })
    }

    // Toggling the Accordion component 
    const handleExpandChange = (panel, vid) => (event, isExpanded) => {
        if(isExpanded === true)
        {
            Axios.get(`${apiOrigin}/vehicle/getbyid/${vid}`)
            .then(due => {
                setDue(due.data.total_due_amount)
                setMonth(due.data.total_months)
                setPaid(parseInt(due.data.completed_month))
                setUnpaid(due.data.dues.length - due.data.completed_month)
                setChecks(due.data.dues)
                setId(due.data._id)
                // console.log(due.data)
            })
            .catch(err => {
                console.log(err)
            })
            setExpanded(isExpanded ? panel : false);
        }
        else
        {
            setDue(0)
            setMonth(0)
            setPaid(0)
            setUnpaid(0)
            setChecks([])
            setId('')
        }
      };

    // Changing Page of the table
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    // Assigning rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // Toggling check box
    const handleChanges = (event, id) => {
        let newArr = checks.map((item) => {
            if (id === item.due_date) {
                if(event.target.checked === true)
                {
                    setPaid(paid + 1)
                    setUnpaid(unpaid - 1)
                }
                else
                {
                    setPaid(paid - 1)
                    setUnpaid(unpaid + 1)
                }
              return { ...item, 'status': event.target.checked };
            } else {
              return item;
            }
          });
          setChecks(newArr)
        //   console.log(newArr)
      }
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
                        <Typography className={classes.heading}>{ vdet.vehicle_no } </Typography>
                        <Typography className={classes.secondaryHeading}> { vdet.basic_info.chasis_no } </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper className = { classes.root}>
                                <TableContainer className = { classes.container}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align = "right">
                                                    Due : { due }
                                                </TableCell>

                                                <TableCell align = "right">
                                                    Duration : { month } month(s)
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </TableContainer>

                                <TableContainer className = { classes.container }>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align = "right" style = {{minWidth : 170}}>
                                                    Date
                                                </TableCell>
                                                <TableCell align = "right" style = {{minWidth : 170}}>
                                                    Current Amount
                                                </TableCell>
                                                <TableCell align = "right" style = {{minWidth : 170}}>
                                                    Status
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {
                                            checks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map( (chk, index) => {
                                                return (
                                                    <TableRow hover role = "checkbox" tabIndex = {-1} key = { index } >
                                                        <TableCell align = "right">
                                                            <MUICheck handleChanges = { handleChanges } isChecked = { chk.status } name = { chk.avl_due_amnt } id = { chk.due_date } /> 
                                                        </TableCell>
                                                        <TableCell align = "right">
                                                            { chk.avl_due_amnt }
                                                        </TableCell>
                                                        <TableCell align = "right">
                                                        {
                                                            chk.status === true ? <div style={{color : "green"}}> <b>Paid</b></div> : <div style={{color : "red"}}><b>Not Paid</b></div>
                                                        }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                        </TableBody>
                                        
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10]}
                                    component="div"
                                    count={checks.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                                <TableContainer className = { classes.container}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align = "right">
                                                    <div style={{color : "green"}}> <b>Paid Month(s) : { paid }</b></div>
                                                </TableCell>

                                                <TableCell align = "right">
                                                    <div style={{color : "red"}}> <b>Unpaid Month(s) : { unpaid }</b></div>
                                                </TableCell>
                                                <TableCell align = "center">
                                                    <Button 
                                                        variant="contained" 
                                                        color="primary" 
                                                        onClick={ submitDueTable }
                                                        style={{margin:20}}
                                                        >
                                                        Save
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </AccordionDetails>
                    </Accordion>
                )
            }
        </div>
    )
}

function MUICheck(props){
    return(
        <div>
            <FormControlLabel
                control={
                    <Checkbox 
                        checked={props.isChecked} 
                        onClick={e => props.handleChanges(e, props.id)}
                        value = { props.name }
                        color = "primary"
                        disabled = { props.isChecked ? true : false }
                        inputProps = {{ 'aria-label' : 'primary checkbox' }} 
                    />
                }
                label= { props.id }
            />
            {/* <Checkbox
                checked = {  }
                onClick = {  }
                value = { props.name }
                color = "primary"
                disabled = { props.isChecked ? true : false }
                inputProps={{ 'aria-label': 'primary checkbox' }}
            /> */}
        </div>
    )
}

export default DueComponent