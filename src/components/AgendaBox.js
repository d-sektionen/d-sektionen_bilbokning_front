/**
 * Created by gustavaaro on 2016-12-22.
 */
import React from 'react';
import EventService from '../services/EventService.js'
var moment = require('moment');
require('moment/locale/sv');



export default class AgendaBox extends React.Component{

    constructor(){
        super();
        this.getUpcomingEvents.bind(this);
        this.state = this.getInitialState();
        this.getEvents();
    }

    getInitialState(){
        return ({events: []})
    }

    getEvents(){
        EventService.getAllEvents(function (res) {
            console.log(res);
            this.setState({events: res})
        }.bind(this));
    }

    getCurrent(){
        let events = this.state.events;
        let current;
        for(var i = 0; i < events.length; i ++){
            if (moment(events[i].start) <= moment(new Date()) && moment(events[i].end) >= moment(new Date())) {
                current = events[i];
                break;
            }
        }

        if(current != null){
            return <tbody><tr>
                <td>{current.title}</td>
                <td>{moment(current.start).format("DD MMM YYYY H:mm") + "  -  " + moment(current.end).format("DD MMM YYYY H:mm")}</td>
                <td>{current.description}</td>
                <td>{current.phone}</td>
            </tr></tbody>
        } else return <tbody><tr><td>För nuvarande är bilen ledig.</td></tr></tbody>


    }

    getUpcomingEvents(){
        let upcomingEvents = this.state.events;
        var rows = [];
        let n = Math.min(upcomingEvents.length,this.props.numberOfRows);
        let current;
        upcomingEvents.reverse();
        for(var i = 0; i < n; i++){
            current = upcomingEvents[i];
            rows.push(<tr>
                        <td>{current.title}</td>
                        <td>{moment(current.start).format("DD MMM YYYY H:mm") + "  -  " + moment(upcomingEvents[i].end).format("DD MMM YYYY H:mm")}</td>
                        <td>{current.description}</td>
                        <td>{current.phone}</td>
                    </tr>)
        }

        return <tbody>{rows}</tbody>
    }

    render(){
        return(
            <div>
                <div className="table-responsive overview-box">
                    <table className="table table-striped table-hover">
                        <caption className="header">Nuvarande bokning</caption>
                        <thead>
                        <tr>
                            <th>LiU-id</th>
                            <th>Datum</th>
                            <th>Beskrivning</th>
                            <th>Telefon</th>
                        </tr>
                        </thead>
                        {this.getCurrent()}
                    </table>
                <table className="table table-striped table-hover">
                    <caption className="header">Uppkommande bokningar</caption>
                    <thead>
                    <tr>
                        <th>LiU-id</th>
                        <th>Datum</th>
                        <th>Beskrivning</th>
                        <th>Telefon</th>
                    </tr>
                    </thead>
                    {this.getUpcomingEvents()}
                </table>
                </div>
            </div>
        );
                }

}