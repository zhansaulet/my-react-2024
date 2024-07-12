import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import PersonCard from './components/PersonCard/PersonCard';
import './App.scss';

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

export interface IPerson extends ICharacter {
  starships?: IStarship[];
  vehicles?: IVehicle[];
  birth_year: string;
  gender?: Gender;
  eyeColor: string;
  species: ISpecies[];
  mass: number;
  height: number;
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

// interface IAppProps {
//   isLoading: boolean;
//   savedSearchTerm: string;
//   people?: IPerson[];
//   selectedPerson?: IPerson[];
//   selectedPersonName?: string;
// }

interface PagedResults<T> {
  count: number;
  next?: string;
  previous: string;
  results: T[];
}

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [people, setPeople] = useState<IPerson[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<IPerson[]>([]);
  const savedSearchTerm = localStorage.getItem('searchTerm') || '';

  const handleFetchPeople = async (): Promise<void> => {
    setIsLoading(true);
    const response = await fetch(`${BASE_URL}/people/?page=1`);
    const data: PagedResults<IPerson> = await response.json();

    setIsLoading(false);
    setPeople(data.results);
  };

  const handleSearchSubmit = async (searchTerm: string) => {
    setIsLoading(true);
    const response = await fetch(`${BASE_URL}/people/?search=${searchTerm}`);
    const data: PagedResults<IPerson> = await response.json();

    setIsLoading(false);
    setSelectedPerson(data.results);
  };

  useEffect(() => {
    if (savedSearchTerm) {
      handleSearchSubmit(savedSearchTerm);
    } else {
      handleFetchPeople();
    }
  });

  const renderLoader = () => {
    return <h1>Loading...</h1>;
  };

  const throwError = () => {
    throw new Error('Test error thrown by button click');
  };

  return (
    <div>
      <div className='flex gap-2'>
        <SearchBar onSubmit={handleSearchSubmit} placeholder='' />
        <button
          className='relative z-[2] h-[35px] flex items-center rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bg-[#3B71CA]'
          onClick={throwError}
        >
          Throw Error
        </button>
      </div>
      {isLoading ? (
        renderLoader()
      ) : (
        <div>
          <h1 className='mb-3 font-bold text-lg'>Star Wars People</h1>
          {!selectedPerson ? (
            <PersonCard characters={people} />
          ) : (
            <div>
              <p className='mb-3 font-bold text-md'>Search Result:</p>
              <PersonCard characters={selectedPerson} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
// class App extends Component<object, IAppProps> {
//   state: Readonly<IAppProps> = {
//     isLoading: false,
//     savedSearchTerm: localStorage.getItem('searchTerm') || ''
//   };

//   async componentDidMount(): Promise<void> {
//     const { savedSearchTerm } = this.state;
//     if (savedSearchTerm) {
//       this.handleSearchSubmit(savedSearchTerm);
//     } else {
//       this.handleFetchPeople();
//     }
//   }

//   handleFetchPeople = async (): Promise<void> => {
//     this.setState({ isLoading: true });
//     const response = await fetch(`${BASE_URL}/people/?page=1`);
//     const data: PagedResults<IPerson> = await response.json();

//     this.setState({
//       isLoading: false,
//       people: data.results
//     });
//   };

//   handleSearchSubmit = async (searchTerm: string) => {
//     this.setState({ isLoading: true });
//     const response = await fetch(`${BASE_URL}/people/?search=${searchTerm}`);
//     const data: PagedResults<IPerson> = await response.json();

//     this.setState({
//       isLoading: false,
//       selectedPerson: data.results
//     });
//   };

//   renderLoader() {
//     return <h1>Loading...</h1>;
//   }

//   throwError = () => {
//     this.setState(() => {
//       throw new Error('Test error thrown by button click');
//     });
//   };

//   render() {
//     return (
//       <div>
//         <div className='flex gap-2'>
//           <SearchBar onSubmit={this.handleSearchSubmit} placeholder='' />
//           <button
//             className='relative z-[2] h-[35px] flex items-center rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bg-[#3B71CA]'
//             onClick={this.throwError}
//           >
//             Throw Error
//           </button>
//         </div>
//         {this.state.isLoading ? (
//           this.renderLoader()
//         ) : (
//           <div>
//             <h1 className='mb-3 font-bold text-lg'>Star Wars People</h1>
//             {!this.state.selectedPerson ? (
//               <PersonCard characters={this.state.people} />
//             ) : (
//               <div>
//                 <p className='mb-3 font-bold text-md'>Search Result:</p>
//                 <PersonCard characters={this.state.selectedPerson} />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

export default App;
