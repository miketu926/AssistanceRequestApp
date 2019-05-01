import React from 'react';

export const SubmissionMessage = (props) => {
  return (
    <form className="col" onSubmit={props.handleModalClose}>
      <h3 className="col mb-3">{props.state.modalMessage}</h3>
      <div className="col mb-1">Name: {props.state.firstName} {props.state.lastName}</div>
      <div className="col mb-1">Email: {props.state.email}</div>
      <div className="col mb-1">Service Type: {props.state.serviceType}</div>
      <div className="col mb-3">Description: {props.state.description}</div>
      <input className="col-4 offset-8" type="submit" value="OK" />
    </form>
  )
}