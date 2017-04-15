/**
 * Created by gustavaaro on 2016-12-11.
 */

import axios from 'axios'

var request = require('superagent');
var startDate = new Date();
var endDate = new Date(startDate);
endDate.setHours(23);

//Dummy result from database-query
var events =  [{'title': 'gusaa960','description':'Flytt','allDay': false,'start': startDate,'end': endDate, 'phone':'070325623'}];

export default class EventService {
    
    constructor(){
        
    }
    
    static addEvent(event, callback){

        let data = {
            liu_id: "LIU_ID",
            description: event.description,
            start: Math.floor(event.start.getTime()/1000),
            end: Math.floor(event.end.getTime()/1000)
        };

        request
            .post('https://d-sektionen.se/api/bilbokning/bookings')
            .send(data)
            .set('Content-Type', 'application/json')
            .end(function(err, res){
                callback(res,err);
            });

    }


    
    static getAllEvents(callback){

        let currTime = Math.floor(new Date().getTime()/1000) - 2*3600; //Timezone correction. Probably not a good solution
        console.log('https://d-sektionen.se/api/bilbokning/bookings?user=all&from_time='+ currTime);
        axios({
            method:'get',
            url:'https://d-sektionen.se/api/bilbokning/bookings?user=all&from_time='+ currTime,
            responseType:'json'
        })
            .then(function(response) {
                let eventList = response.data.bookings;
                eventList.forEach(function (event) {
                    event.title = event.liu_id;
                    event.start = new Date(event.start*1000);
                    event.end = new Date(event.end*1000);
                });
                callback(eventList);
        });
    }
    
}


