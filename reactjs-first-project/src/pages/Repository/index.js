import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  FaSpinner,
  FaArrowLeft,
  FaStar,
  FaExclamationCircle,
  FaCode,
} from 'react-icons/fa';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  OwnerProfile,
  RepoInfo,
  IssueList,
  FilterList,
  PageNav,
} from './repositoryStyles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'All Issues', active: true },
      { state: 'open', label: 'Open', active: false },
      { state: 'closed', label: 'Closed', active: false },
    ],
    filterIndex: 0,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find(filter => filter.active).state,
          per_page: 4,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadFilters = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 4,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handleFilters = async filterIndex => {
    await this.setState({ filterIndex });
    this.loadFilters();
  };

  handlePage = async action => {
    const { page } = this.state;
    await this.setState({ page: action === 'back' ? page - 1 : page + 1 });
    this.loadFilters();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      filterIndex,
      page,
    } = this.state;

    if (loading) {
      return (
        <Container>
          <Loading loading={loading ? 1 : 0}>
            <FaSpinner color="#7159c1" size={24} />
          </Loading>
        </Container>
      );
    }

    return (
      <Container>
        <Owner>
          <div>
            <Link to="/">
              <FaArrowLeft color="#7159c1" size={16} />
            </Link>
          </div>

          <OwnerProfile>
            <a
              href={repository.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
            </a>
            <h2>{repository.owner.login}</h2>
          </OwnerProfile>

          <RepoInfo>
            <h1>
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repository.name}
              </a>
            </h1>
            <div>
              <p>
                <FaCode color="#fff" />
                &nbsp;code<span>{repository.language}</span>
              </p>
              <p>
                <FaExclamationCircle color="#FFF" size={12} />
                &nbsp;issues<span>{repository.open_issues_count}</span>
              </p>
              <p>
                created at
                <span>
                  {new Date(repository.created_at).toLocaleDateString()}
                </span>
              </p>
              <p>
                <FaStar color="#FFF" />
                <span>{repository.stargazers_count}</span>
              </p>
            </div>
            <p>{repository.description}</p>
          </RepoInfo>
        </Owner>

        <IssueList>
          <FilterList active={filterIndex}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.state}
                onClick={() => this.handleFilters(index)}
              >
                {filter.label}
              </button>
            ))}
          </FilterList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <PageNav>
            <button
              type="button"
              disabled={page < 2}
              onClick={() => this.handlePage('back')}
            >
              <GoArrowLeft />
              Prev. Page
            </button>
            <button type="button" onClick={() => this.handlePage('next')}>
              Next Page
              <GoArrowRight />
            </button>
          </PageNav>
        </IssueList>
      </Container>
    );
  }
}
