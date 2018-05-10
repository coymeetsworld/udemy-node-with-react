import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null: // don't know
        return; // Don't want to show anything yet.
      case false: // not logged in
        return <li><a href="/auth/google">Login With Google</a></li>
      default: //logged in
        return <li><a>Logout</a></li>;
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="left brand-logo">Emaily</a>
          <ul className="right ">
            {this.renderContent()} 
          </ul>
        </div>
      </nav>
    );
  }
}

//function mapStateToProps(state) {
function mapStateToProps({ auth }) {
  //return { auth: state.auth }
  return { auth }; // this object will be passed to Header as props. auth is short for the authReducer (in combineReducers)
}

export default connect(mapStateToProps)(Header);