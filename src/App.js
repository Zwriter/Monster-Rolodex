import { Component } from 'react';

import './components/card-list/card-list.component';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';


class App extends Component {
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
    console.log('constructor');
  }

  componentDidMount(){
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => 
      this.setState(
        () => {
          return { monsters: users };
        },
        () => {
          console.log(this.state);
        }
      )
    );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState(() => {
        return { searchField };
    });
 };

  render(){
    console.log('render');

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>

        <SearchBox 
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters' 
        />
       <CardList monsters={ filteredMonsters }/>
      </div>
    );
  };

}

export default App;


/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/