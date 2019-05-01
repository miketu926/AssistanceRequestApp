import React, { useEffect, useState } from 'react';
import { getServiceTypes } from '../util/api';

export const ServiceType = ({ selected, update }) => {
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    getServiceTypes().then(res => res.json()).then(res => {
      setServiceTypes(serviceTypes.concat(res.data));
    });
  }, []);

  return (
    <select className="col" id="serviceType" value={selected} onChange={update("serviceType")}>
      <option value="" disabled>Select Service Type</option>
      {serviceTypes.map(type => {
        return <option key={type.id} value={type.id}>{type.display_name}</option>
      })}
    </select>
  );
};