import React, { useEffect, useState } from 'react'
import AddDriverComponent from './AddDriverComponent'
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useToasts } from 'react-toast-notifications';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Axios from 'axios'
import { Paper, Button, Container, Card, CardContent, Typography } from '@material-ui/core';

import { changeDriverState } from '../redux/index'
import { Col, Row } from 'react-bootstrap';

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
    const { addToast } = useToasts()

    useEffect(() => {
        function FetchDriver() {
            Axios.get(`${apiOrigin}/drivers`)
            .then(result => {
                setDrivers(result.data)
                setLength(result.data.length)
            })
            .catch(err => {
                console.log(err)
            })
        }
        FetchDriver()
    }, [props.showview, length])

    const deletItem = (e) => {
        console.log(e.target.id);
        Axios.delete(`${apiOrigin}/drivers/deletedriver`, {data : {id : e.target.id}})
        .then(response => {
            if(response)
            {
                addToast( response.data.msg , { appearance : 'success',autoDismiss: true })
                setLength(length-1)
            }
            
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
                            <Paper elevation={5} className={classes.paperStyle} >
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
                                        <Grid className = {classes.root} key={driver.license} item xs={12} sm={6} md={4} lg={4} xl={3}>
                                            <Card>
                                                <CardContent>
                                                    <Row>
                                                        <Col sm={6}>
                                                            <Typography className={classes.title} style={{display: 'flex',alignItems: 'center'}}>
                                                                <PersonIcon fontSize = "small" style={{paddingRight : "3px"}} /> { driver.drivername }
                                                            </Typography>
                                                        </Col>
                                                        <Col sm = {6}>
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
                                                                id = {driver.license} 
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