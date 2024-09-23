import React, { useEffect, useState } from 'react';
import '../main/Main.css';

export default function Details() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [leadId, setLeadId] = useState('');
  const [lead, setLead] = useState({
    "id": '',
    "name": '',
    "email": '',
    "mobile": '',
    "postcode": '',
    "service": '',
    "serviceType": ''
  });

  const getLead = async (id: any) => {
    try{
      const response = await fetch(`http://localhost:3002/graphql?query={lead(id:${id}){id,name,email,mobile,postcode,service,serviceType}}`);
      const data = await response.json();
      const lead = data.data.lead;
      setLead(lead);
    }
    catch (e) {
      alert('Error getting Lead');
      console.error('Error getting Lead', e);
    }
  };

  useEffect(() => {
    if (leadId) getLead(leadId);
  }, [toggleSearch]);

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    setToggleSearch(!toggleSearch);
  };

  return (
    <section className="info">
      <h3>A LEAD</h3>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <label>
            Lead ID:
            <input
              type="text"
              value={leadId}
              onChange={(el) => { setLeadId(el.target.value) }}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      {
        (!lead || !lead.id) ? 'No lead'  :
          <table border={1}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Mobile</td>
              <td>Postcode</td>
              <td>Service</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.mobile}</td>
              <td>{lead.postcode}</td>
              <td>{lead.serviceType}</td>
            </tr>
          </tbody>
        </table>
      }
    </section>
  );
}