import React from "react";

import './Header.css';

import YYLogo4 from '../../../images/yylogo-menu4.png'

const Header = () => {

    return (

        <div className="header-wrapper">

            <div className="h-menu d-flex px-5 justify-content-between">

                <div className="nav-menu-left">

                    <ul className="nav navbar-nav flex-row nav-menu align-items-center font-weight-bold">
                        <li className="px-2">
                            <a href="/" className="no-border">
                                <img className="yylogo-menu"
                                     src={YYLogo4}
                                     alt="Yummy Yum"
                                     width="100%"
                                     height="100%"
                                />
                            </a>
                        </li>
                        <li className="pl-1"><a href="/">Our Plans</a></li>
                        <li><a href="/">How It Works</a></li>
                        <li><a href="/">Pricing</a></li>
                        <li><a href="/">Gifts</a></li>
                    </ul>

                </div>

                <div className="nav-menu-right ">

                    <ul className="nav navbar-nav flex-row nav-menu align-items-center font-weight-bold">
                        <li className="pl-2">
                            <a href="/">Log in</a>
                        </li>
                        <li className="pl-2">
                            <a href="/">Sign Up</a>
                        </li>

                    </ul>

                </div>


            </div>


        </div>
    )

};

export default Header;