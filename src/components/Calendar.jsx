/**
 * Created by gustavaaro on 2016-11-22.
 */
import React from 'react';
import BigCalendar from 'react-big-calendar';
import EventService from '../services/EventService'
var moment = require('moment');

var events = [];
var currentSelected = [{}];
var result = <div></div>;
require('moment/locale/sv');
moment().format('DDDD MMMM YY');

export default class Calendar extends React.Component {

    constructor(){
        super();
        this.state = this.getInitialState();
        this.getEvents();
    }

    getInitialState() {
        return (

        {selStart: null, selEnd: null, events: [], numberValue: "", descriptionValue: ""}
        );
    }

    getEvents(){

        EventService.getAllEvents(function (response) {
            this.setState({events: response});
            events = response;
        }.bind(this))

    }

    onTimeSlotSelected(event) {
        currentSelected = [{'title': 'Nuvarande val', 'start': event.start, 'end': event.end, 'description': ""}];
        this.setState({selStart: event.start, selEnd: event.end, events: events});
    }

    onBook() {

        //TODO: Maybe a better phone number validation regex?

        let re = /07[0-9]{8}/;

        if (this.state.numberValue.length == 0 || !re.test(this.state.numberValue)) {

            //TODO: Uncomment to validate phone number

            //this.onFail("Du måste ange ett giltigt telefonnummer.");
            //this.setState({events: events});
            //return;
        }

        if(moment(currentSelected[0].end) <= moment(new Date())){
            this.onFail("Tiden du har valt är ej gitlig.");
        } else if (!this.checkCollisions(currentSelected[0])) {
            this.onSuccess("Bilen är bokad " + moment(this.state.selStart).format("DD MMM YYYY H:mm") + " till " + moment(this.state.selEnd).format("DD MMM YYYY H:mm"));
            if (this.state.descriptionValue.length > 0) {
                currentSelected[0].description = this.state.descriptionValue;
            }
            currentSelected[0].title = "LIU ID";
            currentSelected[0].phone = this.state.numberValue;
            events = events.concat(currentSelected);
            EventService.addEvent(currentSelected[0],function(response){
                console.log("RESPONSE:");
                console.log(response);
                this.getEvents();
            });
            this.props.onSuccess();
        } else{
            this.onFail("Tiden du valt är tyvärr inte ledig. Välj en annan tid.");
        }
        currentSelected = [{}];

        this.setState({events: events});


    }

    onFail(message) {
        result = <div className="alert alert-danger">
            <strong>Bokningen gick inte att genomföra.</strong> {message}
        </div>;
    }

    onSuccess(message) {
        result = <div className="alert alert-success">
            <strong>Bokning genomförd!</strong> {message}
        </div>;
    }

    checkCollisions(event) {
        for (let i = 0; i < events.length; i += 1) {
            if (moment(event.start) <= moment(events[i].end) && moment(event.end) >= moment(events[i].start)) {
                return true;
            }
        }
        return false;
    }

    onPhoneNumberChange(event) {
        this.setState({numberValue: event.target.value});
    }

    onDescriptionChange(event) {
        this.setState({descriptionValue: event.target.value});
    }

    eventView({event}) {
        return (
            <span>
                    <strong>
                    {event.title}
                    </strong>
                    <div style={{marginTop: 10}}>{event.description}</div>
                </span>
        )
    }

    render() {


        BigCalendar.momentLocalizer(moment);


        let formats = {
            dateFormat: 'DD mm YY',
            dayFormat: (date, culture, localizer) =>
                localizer.format(date, 'DD MMM YY', culture),
        };

        return (
            <div className="calendar-widget">
                <BigCalendar
                    className="calendar"
                    timeslots={2}
                    events={this.state.events.concat(currentSelected)}
                    selectable
                    culture='sv'
                    messages={{next:"Nästa",previous:"Föregående",today:"Idag",week:"Vecka", month:"Månad",day:"Dag",allDay:"Heldag", date:"Datum", time:"Tid", event:"Event", agenda:"Agenda"}}
                    defaultView='week'
                    defaultDate={new Date()}
                    components={{event: this.eventView}}
                    onSelectEvent={event => alert(event.description)}
                    onSelectSlot={(slotInfo) => {this.onTimeSlotSelected(slotInfo)}}
                />
                <div>{result}</div>
                <label form="information-form">Fält markerade med <b>*</b> är obligatoriska.</label>
                <form id="information-form">
                    <div className="form-group">
                        <label for="inputNumber">Telefonnummer*</label>
                        <input type="phone number" className="form-control" value={this.state.numberValue}
                               onChange={this.onPhoneNumberChange} id="inputNumber" placeholder="Ange telefonnummer"/>
                    </div>
                    <div className="form-group">
                        <label for="description">Beskrivning</label>
                        <textarea className="form-control" id="description" placeholder="Beskrivning"
                                  value={this.state.descriptionValue} onChange={this.onDescriptionChange.bind(this)} rows="3"/>
                    </div>
                </form>
                <button className="btn btn-success" onClick={this.onBook.bind(this)}>Boka</button>

            </div>
        );
    }


}

