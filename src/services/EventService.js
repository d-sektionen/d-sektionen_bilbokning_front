/**
 * Created by gustavaaro on 2016-12-11.
 */
var startDate = new Date();
var endDate = new Date(startDate);
endDate.setHours(23);

//Dummy result from database-query
var events =  [{'title': 'gusaa960','description':'Flytt','allDay': false,'start': startDate,'end': endDate, 'phone':'070325623'}];

export default class EventService {
    
    constructor(){
        
    }
    
    static addEvent(event){
        events.push(event)
    }
    
    static getEvents(){
        return events;
    }
    
}


