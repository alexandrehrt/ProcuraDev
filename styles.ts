import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
    flex: 1;
    background: #312e38;
    padding: 10px;
`;

export const Issue = styled(RectButton)`
  margin: 10px;
  /* height: 80px; */
  border-radius: 8px;
  background: #fff;
  padding: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

export const IssueText = styled.Text`
  font-size: 16px;
`; 

export const Labels = styled.Text`
  padding: 4px;
  border-radius: 8px;
  color: blue;
  background: lightblue;
  margin: 4px;
`;