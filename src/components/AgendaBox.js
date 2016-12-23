/**
 * Created by gustavaaro on 2016-12-22.
 */
import React from 'React';
import EventService from '../services/EventService.js'
var moment = require('moment');
require('moment/locale/sv');



export default class AgendaBox extends React.Component{

    constructor(){
        super();
        this.getUpcomingEvents.bind(this)
    }

    getCurrent(){
        let events = EventService.getEvents();
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
                <td>{current.phone}</td>
            </tr></tbody>
        } else return <tbody></tbody>


    }

    getUpcomingEvents(){
        let upcomingEvents = EventService.getEvents();
        var rows = [];
        var n = Math.min(upcomingEvents.length,this.props.numberOfRows);

        for(var i = 0; i < n; i++){
            rows.push(<tr>
                        <td>{upcomingEvents[i].title}</td>
                        <td>{moment(upcomingEvents[i].start).format("DD MMM YYYY H:mm") + "  -  " + moment(upcomingEvents[i].end).format("DD MMM YYYY H:mm")}</td>
                        <td>{upcomingEvents[i].phone}</td>
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
                            <th>Liu-id</th>
                            <th>Datum</th>
                            <th>Telefon</th>
                        </tr>
                        </thead>
                        {this.getCurrent()}
                    </table>
                <table className="table table-striped table-hover">
                    <caption className="header">Uppkommande bokningar</caption>
                    <thead>
                    <tr>
                        <th>Liu-id</th>
                        <th>Datum</th>
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