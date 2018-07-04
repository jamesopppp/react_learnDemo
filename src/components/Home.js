import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: props.initialAge,
      status: 0,
      homeLink: props.initialName
    }
    setTimeout(()=>{
      this.setState({
        status :1
      })
    },3000)
  }

  onMakeOlder() {
    this.setState({
      age: this.state.age + 3
    })
  }

  handleGreet() {
    this.props.greet(this.state.age)
  }

  onChangeLink() {
    this.props.changeLink(this.state.homeLink)
  }

  onHandleChange(event){
    this.setState({
      homeLink: event.target.value
    })
    this.props.changeLink(event.target.value)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <div>your name is {this.props.name},your age is {this.state.age}</div>
            <p>Status: {this.state.status}</p>
            <button onClick={() => {this.onMakeOlder()}} className="btn btn-primary">Make me older</button>
            <hr/>
            <button className="btn btn-primary" onClick={this.handleGreet.bind(this)}>Greet</button>
            <hr/>
            <input  defaultValue={this.props.initialName} onChange={(event)=>this.onHandleChange(event)} type=""/>
            <hr/>
            <button onClick={this.onChangeLink.bind(this)} className="btn btn-primary">Change Header Link</button>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  user: PropTypes.object,
  greet: PropTypes.func,
  initialName: PropTypes.string
}
