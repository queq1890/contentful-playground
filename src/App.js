import React, { useState, useEffect } from 'react';
import * as contentful from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import './App.css';

const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE, 
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN,
})

function App() {
  const [entries, setEntries] = useState([])
  useEffect(() => {
    client.getEntries()
    .then((response) => {
      setEntries(response.items)
    })
    return
  }, [])

  return (
    <div className="App">
      { entries.length > 0 && entries.map(entry => (
        <div>
          <h1>
            {entry.fields.title}
          </h1>
          {documentToReactComponents(entry.fields.body)}
        </div>
      ))}
    </div>
  );
}

export default App;
