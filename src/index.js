import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, { Fragment, useEffect, useState, lazy, Suspense } from "react";
import ReactDOM from 'react-dom';

import { HashRouter, Router, Route, Switch, BrowserRouter } from "react-router-dom";

import './index.css';

import { ConnectedRouter } from 'connected-react-router';
import { ScrollContext } from "react-router-scroll-4";
import history from "./utils/history";

import App from './components/app';
import reportWebVitals from './reportWebVitals';

const AddSchoolUser = lazy(() => import("./components/dataEntryForm/addSchoolUser"));
const ViewSchool = lazy(() => import("./components/dataEntryForm/viewSchools"));
const UpdateSchool = lazy(() => import("./components/dataEntryForm/updateSchool"));

function Root() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <Router history={history}>
          <ScrollContext>
            <Switch>
              <Route exact path={"/"} component={AddSchoolUser} />
              <Route exact path={"/viewSchools"} component={ViewSchool} />
              <Route exact path={"/updateSchool/:schoolDetailsId"} component={UpdateSchool} />
              <Fragment>
                <App>
                </App>
              </Fragment>
            </Switch>
          </ScrollContext>
        </Router>
      </div>
    </Suspense>
  )
}
ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
