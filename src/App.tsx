import { Component } from 'react';
import SearchBar from './components/SearchBar';

const BASE_URL = 'https://swapi.dev/api';

interface IEntity {
  id: number;
  edited: string;
  created: string;
  url: string;
  films?: IFilm[];
}

interface IFilm extends IEntity {
  species: ISpecies[];
  releaseDate: string;
  title: string;
  producer: string;
  starships?: IStarship[];
  vehicles?: IVehicle[];
  episodeId: number;
  planets: IPlanet[];
  director: string;
  characters: IPerson[];
  openingCrawl: string;
}

interface ICharacter extends IEntity {
  name: string;
  homeworld?: IPlanet;
  skinColors: string[];
  hairColors: string[];
}

interface ISpecies extends ICharacter {
  designation: string;
  name: string;
  people?: IPerson[];
  language: string;
  averageLifespan: number;
  averageHeight: number;
  eyeColors: string[];
}

type Gender = 'male' | 'female' | 'n/a' | 'unknown';

interface IPerson extends ICharacter {
  starships?: IStarship[];
  vehicles?: IVehicle[];
  birthYear: string;
  gender?: Gender;
  eyeColor: string;
  species: ISpecies[];
  mass: number;
}

interface IPlanet extends IEntity {
  orbitalPeriod: number;
  climate: string;
  rotationPeriod: number;
  terrain: string;
  residents?: IPerson[];
  population: number;
  surfaceWater: number;
}

interface IStarship extends IVehicle {
  hyperdriveRating: string;
  MGLT: number;
  starshipClass: string;
}

interface IVehicle extends IEntity {
  length: number;
  manufacturer: string;
  cargoCapacity: number;
  maxAtmosphericSpeed: number;
  costInCredits: number;
  pilots?: IPerson[];
  consumables: number;
  model: string;
  vehicleClass: string;
  passengers: number;
  crew: number;
}

interface IAppProps {
  isLoading: boolean;
  people?: IPerson[];
  selectedPerson?: IPerson;
  selectedPersonName?: string;
}

interface PagedResults<T> {
  count: number;
  next?: string;
  previous: string;
  results: T[];
}

class App extends Component<object, IAppProps> {
  state: Readonly<IAppProps> = {
    isLoading: true
  };

  async componentDidMount(): Promise<void> {
    const response = await fetch(`${BASE_URL}/people/?page=1`);
    const data: PagedResults<IPerson> = await response.json();

    this.setState({
      isLoading: false,
      people: data.results
    });
    console.log(this.state.people);
  }

  renderLoader() {
    return <h1>Loading...</h1>;
  }

  render() {
    return (
      <div>
        <SearchBar term='' placeholder='' />
        {this.state.isLoading ? (
          this.renderLoader()
        ) : (
          <div>
            <h3>Star Wars People</h3>
            <ul>
              {this.state.people?.map((person, index) => (
                <li key={index}>{person.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default App;
