/**
 * Created by gustavaaro on 2016-11-22.
 */
import React from 'react';
import BigCalendar from 'react-big-calendar';
import eventlist from '../services/events'
var moment = require('moment');


var events = eventlist;
var currentSelected = [{}];
var result = <div></div>;
require('moment/locale/sv');
moment().format('DDDD MMMM YY');

let Selectable = React.createClass({

    getInitialState: function() {
        return(
            
            {selStart: null,selEnd: null, events: events, numberValue: "", descriptionValue: ""}
        );
    },
    onTimeSlotSelected: function (event) {
        currentSelected = [{'title':'Nuvarande val','start':event.start,'end':event.end, 'description':""}];
        this.setState({selStart: event.start, selEnd: event.end, events:events});
    },
    onBook: function () {
        let re = /07[0-9]{8}/;

        if(this.state.numberValue.length == 0 || !re.test(this.state.numberValue)){
            this.onFail("Du måste ange ett giltigt telefonnummer.");
            this.setState({events:events});
            return;
        }

        if(!this.checkCollision(currentSelected)){
            this.onSuccess("Bilen är bokad " + moment(this.state.selStart).format("DD MMM YYYY H:mm") + " till " + moment(this.state.selEnd).format("DD MMM YYYY H:mm"));
            if(this.state.descriptionValue.length > 0) {
                currentSelected[0].description = this.state.descriptionValue;
            }
            currentSelected[0].title = "LIU ID";
            events = events.concat(currentSelected);
        } else {
            this.onFail("Tiden du valt är tyvärr inte ledig. Välj en annan tid.");
        }
        currentSelected = [{}];

        this.setState({events:events});


    },
    onFail: function (message) {
        result = <div className="alert alert-danger">
            <strong>Bokningen gick inte att genomföra.</strong> {message}
        </div>;
    },
    onSuccess: function (message) {
        result = <div className="alert alert-success">
            <strong>Bokning genomförd!</strong> {message}
        </div>;
    },

    checkCollision: function (range) {
        for(let i = 0; i < events.length; i += 1){

            if( moment(range[0].start) <= moment(events[i].end) && moment(range[0].end) >= moment(events[i].start)){
                return true;
            }
        }
        return false;
    },

    onPhoneNumberChange: function(event){
        this.setState({numberValue: event.target.value});
    },
    onDescriptionChange: function (event) {
        this.setState({descriptionValue: event.target.value})
    },
    eventView: function ({event}) {
            return (
                <span>
                    <strong>
                    {event.title}
                    </strong>
                    <div style={{marginTop: 10}}>{event.description}</div>
                </span>
            )
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
                    messages={{next:"Nästa",previous:"Föregående",today:"Idag",week:"Vecka", month:"Månad",day:"Dag",allDay:"Heldag",showMore:"Visa mer", date:"Datum", time:"Tid", event:"Event", agenda:"Agenda"}}
                    defaultView='week'
                    defaultDate={new Date()}
                    components={{event: this.eventView}}
                    onSelectEvent={event => alert(event.description)}
                    onSelectSlot={(slotInfo) => {this.onTimeSlotSelected(slotInfo)}}
                />
                <div>{result}</div>
                <label form="information-form">Fält markerade med <b>*</b> är obligatoriska.</label>
                <form id="information-form" >
                    <div className="form-group">
                        <label for="inputNumber">Telefonnummer*</label>
                        <input type="phone number" className="form-control" value={this.state.numberValue} onChange={this.onPhoneNumberChange} id="inputNumber" placeholder="Ange telefonnummer"/>
                    </div>
                    <div className="form-group">
                        <label for="description">Beskrivning</label>
                        <textarea className="form-control" id="description" placeholder="Beskrivning" value={this.state.descriptionValue} onChange={this.onDescriptionChange} rows="3"/>
                    </div>
                </form>
                <button className="btn btn-success" onClick={this.onBook}>Boka</button>

            </div>
        );
    }


});
export default Selectable;

