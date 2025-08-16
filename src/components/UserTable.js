import React, { useState } from 'react';

function UserTable({ users, sortConfig, onSort, visibleColumns, onResetData }) {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleSortChange = (column, event) => {
    const value = event.target.value;
    if (value === "reset") {
      onSort(column, "reset"); 
    } else {
      onSort(column, value);
    }
  };

  return (
    <div className="table-container">
      <table>
        <caption>List of users</caption> 

        
        
        <thead>
          <tr>
            {visibleColumns.name && (
              <th scope="col">
                Name
                <select className='column-select' onChange={(e) => handleSortChange('name', e)}>
                  <option value="reset">Export Order</option>
                  <option value="asc">A → Z</option>
                  <option value="desc">Z → A</option>
                </select>
              </th>
            )}
            {visibleColumns.email && (
              <th scope="col">
                Email
                <select className='column-select' onChange={(e) => handleSortChange('email', e)}>
                  <option value="reset">Export Order</option>
                  <option value="asc">A → Z</option>
                  <option value="desc">Z → A</option>
                </select>
              </th>
            )}
            {visibleColumns.company && (
              <th scope="col">
                Company
                <select className='column-select' onChange={(e) => handleSortChange('company', e)}>
                  <option value="reset">Export Order</option>
                  <option value="asc">A → Z</option>
                  <option value="desc">Z → A</option>
                </select>
              </th>
            )}
            {visibleColumns.phone && <th scope="col">Phone</th>}
            {visibleColumns.website && <th scope="col">Website</th>}
            {visibleColumns.address && <th scope="col">Address</th>}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <tr>
                {visibleColumns.name && <td>{user.name}</td>}
                {visibleColumns.email && <td>{user.email}</td>}
                {visibleColumns.company && <td>{user.company.name}</td>}
                {visibleColumns.phone && <td>{user.phone}</td>}
                {visibleColumns.website && <td>{user.website}</td>}
                {visibleColumns.address && <td>{user.address.city}</td>}
                <td className='actions-cell'>
  {visibleColumns.email && (
    <button onClick={() => navigator.clipboard.writeText(user.email)}>
      Copy Email
    </button>
  )}

  {visibleColumns.phone && (
    <button onClick={() => navigator.clipboard.writeText(user.phone)}>
      Copy Phone
    </button>
  )}
                  <button onClick={() => toggleExpand(user.id)}>
                    {expandedRow === user.id ? 'Hide' : 'Details'}
                  </button>
                </td>
              </tr>
              {expandedRow === user.id && (
                <tr className="expanded">
                  <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 1}>
                    <strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode} <br />
                    <strong>Company:</strong> {user.company.catchPhrase} ({user.company.bs})
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <p className="table-footer">
  Users fetched from
    https://jsonplaceholder.typicode.com/users
  
</p>

    </div>
  );
}

export default UserTable;
