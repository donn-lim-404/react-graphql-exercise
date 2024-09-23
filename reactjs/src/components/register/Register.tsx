import React, { useState } from 'react';
import '../main/Main.css';

export default function Register() {

  const serviceTypes = [
    { label: 'select  one', value: -1 },
    { label: 'delivery', value: 0},
    { label: 'pick-up', value: 1},
    { label: 'payment', value: 2}
  ];

  const [regName, setName] = useState('');
  const [regEmail, setEmail] = useState('');
  const [regMobile, setMobile] = useState('');
  const [regPostcode, setPostcode] = useState('');
  const [regService, setService] = useState('');
  const [registered, setRegistered]  = useState({
    "id":'',
    "name": '',
    "email": '',
    "mobile": '',
    "postcode": '',
    "service": ''
  });

  const registerLead = async () => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      // @TODO: frontend validations before submitting
      const graphql = JSON.stringify({
        query: `mutation{register(
            ${regName ? `name:"${regName}",` : ``}
            ${regEmail ? `email:"${regEmail}",` : ``}
            ${regMobile ? `mobile:${regMobile},` : ``}
            ${regPostcode ? `postcode:${regPostcode},` : ``}
            ${regService ? `service:${regService}` : ``}
          ){id,name,email,mobile,postcode,service,serviceType}}`});

      const requestOptions = {
        method: 'POST',
        headers,
        body: graphql,
      };

      const response  = await fetch(`http://localhost:3002/graphql`, requestOptions);
      const data = await response.json();

      if (data.errors) {
        const errors  = data.errors;
        let message = '';

        if (Array.isArray(errors)) {
          errors.map((error) => {
            message += ' ' + error.message;
          })
        }
        else {
          message = errors.message;
        }

        alert(message);
      }
      else {
        const registered = data.data.register;
        setRegistered(registered);
        resetFields();
      }
    }
    catch (e) {
      alert('Error registering Lead');
      console.error('Error registering Lead', e);
    }
  };

  const resetFields = () => {
    setName('');
    setEmail('');
    setMobile('');
    setPostcode('');
    setService('');
  };

  const handleRegisterSubmit = (event: any) => {
    event.preventDefault();

    if (!regName || !regEmail || !regMobile || !regPostcode) {
      alert('Please fill up the registration form.');
      return;
    }

    if (regService === '-1') {
      alert('Please select a service.');
      return;
    }

    registerLead();
  };

  return (
    <section className="register">
      <h3>REGISTER LEAD</h3>
      <form onSubmit={handleRegisterSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={regName}
              onChange={(el) => { setName(el.target.value) }}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="text"
              value={regEmail}
              onChange={(el) => { setEmail(el.target.value) }}
            />
          </label>
        </div>
        <div>
          <label>
            Mobile:
            <input
              type="text"
              value={regMobile}
              onChange={(el) => { setMobile(el.target.value) }}
            />
          </label>
        </div>
        <div>
          <label>
            Postcode:
            <input
              type="text"
              value={regPostcode}
              onChange={(el) => { setPostcode(el.target.value) }}
            />
          </label>
        </div>
        <div>
          <label>
            Service:
            <select value={regService} onChange={(el) => { setService(el.target.value) }}>
              {
                serviceTypes.map((service, index) =>
                  <option key={'option-' + index} value={service.value}>{service.label}</option>
                )
              }
            </select>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {
        (!registered || !registered.id) ? '' :
        <span>Yipee! Lead: {registered.name} has been registered!</span>
      }
    </section>
  );
}