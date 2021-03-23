import React, { useEffect, useState } from 'react';
import {StatusBar, FlatList, ActivityIndicator } from 'react-native';
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
  Loader,
  LoaderText,
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
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const apiURL = `https://api.github.com/repos/frontendbr/vagas/issues?page=${page}&per_page=25`
    await axios.get(apiURL).then(response => setIssues(issues.concat(response.data))).catch(err => console.log(err));
    setLoading(false);
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
          <Labels backgroundColor={label.name} key={label.id}>{label.name}</Labels>
        ))}
      </LabelsContainer>
    </Issue>
  )

  const renderFooter = () => (
    <Loader>
      <ActivityIndicator size='large' color='#ffa500'/>
    </Loader>
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
            onPress={() => handlePress(tag.name)}
          >
            <LabelText isActive={tag.name === tagFilter ? '#fff' : '#000'}>{tag.name}</LabelText>
          </Tag>
        ))}
      </FiltersContainer>

      <Container>
        { loading ? 
          <Loader>
            <ActivityIndicator size='large' color='#ffa500'/>
            <LoaderText>Carregando</LoaderText> 
          </Loader>
          : 
          <FlatList
            onEndReached={() => setPage(page + 1)}
            onEndReachedThreshold={0.5}
            data={filteredIssues ? filteredIssues : issues}
            keyExtractor={issue => issue.html_url}
            renderItem={renderIssue}
            ListFooterComponent={renderFooter}
          />
        }


        
      </Container>
    </>
  );
}

export default App;
