import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const FiltersContainer = styled.View`
  flex-direction: row;
  background-color: #312e38;
  justify-content: center;
  align-items: center;
`;

export const Tag = styled(RectButton)`
  margin: 20px auto 0;
  padding: 10px;
  
  /* background-color: ${props => props.backgroundColor}; */
  background-color: ${props => {
    // TO DO: find out a better way to do this
    if(props.backgroundColor === 'All') return '#66ff00'
    if (props.backgroundColor === 'Júnior') return '#9966cc'
    if(props.backgroundColor === 'Pleno') return '#00ffff'
    if(props.backgroundColor === 'Sênior') return '#007fff'
  }};
  border-radius: 8px;
`;

export const LabelText = styled.Text`
  color: ${props => props.isActive};
`;

export const Container = styled.SafeAreaView`
    flex: 1;
    background: #312e38;
    padding: 10px;
`;

export const Issue = styled(RectButton)`
  margin: 10px;
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
  font-weight: 700;
`; 

export const LabelsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const Labels = styled.Text`
  padding: 4px;
  border-radius: 8px;
  color: blue;
  background: lightblue;
  margin: 4px;
`;

export const Loader = styled.View`
  margin-top: 10px;
  align-items: center;
`;