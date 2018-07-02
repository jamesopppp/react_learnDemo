import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <div>your name is {this.props.name},your age is {this.props.age}</div>
            <div>
              <h4>hobbies</h4>
              <ul>
                {this.props.user.hobbies.map((hobby,i)=><li key={i}>{hobby}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}