import React,{Component} from 'react';
import {Link,useHistory} from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserProfile from "../profile/userProfile";
import PatientDashboard from "../patient/patientDashboard";
import PatientList from "./patientList";
import DoctorChatbox from "./doctorChatbox";
import ManageAppointment from './manageAppointment'
import AllStats from './AllStats';
import Layout from "../components/Layout";
import Heatmap from "./mapVisualization/heatmap";
function TabPanel(props) {
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
        padding:100
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="User profile" {...a11yProps(0)} />
                    <Tab label="Patient List" {...a11yProps(1)} />
                    <Tab label="Manage Appointment" {...a11yProps(2)} />
                    <Tab label="All Stats" {...a11yProps(3)} />
                    <Tab label="City Heat Map" {...a11yProps(4)} />
                    <Tab label="Doctor chats" {...a11yProps(5)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <UserProfile/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PatientList/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ManageAppointment/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AllStats/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Heatmap/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Layout/>
            </TabPanel>
        </div>
    );
}


//export default DoctorDashboard;