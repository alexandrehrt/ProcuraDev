import React, { useEffect, useState } from 'react';
import {StatusBar, FlatList } from 'react-native';
import axios from 'axios';
import * as Linking from 'expo-linking';

import { 
  Container, 
  Issue, 
  IssueText, 
  Labels, 
  FiltersContainer,
  LabelsContainer,
  LabelText,
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
  const [filteredIssues, setFilteredIssues] = useState<Issue[] | ''>();
  const [tagFilter, setTagFilter] = useState('All');

  const getData = async () => {
    const apiURL = `https://api.github.com/repos/frontendbr/vagas/issues?page=${page}&per_page=25`
    await axios.get(apiURL).then(response => setIssues(issues.concat(response.data))).catch(err => console.log(err));
  };

  useEffect(() => {
    getData();
  }, [page])

  const handlePress = (level:String) => {
    setTagFilter(level);

    if (level === 'All') return setFilteredIssues('');

    const filteredList = issues.filter(issue => issue.labels.find(label => label.name === level))
    setFilteredIssues(filteredList);
  }

  const renderIssue = ({ item }) => (
    <Issue onPress={() => Linking.openURL(item.html_url)}>
      <IssueText>{item.title}</IssueText>
      <LabelsContainer>
        {item.labels.map((label:Label) => (
          <Labels key={label.id}>{label.name}</Labels>
        ))}
      </LabelsContainer>
    </Issue>
  )

  const tagsList = [
    { name: 'All' },
    { name: 'Júnior' },
    { name: 'Pleno' },
    { name: 'Sênior' },
  ]

  return (
    <>
      <StatusBar backgroundColor='#312e38'/>

      <FiltersContainer>
        {tagsList.map(tag => (
          <Tag 
            key={tag.name}
            backgroundColor={tag.name}
            // backgroundColor={tag.name === tagFilter ? '#ffa500' : 'lightblue'}
            onPress={() => handlePress(tag.name)}
          >
            <LabelText isActive={tag.name === tagFilter ? '#fff' : '#000'}>{tag.name}</LabelText>
          </Tag>
        ))}
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
