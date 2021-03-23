import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

/*
FILTERS
*/
export const FiltersContainer = styled.View`
  flex-direction: row;
  background-color: #312e38;
  justify-content: center;
  align-items: center;
`;

export const Tag = styled(RectButton)`
  width: 20%;
  margin: 20px auto 0;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: ${props => {
    // TO DO: find out a better way to do this
    if(props.backgroundColor === 'All') return '#66ff00'
    if (props.backgroundColor === 'Júnior') return '#9966cc'
    if(props.backgroundColor === 'Pleno') return '#00ffff'
    if(props.backgroundColor === 'Sênior') return '#007fff'
  }};
`;

export const LabelText = styled.Text`
  color: ${props => props.isActive};
`;
/*
FILTERS END
*/

/*
LIST
*/
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
  color: #000;
  margin: 4px;
  background-color: ${props => {
    // TO DO: find out a better way to do this
    if (props.backgroundColor === 'Júnior') return '#9966cc'
    if(props.backgroundColor === 'Pleno') return '#00ffff'
    if(props.backgroundColor === 'Sênior') return '#007fff'
    if(props.backgroundColor !== 'Júnior' || 'Pleno' || 'Sênior') return 'lightblue'
  }};
`;

export const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const LoaderText = styled.Text`
  font-size: 24px;
  color: #fff;
`;