import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const columns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'age', label: 'Age', minWidth: 50},
    {
        id: 'Phone',
        label: 'Phone',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Email',
        label: 'Email',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'totalIllDays',
        label: 'TotalIllDays',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Details',
        label: 'Details',
        minWidth: 100,
        align: "right",
        format: value => {
            console.log(value)
            return usersList(value)
        }
    }

];


function usersList(email) {
    return <div key={email} ><Link to={`/patientHealthStatus/${email}`}>See
        Details</Link></div>
}

function createData(name, age, Phone, Email, CreatedDate, Details) {
    const illDays = new Date().getTime() - new Date(CreatedDate).getTime();
    const totalIllDays = Math.floor(illDays / (1000 * 60 * 60 * 24))
    console.log(Details)

    return {name, age, Phone, totalIllDays, Email, Details};
}


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function PatientList() {


    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const fetchData = async (page, rowsPerPage) => {
            fetch(`http://localhost:3000/users?page=` + page + `&limit=` + rowsPerPage, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + (localStorage.getItem("accessToken"))
                },
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    for (var i = 0; i < data.length; i++) {
                        console.log(i, data[i])
                        setRows(rows => [...rows,
                            createData(data[i]['firstname'] + data[i]['lastname'], data[i]['age'], data[i]['phone'], data[i]['email'], data[i]['createdDate'], data[i]['email'])
                        ]);
                    }
                    console.log("after", rows)
                    console.log(page, rowsPerPage)
                })
        }

        fetchData()


    }, [page, rowsPerPage])

    return (
        <div>
            <div>patientsList:</div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Email}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            console.log(column.id, value)
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />


            </Paper>
        </div>
    )
}
