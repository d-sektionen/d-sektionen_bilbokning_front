
import React from 'react';
import ReactDOM from 'react-dom';
import MasterPage from './pages/MasterPage'
import StartPage from './pages/StartPage'
import { IndexRoute,IndexRedirect, Router, Route, browserHistory } from 'react-router';

require('../public/stylesheets/react-big-calendar.css');


init();

function init() {

    var routes = (
        <Router history={browserHistory}>
            <Route path='/bilbokning' component={MasterPage}>
                <IndexRoute component = {StartPage}/>
            </Route>
        </Router>

    );

    ReactDOM.render(
        routes, document.getElementById('root')
    );
}



