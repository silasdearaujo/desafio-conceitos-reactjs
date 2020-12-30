import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  
  const [input, setInput] = useState('');

  async function handleAddRepository() {
    
    // if (!`${input}`.trim().length) {
    //   alert('Favor digitar um repositório.');
    //   return;
    // }
    
    const response  = await api.post('/repositories', {
      title: `${input}`,
      url: 'http:github.com/silasdearaujo',
      techs: ['ReactJS']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response  = await api.delete(`/repositories/${id}`, {
      id: `${id}`      
    });

    const repository = response.data;

    setRepositories(repositories.filter(repository => repository.id != id));
  }
  
  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)}/>
      <br/>
      <button onClick={handleAddRepository}>Adicionar</button>
      <br/>
      <br/>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          <ul>
            <li><a href={repository.url} targe="_blank">{repository.title}</a></li>
            <li>Likes: {repository.likes}</li>
          </ul>
          <button onClick={() => handleRemoveRepository(`${repository.id}`)}>
            Remover
          </button>
        </li>)}
      </ul>

    </div>
  );
}

export default App;
