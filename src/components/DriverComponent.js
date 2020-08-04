import React, { useEffect, useState } from 'react'
import AddDriverComponent from './AddDriverComponent'
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Axios from 'axios'
import { Paper, Button, IconButton, Container, Card, CardContent, Typography } from '@material-ui/core';

import { changeDriverState } from '../redux/index'

const apiOrigin  = "http://localhost:3001";
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
    alignItemsAndJustifyContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
  });
function DriverComponent(props) {
    const classes = useStyles()
    const [drivers, setDrivers] = useState([])
    const { addToast } = useToasts()

    useEffect(() => {
        Axios.get(`${apiOrigin}/drivers`)
        .then(result => {
            console.log(result)
            setDrivers(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const deletItem = (e) => {
        console.log(e.target.id);
        Axios.delete(`${apiOrigin}/drivers/deletedriver`, {data : {id : e.target.id}})
        .then(response => {
            console.log(response)
            addToast( response.data.msg , { appearance : 'success',autoDismiss: true })
        })
        .catch(err => {
            addToast( "Action Failed" , { appearance : 'error',autoDismiss: true })
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
                            <Paper elevation={10} style={{maxHeight:600, overflowY:"auto", overflowX:"hidden", padding:"25px"}} >
                                <Grid container spacing={2} style={{padding: '5px'}}>
                                {
                                    drivers.map(driver => 
                                        <Grid className = {classes.root} key={driver.license} item xs={12} sm={6} md={4} lg={4} xl={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography className={classes.title} style={{display: 'flex',alignItems: 'center'}}>
                                                        <PersonIcon style={{paddingRight:"10px"}} /> { driver.drivername }
                                                    </Typography>

                                                    <Typography className = {classes.subtitle} style={{display: 'flex',alignItems: 'center'}} >
                                                        <ConfirmationNumberIcon style={{paddingRight:"10px"}} /> { driver.license }
                                                    </Typography>

                                                    <Typography className = {classes.address} style={{display: 'flex',alignItems: 'center'}}>
                                                        <ImportContactsIcon style={{paddingRight:"10px"}} /> { driver.address }
                                                    </Typography>

                                                    <Typography className = {classes.phone} style={{display: 'flex',alignItems: 'center'}}>
                                                        <WhatsAppIcon style={{paddingRight:"10px"}} /> {driver.phone}
                                                    </Typography>    
                                                        
                                                    <input 
                                                        type="button" 
                                                        style={{background:"none", border:"none", cursor:"pointer"}} 
                                                        value="Delete" 
                                                        id = {driver.license} 
                                                        onClick={deletItem}/>
                                                
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