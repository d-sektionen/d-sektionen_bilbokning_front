/**
 * Created by gustavaaro on 2016-11-22.
 */

import React from 'react'
import Calendar from '../components/Calendar.jsx'
import AgendaBox from '../components/AgendaBox.js'
import events from '../services/EventService'



export default class StartPage extends React.Component{

    constructor(){
        super();
        this.state = {key: Math.random()};
        this.onSuccessfulBooking = this.onSuccessfulBooking.bind(this);
    }


    onSuccessfulBooking(){
        this.setState({key: Math.random});
    }


    render(){

        return(
            <div>
                <div className="description-box"><h3>Välkommen till Bilbokningen! Välj en ledig tid och tryck på boka.</h3></div>
                <div>
                    <AgendaBox numberOfRows={5} key={this.state.key}/>
                    <Calendar  onSuccess={this.onSuccessfulBooking}/>
                </div>
            </div>
        );
    }


}