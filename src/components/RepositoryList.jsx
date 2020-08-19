import React, {useState, useEffect} from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';
import { GET_REPOSITORIES2 } from '../graphql/queries';


const RepositoryList = () => {
  const [criteria, setCriteria] = useState("Latest");
  const [getRepositories, result] = useLazyQuery(GET_REPOSITORIES2); 

  useEffect(()=>{
    const variables = {
      "by": criteria=="Latest"? "CREATED_AT" : "RATING_AVERAGE",
      "direction": criteria == "Lowest" ? "ASC" : "DESC"
    };

    getRepositories({ variables });
  }, [criteria]);

  const onChange = (value) => {
    console.log(value);
    setCriteria(value);
  };
  
  if (!result.data) {
    return null;
  }

  const repositories = result.data.repositories;

  return <RepositoryListContainer repositories={repositories} onChange={onChange} />;
};

export default RepositoryList;