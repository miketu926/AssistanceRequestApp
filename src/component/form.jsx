import React, { Component } from 'react';
import { postAssistanceRequest } from '../util/api';
import { ServiceType } from './service_type';
import { SubmissionMessage } from './confirmation';

class Form extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    serviceType: "",
    description: "",
    modalOpen: false,
    modalMessage: "",
    checked: false,
  };

  update = field => e => {
    this.setState({ [field]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    postAssistanceRequest(this.stateToJson(this.state))
      .then(res => res.json()).then(res => {
        this.setState({
          modalMessage: res.message,
          modalOpen: true,
        });
      });
  }

  stateToJson = state => ({
    assistance_request: {
      contact: {
        first_name: state.firstName,
        last_name: state.lastName,
        email: state.email,
      },
      service_type: state.serviceType,
      description: state.description,
    }
  });

  handleModalClose = e => {
    e.preventDefault();
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      serviceType: "",
      description: "",
      modalOpen: false,
      modalMessage: "",
    });
  }

  checked = () => {
    this.state.checked ? this.setState({ checked: false }) : this.setState({ checked: true });
  }

  render() {
    const { firstName, lastName, email, serviceType, checked } = this.state;
    const isEnabled = firstName.length > 0 && lastName.length > 0 && email.length > 0 && serviceType.length > 0 && checked;

    if (this.state.modalOpen === false) {
      return (
        <form className="col w-80" onSubmit={this.handleSubmit}>
          <h3 className="col mb-4 border-bottom pb-1">New Assistance Request</h3>

          <input className="col" type="text" placeholder="First Name" value={this.state.firstName} onChange={this.update("firstName")} />
          <div className="col text-danger text-right small mb-2">required</div>
          <input className="col" type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.update("lastName")} />
          <div className="col text-danger text-right small mb-2">required</div>
          <input className="col" type="email" placeholder="Email Address" value={this.state.email} onChange={this.update("email")} />
          <div className="col text-danger text-right small mb-2">required</div>

          <ServiceType update={this.update} selected={this.state.serviceType} />
          <div className="col text-danger text-right small mb-2">required</div>

          < textarea
            className="col"
            cols="60"
            rows="7"
            value={this.state.description}
            placeholder='Description'
            onChange={this.update("description")} />

          <div className="col mt-2 mb-4">
            <input className="col-1" type="checkbox" name="checkbox" id="checkbox" onClick={this.checked} />
            <small className="col-11" htmlFor="checkbox">I hereby accept the terms of service for THE NETWORK and the Privacy Policy.</small>
          </div>

          <input className="col-4 offset-8" type="submit" value="Get Assistance" disabled={!isEnabled} />

        </form>
      );
    } else {
      return (
        <SubmissionMessage {...this.state} handleModalClose={this.handleModalClose} />
      );
    }

  }

}

export default Form;