import React, { useEffect, useState } from 'react';
import {StatusBar, FlatList } from 'react-native';
import axios from 'axios';
import * as Linking from 'expo-linking';

import { Container, Issue, IssueText, Labels, LabelView } from './styles';

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
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    axios.get('https://api.github.com/repos/frontendbr/vagas/issues')
      .then(response => setIssues(response.data))
      
  }, [])

  return (
    <>
      <StatusBar backgroundColor='#312e38'/>

      <Container>
        <FlatList 
          data={issues}
          keyExtractor={issue => issue.title}
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