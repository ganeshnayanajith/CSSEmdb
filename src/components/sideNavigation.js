import React from 'react';
//import logo from "../assets/mdb-react.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import logo from "../assets/new_logo.png";

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid" src={logo}/>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/supplier" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3"/>
                        Supplier
                    </MDBListGroupItem>
                </NavLink>
                {/*<NavLink to="/profile" activeClassName="activeClass">*/}
                {/*    <MDBListGroupItem>*/}
                {/*        <MDBIcon icon="user" className="mr-3"/>*/}
                {/*        Profile*/}
                {/*    </MDBListGroupItem>*/}
                {/*</NavLink>*/}
                {/*<NavLink to="/tables" activeClassName="activeClass">*/}
                {/*    <MDBListGroupItem>*/}
                {/*        <MDBIcon icon="table" className="mr-3"/>*/}
                {/*        Tables*/}
                {/*    </MDBListGroupItem>*/}
                {/*</NavLink>*/}
                {/*<NavLink to="/404" activeClassName="activeClass">*/}
                {/*    <MDBListGroupItem>*/}
                {/*        <MDBIcon icon="exclamation" className="mr-3"/>*/}
                {/*        404*/}
                {/*    </MDBListGroupItem>*/}
                {/*</NavLink>*/}
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;