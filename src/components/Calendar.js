/**
 * Created by gustavaaro on 2016-11-22.
 */


import React from 'react'
import BigCalendar from 'react-big-calendar'
import Moment from 'moment';

let Selectable = React.createClass({
    render(){
        BigCalendar.momentLocalizer(Moment);
        return (
            <div>
                <BigCalendar
                    timeslots = {4}
                    events={[{'title': 'All Day Event','allDay': true,'start': new Date(2015, 3, 0),'end': new Date(2015, 3, 0)}]}
                    selectable
                    defaultView='week'
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date(2015, 3, 12)}
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={(slotInfo) => alert(
                    `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                    `\nend: ${slotInfo.end.toLocaleString()}`
                   )}
                />
            </div>
        )
    }
});

export default Selectable;