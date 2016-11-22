
import React, { PropTypes } from 'react';


export default class MasterPage extends React.Component{

    constructor(){
        super();
    }

    render(){
        console.log("RENDER");
        return(
          <div className='homepage'>
              {this.props.children}
          </div>
        );
    }

}