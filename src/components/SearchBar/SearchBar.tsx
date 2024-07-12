import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './SearchBar.module.scss';

interface SearchTermProps {
  onSubmit: (searchTerm: string) => void;
  placeholder: string;
}

const SearchBar = (props: SearchTermProps) => {
  const savedSearchTerm = localStorage.getItem('searchTerm') || '';
  const [term, setTerm] = useState(savedSearchTerm);

  const handleChange = (e: ChangeEvent) => {
    if (e.target) {
      setTerm((e.target as HTMLInputElement).value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(term);
    localStorage.setItem('searchTerm', term);
  };

  return (
    <div className='mb-5 relative flex w-[400px] flex-wrap items-stretch'>
      <form
        onSubmit={handleSubmit}
        className='mb-5 relative flex w-full flex-wrap items-stretch'
      >
        <input
          type='search'
          className={styles.searchBar}
          value={term}
          onChange={handleChange}
        />
        <button type='submit' className={styles.searchBtn}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
