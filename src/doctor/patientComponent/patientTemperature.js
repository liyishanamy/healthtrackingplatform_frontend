
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, {Component} from 'react';
import ReferenceLine from "recharts/lib/cartesian/ReferenceLine";
import {CardHeader, Divider, Grid, IconButton,Card} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import CardContent from "@material-ui/core/CardContent";
import {errorHandling} from "../../errorHandling";

class PatientTemperature extends Component {
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

                <Card>
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
                            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="Date" />
                                <ReferenceLine y="37" stroke="red" label={{ position: 'top',  value: 'Abnormal', fill: 'red', fontSize: 14 }}/>
                                <YAxis domain={[dataMin=>35, dataMax => 40]}/>
                                <Tooltip />
                            </LineChart>
                        </div>
                    </CardContent>
                </Card>
                <br/>



            </div>
        );
    }
}

export default PatientTemperature;
