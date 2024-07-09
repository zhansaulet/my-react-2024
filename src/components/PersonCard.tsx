import { Component } from 'react';
import { IPerson } from '../App';

interface ICharacterListProps {
  characters?: IPerson[] | undefined;
}

class PersonCard extends Component<ICharacterListProps> {
  render() {
    return (
      <div className='flex gap-10 flex-wrap w-[100%]'>
        {this.props.characters &&
          this.props.characters?.map((character, index) => (
            <div className='flex flex-col gap-2' key={index}>
              <h5 className='mb-1 font-semibold'>{character.name}</h5>
              <div className='flex gap-1'>
                <p>Birth year: </p>
                <p>{character.birth_year}</p>
              </div>
              <div className='flex gap-1'>
                <p>Height: </p>
                <p>{character.height}</p>
              </div>
              <div className='flex gap-1'>
                <p>Mass: </p>
                <p>{character.mass}</p>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default PersonCard;
