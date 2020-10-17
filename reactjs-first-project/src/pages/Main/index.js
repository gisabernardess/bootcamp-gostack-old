/* eslint-disable react/state-in-constructor */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithubAlt,
  FaPlus,
  FaSpinner,
  FaExclamationTriangle,
  FaTrash,
  FaStar,
} from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, ErrorMessage, List } from './mainStyles';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // carregar os dados do localStorage
  useEffect(() => {
    const repoStorage = localStorage.getItem('repositories');
    if (repoStorage) {
      setRepositories(JSON.parse(repositories));
    }
  }, []);

  // salvar os dados do localStorage
  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      if (newRepo === '') throw new Error('You need to inform one repository');

      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        fullName: response.data.full_name,
        name: response.data.name,
        description: response.data.description,
        stars: response.data.stargazers_count,
        owner: {
          name: response.data.owner.login,
          avatar_url: response.data.owner.avatar_url,
        },
      };

      const hasRepo = repositories.find(
        repo => repo.name.toLowerCase() === data.name.toLowerCase()
      );

      if (hasRepo) throw new Error('Duplicated Repository');

      setRepositories(response.data);
      setNewRepo('');
      setError(false);
      setErrorMessage('');
    } catch (Error) {
      setError(true);
      setErrorMessage(
        Error.message === 'Request failed with status code 404'
          ? 'Repository not found'
          : Error.message
      );
    } finally {
      setLoading(false);
    }
  }

  function handleDelete(repo) {
    setRepositories(
      repositories.filter(repository => repository.name !== repo.name)
    );
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositories List
      </h1>
      <Form onSubmit={handleSubmit} error={error ? 1 : 0}>
        <input
          type="text"
          placeholder={error ? 'Try again' : 'Add a repository'}
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
              <FaPlus color="#FFF" size={14} />
            )}
        </SubmitButton>
      </Form>
      <ErrorMessage>
        {error ? (
          <small>
            <FaExclamationTriangle color="red" />
            {errorMessage}
          </small>
        ) : (
            <></>
          )}
      </ErrorMessage>

      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>
                <Link
                  to={`/repository/${encodeURIComponent(repository.fullName)}`}
                >
                  {repository.name}
                </Link>

                <span>
                  <FaStar size={12} />
                  {repository.stars}
                </span>
              </strong>
              <p>{repository.owner.name}</p>
              <p>{repository.description}</p>
            </div>
            <button type="button" onClick={() => handleDelete(repository)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </List>
    </Container>
  );
}
