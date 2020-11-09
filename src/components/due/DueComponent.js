import React, { useState, useEffect } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 470,
    },
  });

function DueComponent(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [checks, setChecks] = useState([])

    // useEffect(() => {
        
    // }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // const [checks, setChecks] = useState([
    //     { id : "11", name : "January", date : "2020-10-10" , isChecked : false },
    //     { id : "12", name : "February",date : "2020-10-10" , isChecked : false },
    //     { id : "13", name : "March", date : "2020-10-10" , isChecked : false },
    //     { id : "14", name : "April", date : "2020-10-10" , isChecked : false },
    //     { id : "15", name : "May", date : "2020-10-10" , isChecked : false },
    //     { id : "16", name : "June", date : "2020-10-10" , isChecked : false },
    //     { id : "17", name : "July", date : "2020-10-10" , isChecked : false },
    //     { id : "18", name : "August", date : "2020-10-10" , isChecked : false },
    //     { id : "19", name : "September", date : "2020-10-10" , isChecked : false },
    //     { id : "20", name : "October", date : "2020-10-10" , isChecked : false },
    //     { id : "21", name : "November", date : "2020-10-10" , isChecked : false },
    //     { id : "22", name : "December", date : "2020-10-10" , isChecked : false },
    //     { id : "23", name : "Jan 1", date : "2020-10-10" , isChecked : false },
    //     { id : "24", name : "Feb 1", date : "2020-10-10" , isChecked : false },
    // ])
    const handleChanges = (event, id) => {
        let newArr = checks.map((item) => {
            if (id === item.id) {
              return { ...item, 'isChecked': event.target.checked };
            } else {
              return item;
            }
          });
          setChecks(newArr)
          console.log(newArr)
      }
    return (
        <div>


            {/* <Paper className = { classes.root}>
                <TableContainer className = { classes.container }>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align = "right" style = {{minWidth : 170}}>
                                    Check
                                </TableCell>
                                <TableCell align = "right" style = {{minWidth : 170}}>
                                    Date
                                </TableCell>
                                <TableCell align = "right" style = {{minWidth : 170}}>
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            checks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(chk => {
                                return (
                                    <TableRow hover role = "checkbox" tabIndex = {-1} key = { chk.id }>
                                        <TableCell align = "right">
                                            <MUICheck handleChanges = { handleChanges } isChecked = { chk.isChecked } name = { chk.name } id = { chk.id } />
                                        </TableCell>
                                        <TableCell align = "right">
                                            { chk.name }
                                        </TableCell>
                                        <TableCell align = "right">
                                            {
                                                chk.isChecked === true ? <div style={{color : "green"}}> <b>Paid</b></div> : <div style={{color : "red"}}><b>Not Paid</b></div>
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
                    rowsPerPageOptions={[10, 20]}
                    component="div"
                    count={checks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

            </Paper> */}
        </div>
    )
}

function MUICheck(props){
    return(
        <div>
            <Checkbox
                checked = { props.isChecked }
                onClick = { e => props.handleChanges(e, props.id) }
                value = { props.name }
                color = "primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
    )
}

export default DueComponent