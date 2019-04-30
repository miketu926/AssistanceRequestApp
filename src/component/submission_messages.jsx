import React from 'react';

export const SubmissionMessage = (props) => {
  return (
    <form className="inner-box" onSubmit={props.handleModalClose}>
      <header>{props.state.modalMessage}</header>
      <div>{props.state.firstName} {props.state.lastName}</div>
      <div>{props.state.email}</div>
      <div>{props.state.serviceType}</div>
      <div>{props.state.description}</div>
      <input type="submit" value="OK" />
    </form>
  )
}