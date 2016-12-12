/**
 * Created by gustavaaro on 2016-11-22.
 */

import React from 'react'
import Calendar from '../components/Calendar.jsx'




export default class StartPage extends React.Component{


    render(){

        return(
            <div>
                <div className="description-box"><h3>Välkommen till Bilbokningen! Välj en ledig tid och tryck på boka.</h3></div>
                <div>
                    <div className="table-header"><h4 className="title">Nuvarande bokning</h4></div>
                    <div className="table-header"><h4 className="title">Uppkommande bokningar</h4></div>
                    <Calendar/>
                </div>
            </div>
        );
    }
    
    
}