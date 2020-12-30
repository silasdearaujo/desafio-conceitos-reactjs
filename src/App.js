import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    });
  }, []);
  
  const [input, setInput] = useState('');

  async function handleAddRepository() {
    const response  = await api.post('/projects', {
      title: `${input}`,
      ownder: "Silas de Araujo"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    
  }
  
  return (
    <div>
      <input value={input} onInput={e => setInput(e.target.value)}/>
      <br/>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {projects.map(project => 
        <li key={project.id}>{project.title}
          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>)}
      </ul>

    </div>
  );
}

export default App;
