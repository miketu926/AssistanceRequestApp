import React, { Component } from 'react';
import { getServiceTypes } from '../util/api';

class ServiceType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceTypes: [],
    };
  }

  componentDidMount() {
    getServiceTypes().then(res => res.json()).then(res => {
      this.setState({ serviceTypes: this.state.serviceTypes.concat(res.data) });
    });
  }

  render() {

    return (
      <select className="col" id="serviceType" value={this.props.selected} onChange={this.props.update("serviceType")}>
        <option value="" disabled selected>Select Service Type</option>
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