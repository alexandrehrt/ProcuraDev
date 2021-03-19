import React, { useCallback, useEffect, useState } from 'react';
import {StatusBar, FlatList, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as Linking from 'expo-linking';

import { Container, Issue, IssueText, Labels, Loader } from './styles';

interface Label {
  id: number;
  name: string
}

interface Issue {
  id: number;
  title: string;
  labels: Label[];
  url: string;
  html_url: string;
}

 const App: React.FC = () => {
   const [page, setPage] = useState(1);
   const [isLoading, setIsLoading] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);

  const getData = async () => {
    const apiURL = `https://api.github.com/repos/frontendbr/vagas/issues?page=${page}&per_page=25`
    await axios.get(apiURL).then(response => {
      setIssues(issues.concat(response.data));
      setIsLoading(false);
    });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [page])

  return (
    <>
      <StatusBar backgroundColor='#312e38'/>

      <Container>
        <FlatList
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.9}
          data={issues}
          keyExtractor={issue => issue.html_url}
          renderItem={({ item: issue }) => (
            <Issue onPress={() => Linking.openURL(issue.html_url)}>
              <IssueText>{issue.title}</IssueText>
              {issue.labels.map(label => (
                  <Labels key={label.id}>{label.name}</Labels>
              ))}
            </Issue>
          )}
        />
      </Container>
    </>
  );
}

export default App;


// body?, created_at, id, [labels].name, url, html_url