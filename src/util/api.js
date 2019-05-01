// update getURL and postURL
let getURL = 'http://192.168.99.101:49567/api/service-types';
let postURL = 'http://192.168.99.101:49567/api/assistance-requests';
// let getURL = 'http://localhost:49567/api/service-types';
// let postURL = 'http://localhost:49567/api/assistance-requests';

export const getServiceTypes = () => {
  return fetch(getURL);
};

export const postAssistanceRequest = (data) => {
  return fetch(postURL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};