import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {errorHandling} from "../../errorHandling";
class TestResult extends Component {
    constructor(props) {
        super(props);
        this.state={
            testResult:"",
            testNote:""
        }
    }

    componentDidMount() {
        const data = {
            email:localStorage.getItem("email")
        }
        fetch('http://localhost:3000/appointment/myAppointment',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data),

        })
            .then(response => response.json())
            .then(data => {
                if(data.message==="You do not have a booked appointment yet."){
                    this.setState({
                        testResult:data.message
                    })
                }else if(data.message==="the token is invalid"){
                    throw data
                }
                else{
                    this.setState({
                        testResult:data[0]['testResult'],
                        testNote:data[0]['testNote']
                    })
                }


            }).catch( e=> errorHandling(e) );
    }

    render() {
        return (

            <Card  variant="outlined" >
                <CardContent >
                    <Typography  color="textSecondary" gutterBottom>
                        See My Test Result
                    </Typography>

                    <Typography variant="body2" component="p">
                        <strong>Test Result: </strong>{this.state.testResult}


                    </Typography>
                    <Typography variant="body2" component="p">
                        <strong>Test Note from doctor: </strong>{this.state.testNote}


                    </Typography>
                </CardContent>


            </Card>



        );
    }
}

export default TestResult;