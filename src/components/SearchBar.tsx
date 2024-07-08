import { ChangeEvent, Component, FormEvent } from 'react';
import styles from './SearchBar.module.scss';

interface SearchTermProps {
  term: string;
  placeholder: string;
}

interface SearchTermState {
  term: string;
}

class SearchBar extends Component<SearchTermProps, SearchTermState> {
  constructor(props: SearchTermProps) {
    super(props);
    this.state = {
      term: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e: ChangeEvent) => {
    if (e.target) this.setState({ term: (e.target as HTMLInputElement).value });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='search'
            className={styles.searchBar}
            value={this.state.term}
            onChange={this.handleChange}
          />
          <button type='submit'>Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
