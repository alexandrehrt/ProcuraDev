import React, { useEffect, useState } from 'react';
import {StatusBar, FlatList, Text, View } from 'react-native';
import axios from 'axios';
import * as Linking from 'expo-linking';

import { 
  Container, 
  Issue, 
  IssueText, 
  Labels, 
  FiltersContainer, 
  Tag } from './styles';

interface Label {
  id: number;
  name: string
}

interface Issue {
  id: number;
  title: string;
  labels: Array<Label>;
  url: string;
  html_url: string;
}

 const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState();

  const getData = async () => {
    const apiURL = `https://api.github.com/repos/frontendbr/vagas/issues?page=${page}&per_page=25`
    await axios.get(apiURL).then(response => setIssues(issues.concat(response.data))).catch(err => console.log(err));
  };

  useEffect(() => {
    getData();
  }, [page])

  const handlePress = (level) => {
    if (level === 'All') {
      setFilteredIssues('');
      return;
    };
    const filteredList = issues.filter(issue => issue.labels.find(label => label.name === level))
    setFilteredIssues(filteredList);
  }

  const renderIssue = ({ item }) => (
    <Issue onPress={() => Linking.openURL(item.html_url)}>
      <IssueText>{item.title}</IssueText>
      {item.labels.map(label => (
        <Labels key={label.id}>{label.name}</Labels>
      ))}
    </Issue>
  )

  return (
    <>
      <StatusBar backgroundColor='#312e38'/>

      <FiltersContainer>
        <Tag onPress={() => handlePress('All')}><Text>Todos</Text></Tag>
        <Tag onPress={() => handlePress('Júnior')}><Text>Júnior</Text></Tag>
        <Tag onPress={() => handlePress('Pleno')}><Text>Pleno</Text></Tag>
        <Tag onPress={() => handlePress('Sênior')}><Text>Sênior</Text></Tag>
      </FiltersContainer>

      <Container>
        <FlatList
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={0.5}
          data={filteredIssues ? filteredIssues : issues}
          keyExtractor={issue => issue.html_url}
          renderItem={renderIssue}
        />
      </Container>
    </>
  );
}

export default App;
