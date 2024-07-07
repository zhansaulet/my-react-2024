import { Component, ChangeEvent } from 'react';
import SearchBar from './components/SearchBar';

const BASE_URL = 'https://swapi.dev/api';

interface Person {
  id: number;
  name: string;
  age: number;
}

interface PeopleListProps {
  people: Person[];
}

class App extends Component<PeopleListProps, PeopleListProps> {
  constructor(props: PeopleListProps) {
    super(props);
    this.state = {
      people: []
    };
  }

  fetchPeople = async (searchTerm: ChangeEvent<Element>) => {
    console.log('Search Term:', searchTerm);
    const response = await fetch(`${BASE_URL}/people/?page=1`);
    const data = await response.json();
    this.setState({ people: data });
    console.log(this.state.people);
  };

  render() {
    return (
      <div>
        <SearchBar term='' placeholder='' onInputSubmit={this.fetchPeople} />
      </div>
    );
  }
}

export default App;
