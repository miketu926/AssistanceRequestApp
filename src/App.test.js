import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { getServiceTypes, postAssistanceRequest } from './util/api';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Form from './component/form';

configure({ adapter: new Adapter() });

var getResponse = {
  "data": [
    {
      "display_name": "Benefits",
      "id": "benefits"
    },
    {
      "display_name": "Employment",
      "id": "employment"
    },
    {
      "display_name": "Healthcare",
      "id": "healthcare"
    },
    {
      "display_name": "Housing",
      "id": "housing"
    },
    {
      "display_name": "Legal",
      "id": "legal"
    }
  ]
};

var postSample = {
  assistance_request: {
    contact: {
      first_name: "Mike",
      last_name: "Tu",
      email: "miketu926@gmail.com",
    },
    service_type: "Interview",
    description: "Hoping to add value to the engineering team at UniteUs to further the company's growth",
  }
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('the API', () => {
  it('performs a GET request and returns a 200 status', () => {
    return getServiceTypes().then(res => {
      expect(res.status).toEqual(200);
    });
  });
  it('performs a GET request and returns a json', () => {
    return getServiceTypes().then(res => res.json()).then(res => {
      expect(res.data).toEqual(getResponse.data);
    });
  });
  it('performs a POST request and returns one of the 4 statuses', () => {
    return postAssistanceRequest(postSample).then(res => {
      expect(res.status === 201 || res.status === 401 || res.status === 500 || res.status === 503).toBeTruthy();
    });
  });
});

describe('the Form', () => {
  const state = {
    firstName: "Mike",
    lastName: "Tu",
    email: "miketu926@gmail.com",
    serviceType: "Interview",
    description: "Time to shine!",
    checked: true,
  };

  it('should match its empty snapshot', () => {
    const tree = renderer.create(<Form />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls handleSubmit when the form is filled and submitted', () => {
    const component = shallow(<Form />);
    const preventDefault = jest.fn();

    component.setState({
      state
    });

    component.find('form').simulate('submit', { preventDefault });
    expect(component).toMatchSnapshot();
    expect(preventDefault).toBeCalled();
  });



});