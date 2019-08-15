import React from 'react';
import { gapiClientId } from '../keys';

// add gapi as property to window obj
declare global {
  interface Window {
    gapi: any;
  }
}

interface GoogleAuthState {
  isSignedIn: Function | null;
}

export class GoogleAuth extends React.Component<{}, GoogleAuthState> {
  auth: any;
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load(
      'client:auth2',
      (): void => {
        window.gapi.client
          .init({
            clientId: gapiClientId,
            scope: 'email'
          })
          .then(
            (): void => {
              this.auth = window.gapi.auth2.getAuthInstance();
              this.setState({ isSignedIn: this.auth.isSignedIn.get() });
              this.auth.isSignedIn.listen(this.onAuthChange);
            }
          );
      }
    );
  }

  onAuthChange = (): void => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = (): void => {
    this.auth.signIn();
  };

  onSignOut = (): void => {
    this.auth.signOut();
  };

  renderAuthButton(): JSX.Element | null {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
