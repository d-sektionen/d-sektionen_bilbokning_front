
import React from 'react';
import ReactDOM from 'react-dom';
import MasterPage from './pages/MasterPage'
import StartPage from './pages/StartPage'
import { IndexRoute,IndexRedirect, Router, Route, browserHistory } from 'react-router';

require('./react-big-calendar.css');

init();

function init() {
    
    var routes = (
        <Router history={browserHistory}>
            <Route path='/' component={MasterPage}>
                <IndexRoute component = {StartPage}/>
            </Route>
            
        </Router>

    );
    console.log("render");
    
    ReactDOM.render(
        routes, document.getElementById('app-container')
    );
}



