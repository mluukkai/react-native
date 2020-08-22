import React from 'react';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

const SingleRepositoryItem = () => {
  const { id } = useParams();

  const data = useRepository({ 
    id,
    first: 2, 
  });

  const item = data ? data.repository: null;

  if (!item) {
    return null;
  }

  const onEndReach = () => {
    console.log("end...");
    data.fetchMore();
  };

  return (
    <RepositoryItem
      item={item}
      openable={true}
      onEndReach={onEndReach}
    />
  );
};

export default SingleRepositoryItem;