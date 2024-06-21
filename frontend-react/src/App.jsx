import React from 'react';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to='/items'>Items</NavLink>
          </li>
          <li>
            <NavLink to='/tags'>Tags</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
