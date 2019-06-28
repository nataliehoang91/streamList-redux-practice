import React from "react";
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions/index'
class GoogleAuth extends React.Component {

    state={isSignedIn:null}
  componentDidMount() {

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientID:
            "1020754987346-ekfl5n8450u0m7eedg7qo6co1d317ff5.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>Signed In or Not????</div>;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          {" "}
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          {" "}
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
export default connect(null,{signIn,signOut})(GoogleAuth);
