/**
 * Created by gustavaaro on 2016-11-22.
 */
import React from 'react'
import BigCalendar from 'react-big-calendar'
import {Button} from 'react-bootstrap'
var moment = require('moment');


var events = [{'title': 'gusaa960','description':'Flytt','allDay': true,'start': new Date(),'end': new Date()}];
var currentSelected = [{}];
require('moment/locale/sv');
moment().format('DDDD MMMM YY');

let Selectable = React.createClass({

    getInitialSate: function() {
        moment().format('MMMM Do YYYY, h:mm:ss a');
        this.setState({selStart: null,selEnd: null, events: events});
    },
    onTimeSlotSelected: function (event) {
        currentSelected = [{'title':'Val','start':event.start,'end':event.end}];
        this.setState({selStart: event.start, selEnd: event.end, events:events});
    },
    onBook: function () {
        console.log(this.state);
        events = events.concat(currentSelected);
        currentSelected = [{}];
        this.setState({events:events});
        console.log(this.state);


        alert("Bokad! " + moment(this.state.selStart).format("DD MMM YYYY H:mm") + " till " + moment(this.state.selEnd).format("DD MMM YYYY H:mm"));
    },

    render: function () {


        BigCalendar.momentLocalizer(moment);



        let formats = {
            dateFormat: 'DD mm YY',
            dayFormat: (date, culture, localizer) =>
                localizer.format(date, 'DD MMM YY', culture),


        };

        return (
            <div className="calendar-widget">
                <BigCalendar
                    className = "calendar"
                    timeslots = {2}
                    events= {events.concat(currentSelected)}
                    selectable
                    culture = 'sv'
                    defaultView='week'
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    onSelectEvent={event => alert(event.description)}
                    onSelectSlot={(slotInfo) => {this.onTimeSlotSelected(slotInfo)}}
                />
                <Button onClick={this.onBook}>Boka!</Button>
            </div>
        );
    }


});
export default Selectable;

