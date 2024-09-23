import React, { useEffect, useState } from 'react';
import '../main/Main.css';

export default function List() {
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [leads, setLeads] =  useState([
    // {
    //   "id": 3,
    //   "name": "Jane Doe",
    //   "email": "janedoe@domain.com",
    //   "mobile": 123456788,
    //   "postcode": 6013,
    //   "service": 0,
    //   "serviceType": "delivery"
    // }
  ]);

  const getLeads = async () => {
    try {
      const response  = await fetch(`http://localhost:3002/graphql?query={leads{id,name,email,mobile,postcode,service,serviceType}}`);
      const data = await response.json();
      const leads = data.data.leads;
      setLeads(leads);
    }
    catch (e) {
      alert('Error getting Leads');
      console.error('Error getting Leads', e);
    }
  };

  useEffect(() => {
    getLeads();
  }, [toggleRefresh]);

  const handleRefresh = () => {
    setToggleRefresh(!toggleRefresh);
  };

  return (
    <section className="list">
      <h3>LIST OF LEADS</h3>
      <div>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
      {
        (!leads.length) ?  'No leads' :
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
              {
                leads.map((lead: any, index) => 
                  <tr key={'leads-' +  index}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.mobile}</td>
                    <td>{lead.postcode}</td>
                    <td>{lead.serviceType}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
      }
    </section>
  );
}