import React from 'react';
import ReactDOM from 'react-dom';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import {BrowserRouter as Router, BrowserRouter, Link, Route, Switch} from "react-router-dom";
import LoginPage from "./loginPage/loginPage";
import SignupPage from "./signupProcess/signupPage";
import DoctorDashboard from "./doctor/doctorDashboard";
import PatientDashboard from './patient/patientDashboard';
import SetSecurityQuestions from './signupProcess/setSecurityQuestions';
import ForgetPasswordPage from './resetPassword/forgetPasswordPage';
import AuthenticateUser from './resetPassword/authenticateUser';
import UserProfile from './profile/userProfile';
import PatientList from './doctor/patientList';
import HealthStatus from './patient/healthStatus';
import MyStats from './patient/myStats'
import PatientChatbox from "./patient/patientChatbox";
import PatientHealthStatus from "./doctor/patientPanel"
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import ViewAppointment from './patient/Appointment/viewAppointment';
import TestResult from './patient/Appointment/testResult'
import theme from "./theme";
import PatientAppointment from "./patient/patientAppointment";
import SpecificAppointment from "./doctor/AppointmentComponents/SpecificAppointment";
import Heatmap from "./doctor/mapVisualization/heatmap"
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {isLoggedInOptions, setLogin} from "./login_Actions";
import loginReducer from "./login_Reducers/reducers";
import Privacy from './profile/privacy'
import LoginHeader from './headers/loginHeader'
import LogoutHeader from './headers/logoutHeader'
import {connect} from "react-redux";
import Chatbox from './components/Layout'

import {Component} from 'react';
import store from "./store/store";
import DatePicker from "react-date-picker";
import ErrorBoundary from "./ErrorBoundary";
class App extends Component {
    constructor(props) {
        super(props);
        var initialState = localStorage.getItem("loggedIn")
        if(!initialState){
            props.dispatch(setLogin("LOGOUT"))
        }else {props.dispatch(setLogin(initialState))}
        this.state={
            status:props.isLoggedIn
        }
    }

    componentDidMount() {
        // it remembers to subscribe to the store so it doesn't miss updates
        this.unsubscribe = store.subscribe(this.handleChange.bind(this))
    }

    componentWillUnmount() {
        // and unsubscribe later
        this.unsubscribe()
    }

    handleChange() {
        // and whenever the store state changes, it re-renders.
        this.forceUpdate()
    }


    render() {
        let head;
        console.log("rerender",store.getState()["loginReducer"])
        if(store.getState()["loginReducer"]==="LOGIN"){
            head=<LoginHeader/>
        }else if(store.getState()["loginReducer"]==="LOGOUT"){
            head=<LogoutHeader/>
        }else if(store.getState()["loginReducer"]==="SIGNUP"){
            head =null
        }
        return (
            <ErrorBoundary>
            <ThemeProvider theme={theme}>

                <BrowserRouter>

                    <div className="auth-wrapper">


                        {head}
                        <div className="auth-inner">
                            <Switch>
                                <Route exact path='/' component={LoginPage}/>
                                <Route path="/sign-in" component={LoginPage}/>
                                <Route path="/sign-up" component={SignupPage}/>
                                <Route path="/dashboard/doctor" component={DoctorDashboard}/>
                                <Route path="/dashboard/patient" component={PatientDashboard}/>
                                <Route path="/setSecurityQuestions" component={SetSecurityQuestions}/>
                                <Route path="/logout" component={LoginPage}/>
                                <Route path="/resetPassword" component={ForgetPasswordPage}/>
                                <Route path='/authenticate' component={AuthenticateUser}/>
                                <Route path='/userProfile' component={UserProfile}/>
                                <Route path='/privacy' component={Privacy}/>
                                <Route path="/patientList" component={PatientList}/>
                                <Route path='/healthStatus' component={HealthStatus}/>
                                <Route path='/myStats' component={MyStats}/>
                                <Route path='/patientChatbox/:email' component={Chatbox}/>
                                <Route path='/userProfile' component={UserProfile}/>
                                <Route path='/patientHealthStatus/:email' component={PatientHealthStatus}/>
                                <Route path='/updateResult/:email' component={SpecificAppointment}/>
                                <Route path='/bookAppointment' component={PatientAppointment}/>
                                <Route path='/viewAppointment' component={ViewAppointment}/>
                                <Route path='/viewTestResult' component={TestResult}/>
                                <Route path='/viewHeatmap' component={Heatmap}/>
                            </Switch>

                        </div>
                    </div>

                </BrowserRouter>

            </ThemeProvider>
            </ErrorBoundary>
        );
    }
}


const mapStateToProps = state => {
    return {isLoggedIn: state}
}




const APP = connect(mapStateToProps)(App)

export default APP;
