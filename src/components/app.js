import React, { Fragment, useState, useEffect } from 'react';

// import Header from './common/header-component/header';
// import Sidebar from './common/sidebar-component/sidebar';
// import RightSidebar from './common/right-sidebar';
// import Footer from './common/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './common/loader';


const AppLayout = (props) => {
    useEffect(() => {

        // if (!localStorage.getItem("token"))
        //     props.history.push("/")
        }, [])

    if (localStorage.getItem("token")) {
        return (
            <div>
                <Fragment>
                    {/* <Loader /> */}
                    <div className="page-wrapper">
                        <div className="page-body-wrapper">
                            {/* <Header />
                            <Sidebar />
                            <RightSidebar /> */}

                            <div className="page-body ">
                                {props.children}
                            </div>

                            {/* <Footer /> */}
                            {/* <ThemeCustomizer /> */}
                        </div>
                    </div>
                    <ToastContainer />
                </Fragment>
            </div>
        )
    } else {
        return (
            <Loader />
        )

    }
}

export default AppLayout;