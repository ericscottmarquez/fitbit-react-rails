

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'



class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user:{},
      loggedIn: false,
      lifetimeTotal: {steps: "initial-state", distance: "initial-state", caloriesOut: "initial-state"},
      lifetimeTracker: {steps: "initial-state", distance: "initial-state", caloriesOut: "initial-state"}
    }
  }

componentDidMount () {
  if(window.location.hash) {
    let fitbitToken = window.location.hash.slice(1).split("&")[0].replace("access_token=", "")
    console.log(fitbitToken)

    axios({
      method: 'get',
      url: 'https://api.fitbit.com/1/user/-/profile.json',
      headers: { 'Authorization': 'Bearer ' + fitbitToken },
      mode: 'cors'
    })
    .then(response => {
      console.log(response)
      this.setState({user: response.data.user, loggedIn: true})
    })
    .catch(error => console.log(error))


    axios({
      method: 'get',
      url: 'https://api.fitbit.com/1/user/-/activities.json',
      headers: { 'Authorization': 'Bearer ' + fitbitToken },
      mode: 'cors'
    })
    .then(response => {
      console.log(response)
      this.setState({lifetimeTotal: response.data.lifetime.total.distance, 
        lifetimeTracker: response.data.lifetime.tracker.steps})
    })
    .catch(error => console.log(error))

  }
}


  render() {
    return (
      <div className="container">
        <header className="text-center">

        <span className="pull-right">{this.state.user.displayName}</span>
          <h1 className="page-header">React Fit</h1>
          <p className="lead">Your personal fitness dashboard</p>
        </header>

        {!this.state.loggedIn && 
          <div className="row justify-content-center">
          <a href="https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22D8NX&%2Ffitbit_auth&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800">
          log in with your butt 
          </a>
          </div>
        }

        <div className="row">
          <div className="col-lg-3">
            <div className="card card-default">
              <div className="card-heading"><h4>Lifetime Stats</h4></div>
              <div className="card-body">
              <p>Current Distance: {this.state.lifetimeTracker.steps}</p>
              <p>Total Distance: {this.state.lifetimeTotal.steps}</p>
              </div>
            </div>

        <div className="card card-default">
            <div className="card-heading"><h4>Badges</h4></div>
            <div className="card-body">
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card card-defalt"><h4>Steps</h4></div>
            <div className="card-body">
          </div>

        <div className="card card-default">
            <div className="card-heading">Distance (miles)</div>
          </div>
        
        </div>

        <div className="col-lg-2 col-lg-offset-1">
          <div className="card card-default">
            <div className="card-heading"><h4>Your friends</h4></div>
          </div>
        </div>

        </div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Dashboard />,
    document.body.appendChild(document.createElement('div')),
  )
})
