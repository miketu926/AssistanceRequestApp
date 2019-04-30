export const stateToJson = (state) => {
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
