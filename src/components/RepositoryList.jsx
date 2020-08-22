import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const [criteria, setCriteria] = useState("Latest");
  const [key, setKey] = useState("");

  const variables = {
    "by": criteria=="Latest"? "CREATED_AT" : "RATING_AVERAGE",
    "direction": criteria == "Lowest" ? "ASC" : "DESC",
    "key": key,
    first: 5,
  };

  const { repositories, fetchMore } = useRepositories(variables);

  const onChange = (value) => {
    setCriteria(value);
  };
  
  const [onSeachChange] = useDebouncedCallback(
    (value) => setKey(value),
    1000
  );

  if (!repositories || repositories.length==0) {
    return null;
  }

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onChange={onChange}
      value={criteria}
      onSeachChange={onSeachChange}
      search={key}
      onEndReach={onEndReach}
    />);
};

export default RepositoryList;