
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, {Component} from 'react';
import ReferenceLine from "recharts/lib/cartesian/ReferenceLine";
import {CardHeader, Divider, Grid, IconButton} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import CardContent from "@material-ui/core/CardContent";
import {errorHandling} from "../../errorHandling";

class TestResultStats extends Component {
    constructor(props) {
        super(props);
        this.state={
            userTemp:[],
            patientEmail:props.patientEmail
        }
    }
    componentDidMount() {
        const data = {
            email:this.state.patientEmail
        }
        fetch("http://localhost:3000/healthStatus/temperature/", {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                if(data.message!=="the token is invalid"){
                    var formateDate =[];
                    for(var i=0;i<data.length;i++){
                        let date =new Date(data[i]['Date'])
                        formateDate = formateDate.concat({temperature:data[i]['temperature'],Date:(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate())})

                    }
                    this.setState({
                        userTemp:formateDate
                    })

                }else{
                    throw data
                }

            }).catch( e=> errorHandling(e) );


    }
    render() {
        const data = this.state.userTemp


        return (
            <div>

                <card>
                    <CardHeader
                        action={
                            <IconButton size="small">
                                <RefreshIcon />
                            </IconButton>
                        }
                        title="My daily temperature"
                    />
                    <Divider />
                    <CardContent>

                        <div>

                        </div>
                    </CardContent>
                </card>
                <br/>



            </div>
        );
    }
}

export default TestResultStats;
