import React, { Component, useEffect, useState } from 'react';
import { getServiceTypes } from '../util/api';

class ServiceType extends Component {
  state = { serviceTypes: [] };

  componentDidMount() {
    getServiceTypes().then(res => res.json()).then(res => {
      this.setState({ serviceTypes: this.state.serviceTypes.concat(res.data) });
    });
  }

  render() {

    return (
      <select className="col" id="serviceType" value={this.props.selected} onChange={this.props.update("serviceType")}>
        <option value="" disabled>Select Service Type</option>
        {this.state.serviceTypes.map(type => {
          return <option key={type.id} value={type.id}>
            {type.display_name}
          </option>;
        })}
      </select>
    );
  }

}

export default ServiceType;