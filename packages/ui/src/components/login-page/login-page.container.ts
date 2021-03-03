import { html, customElement, css } from 'lit-element';
import './login-page.view';
import { Router } from '@vaadin/router';
import { ApolloMutation } from '@apollo-elements/lit-apollo';
import { LoginDocument } from 'graphql-client';
// import { ApolloError } from '@apollo/client/core';

@customElement('login-page')
export class LoginPageContainer extends ApolloMutation<typeof LoginDocument> {
  mutation = LoginDocument;

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <login-page-view
        .onSignup="${this.handleSignup}"
        .onForgotPassword="${this.handleForgotPassword}"
        .onLogin="${this.handleLogin}"
      ></login-page-view>
    `;
  }

  handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    // TODO: Use lit-apollo/apollo-elements?
    this.variables = {
      email,
      password,
    };
    try {
      const response = await this.mutate();
      if (response.errors.length) {
        console.log('error');
      } else {
        console.log(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleSignup(event: Event) {
    event.preventDefault();
    Router.go('signup');
  }

  handleForgotPassword(event: Event) {
    event.preventDefault();
    Router.go('forgot-password');
  }
}
