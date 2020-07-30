import {Link} from "react-router-dom";
import React, {Component} from 'react';
import {connect} from "react-redux";
import {setLogin} from "../login_Actions";

import store from "../store/store"

const mapStateToProps = state => {

    return {isLoggedIn: state}
}
// const mapDispatchToProps = (dispatch,ownProps) =>{
//     dispatch(setLogin(!ownProps.loginOrNot))
//
// }



class LogoutHeader extends Component {
    constructor(props) {
        super(props);
        console.log("initial header",store.getState(), props)
        this.state={
            isLoggedIn:this.props.isLoggedIn
        }

    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">

                <div className="container">

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-in"}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                            </li>
                        </ul>


                    </div>
                </div>
            </nav>
        );
    }
}

// export default LogoutHeader;
// const loggedOutHeader = ({isLoggedIn}) => {
//
//
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//
//             <div className="container">
//
//                 <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//
//                     {isLoggedIn === "LOGIN" ? (<ul className="navbar-nav ml-auto">
//                         <li className="nav-item">
//                             <Link className="nav-link" to={"/sign-in"}>Login</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to={"/sign-up"}>Sign up({isLoggedIn})</Link>
//                         </li>
//                     </ul>) : <ul className="navbar-nav ml-auto">
//                         <li className="nav-item">
//                             <Link className="nav-link" onClick={handleLogout} to={"/sign-in"}>Logout</Link>
//                         </li>
//
//                     </ul>}
//
//
//                 </div>
//             </div>
//         </nav>
//
//
//     );
// }


const Header = connect(mapStateToProps)(LogoutHeader);
export default Header;
