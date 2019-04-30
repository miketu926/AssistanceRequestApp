import React, { Component } from 'react';
import { postAssistanceRequest } from '../util/api';
import ServiceType from './service_type';
import { SubmissionMessage } from './submission_messages';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      serviceType: "",
      description: "",
      modalOpen: false,
      modalMessage: "",
      checked: false,
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.checked = this.checked.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    postAssistanceRequest(this.stateToJson(this.state))
      .then(res => {
        return res.json();
      })
      .then(data => {
        let message = data.message;
        this.setState({
          modalMessage: message,
          modalOpen: true,
        });
      });
  }

  stateToJson(state) {
    return {
      assistance_request: {
        contact: {
          first_name: state.firstName,
          last_name: state.lastName,
          email: state.email,
        },
        service_type: state.serviceType,
        description: state.description,
      }
    };
  }

  handleModalClose(e) {
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

  checked() {
    this.state.checked ? this.setState({ checked: false }) : this.setState({ checked: true });
  }

  render() {
    const { firstName, lastName, email, serviceType, checked } = this.state;
    const isEnabled = firstName.length > 0 && lastName.length > 0 && email.length > 0 && serviceType.length > 0 && checked;

    if (this.state.modalOpen === false) {
      return (
        <div className="outer-box">
          <form className="inner-box inner-width" onSubmit={this.handleSubmit}>
            <header>New Assistance Request</header>

            <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.update("firstName")} />
            <div>required</div>
            <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.update("lastName")} />
            <div>required</div>
            <input type="email" placeholder="Email Address" value={this.state.email} onChange={this.update("email")} />
            <div>required</div>

            <ServiceType update={this.update} selected={this.state.serviceType} />
            <div>required</div>

            < textarea
              cols="60"
              rows="7"
              value={this.state.description}
              placeholder='Description'
              onChange={this.update("description")} />

            <div>
              <input type="checkbox" name="checkbox" id="checkbox" onClick={this.checked} />
              <label htmlFor="checkbox">I hereby accept the terms of service for THE NETWORK and the Privacy Policy</label>
            </div>

            <input type="submit" value="Get Assistance" disabled={!isEnabled} />

          </form>
        </div>
      );
    } else {
      return (
        <SubmissionMessage state={this.state} handleModalClose={this.handleModalClose} />
      );
    }

  }

}

export default Form;