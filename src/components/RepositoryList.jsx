import React, {useState, useEffect} from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce'
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';
import { GET_REPOSITORIES } from '../graphql/queries';


const RepositoryList = () => {
  const [criteria, setCriteria] = useState("Latest");
  const [key, setKey] = useState("");
  const [getRepositories, result] = useLazyQuery(GET_REPOSITORIES); 

  const [keydebounce] = useDebounce(key, 1000);
  
  useEffect(()=>{
    const variables = {
      "by": criteria=="Latest"? "CREATED_AT" : "RATING_AVERAGE",
      "direction": criteria == "Lowest" ? "ASC" : "DESC",
      "key": key
    };

    console.log(key);

    getRepositories({ variables });
  }, [criteria, keydebounce]);

  const onChange = (value) => {
    console.log(value);
    setCriteria(value);
  };
  
  const onSeachChange = (value) => {
    setKey(value);
  };

  if (!result.data) {
    return null;
  }

  const repositories = result.data.repositories;

  return (
    <RepositoryListContainer
      repositories={repositories}
      onChange={onChange}
      value={criteria}
      onSeachChange={onSeachChange}
      search={key}
    />);
};

export default RepositoryList;