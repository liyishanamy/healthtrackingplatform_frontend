import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TestDone from "./TestDoneTile";
import TestResult from "./TestResultTile"
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TestNote from "./testNote";
function TabPanel(props) {
    console.log("props",props)
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SpecificAppointment(props) {
    console.log(props)
    const classes = useStyles();
    const [patientEmail,setPatientEmail]=useState(props.match.params.email)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root} style={{padding:"100px"}}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" href='/dashboard/doctor#manage_appointment' >
                    Appointment
                </Link>
                <Typography color="textPrimary">{patientEmail}</Typography>
            </Breadcrumbs>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Test Done" {...a11yProps(0)} />
                    <Tab label="Test Result" {...a11yProps(1)} />
                    <Tab label="Extra Information" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Test Done
                <TestDone patientEmail={patientEmail}/>

            </TabPanel>
            <TabPanel value={value} index={1}>
                Test Result
                <TestResult patientEmail={patientEmail}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Extra Information
                <TestNote patientEmail={patientEmail}/>
            </TabPanel>
        </div>
    );
}
