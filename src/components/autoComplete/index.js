import React, {Component, createRef} from 'react';
import './index.css';
import { debounce } from '../../utils/common';
import { getStocksList, getStockDetails } from '../../controller/api';
import { constants } from '../../utils/contants';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputStr: '',
      inputList: [],
        stock: null,
      isLoading: false,
      error: {
        status: false,
        message: {}
      }
    };
    this.searchRef = createRef(); 
    this.delayedCallback = debounce(this.fetchList, constants.DEBOUNCE_DELAY);
  }

  onInputChangeHandler = e => {
    const { value } = e.target;
    this.setState({ inputStr: value });
    this.delayedCallback();
  };

  fetchList = async () => {
    const { inputStr } = this.state;
    if(!inputStr) return

    this.setState({ isLoading: true });
    try {
      const data = await getStocksList(inputStr);
      console.log(data)
      this.setState({ inputList: data && data.bestMatches });
    } catch (error) {
      this.setState({ error});
      setTimeout(()=> {
        this.setState({error: {status:false, message: ''}})
      }, 4000)
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onItemClick = (item) => {
    this.getStockDetails(item)
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { inputStr } = this.state;
    this.getStockDetails(inputStr);

  }

  getStockDetails = async (value) => {
    if (!value) return
    this.setState({ isLoading: true });

    try {
      const data = await getStockDetails(value);
      this.setState({ stock: data, inputStr: '', inputList:[] });
      const { onSelectItem } = this.props;
      onSelectItem && onSelectItem(data);
     
    } catch (error) {
      this.setState({ error: error, inputStr: '', inputList:[] });
      setTimeout(()=> {
        this.setState({error: {status:false, message: ''}})
      }, 4000)
    } finally {
        this.searchRef.current.value =''
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { inputList, isLoading, error } = this.state;

    const list = inputList && inputList.length && inputList.map(e => {
      return (
        <li
          key={e[constants.symbol]}
          onClick={() => this.onItemClick(e[constants.symbol])}
          className="listItem"
        >
       
         <span>{e[constants.name]}</span> 
         <span className="symbol">({e[constants.symbol]})</span>
        </li>
      );
    });
    const canShow = inputList && inputList.length > 0 && !isLoading;

    return (
      <div className="main-wrapper">
        <form className={`control ${ isLoading ? 'isLoading': '' }`} onSubmit={this.onSubmit}>
          <input
            type="search"
            className="searchBox"
            onChange={this.onInputChangeHandler}
            ref={this.searchRef}
            placeholder="search"
          />
          <button type="submit" className="button"> Submit </button>
        </form>
        {isLoading && <span className="loader">{constants.Loading}</span>}
        {error.status && <span className="error"> {error.message}</span> }
        {canShow && (
          <div className="displayArea isHoverable">
          {list}
          </div>
        )}
      </div>
    );
  }
}

export default AutoComplete;