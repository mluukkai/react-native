import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useDebounce,  useDebouncedCallback } from 'use-debounce'
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';
import { GET_REPOSITORIES } from '../graphql/queries';

const RepositoryList = () => {
  const [criteria, setCriteria] = useState("Latest");
  const [key, setKey] = useState("");

  const variables = {
    "by": criteria=="Latest"? "CREATED_AT" : "RATING_AVERAGE",
    "direction": criteria == "Lowest" ? "ASC" : "DESC",
    "key": key,
    first: 5,
  };

  const [ keydebounce ] = useDebounce(key, 1000);
  const { repositories, fetchMore } = useRepositories(variables);
  
  /*
   const [getRepositories, result] = useLazyQuery(GET_REPOSITORIES); 
  useEffect(()=>{
    const variables = {
      "by": criteria=="Latest"? "CREATED_AT" : "RATING_AVERAGE",
      "direction": criteria == "Lowest" ? "ASC" : "DESC",
      "key": key
    };

    //getRepositories({ variables });
    
  }, [criteria, keydebounce]);
  */

  const onChange = (value) => {
    setCriteria(value);
  };
  
  const [onSeachChange2] = useDebouncedCallback(
    // function
    (value) => {
      setKey(value);
    },
    // delay in ms
    1000
  );

  const onSeachChange = (value) => {
    setKey(value);
  };

  if (!repositories || repositories.length==0) {
    return null;
  }

  //const repositories = result.data.repositories;

  const onEndReach = () => {
    console.log('end');
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