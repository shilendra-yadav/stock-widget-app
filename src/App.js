import './App.css';
import React from 'react';
import AutoComplete from './components/autoComplete';
import Details from './components/details';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchedResults: {},
      searchData: [],
      current: 0
    }
  }

  onSelect = (data) => {
    let { searchedResults, searchData } = this.state

    if (!searchedResults[data['symbol']]) {
      let key = data.symbol
      let inpt = {}
      inpt[key] = data;
      let curr = searchData.length ?? 0;
      this.setState({ searchedResults: { ...searchedResults, inpt }, searchData: [...searchData, data], current: curr })
    }


  }


  onNext = () => {
    let { current, searchData } = this.state;
    if (current > 0 && current < searchData.length) {
      this.setState(prevState => {
        return { current: prevState.current - 1 }
      })
    }
  }

  onPrev = () => {
    let { current, searchData } = this.state;

    if (current < searchData.length - 1) {
      this.setState(prevState => {
        return { current: prevState.current + 1 }
      })
    }
  }

  render() {
    const { searchData, current } = this.state;
    const {title, timer} = this.props
    return (
      <div className="App">
        <h3>{title || 'Stock Widget Application'}</h3>
        <AutoComplete onSelectItem={this.onSelect} />
        {searchData && searchData.length > 0 && <Details stockList={searchData} current={current} onPrev={this.onPrev} onNext={this.onNext}  timer={timer}/>}
      </div>
    );
  }
}

export default App;
