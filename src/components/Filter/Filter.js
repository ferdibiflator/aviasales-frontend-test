import React, {Component} from 'react';
import './Filter.css';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTransfers: []
    };
  }

  componentDidMount() {
    this.setActiveTransfersCount(this.props.transfers.slice());
  }

  render() {
    const props = this.props;
    const state = this.state;

    const activeTransfers = this.state.activeTransfers;
    const countTransfers  = this.props.transfers
      .sort(byCountAsc)
      .map(count => (
        <li
          className={"filter-transfers-list__item" + (isCountActive(count) ? " filter-transfers-list__item--active" : "")}
          onClick={this.toggleTransfersCount.bind(this, count)}
          key={count}>
          {count}
        </li>
      ));

    return <div className="filter">
      <div className="filter__title">КОЛИЧЕСТВО ПЕРЕСАДОК</div>

      <div className="filter__transfers">
        <ul className="filter-transfers-list">
          <li className={"filter-transfers-list__item" + (isAllActive() ? " filter-transfers-list__item--active" : "")}
              onClick={this.toggleAll.bind(this)}>Все
          </li>
          {countTransfers}
        </ul>
      </div>
    </div>;

    function byCountAsc(countA, countB) {
      return countA < countB ? -1 : +1;
    }

    function isAllActive() {
      return props.transfers.length === state.activeTransfers.length;
    }

    function isCountActive(count) {
      return activeTransfers.indexOf(count) > -1;
    }
  }

  toggleAll() {
    const transfers        = this.props.transfers;
    const activeTransfers  = this.state.activeTransfers;
    let newActiveTransfers = null;

    if (activeTransfers.length === transfers.length)
      newActiveTransfers = [];
    else
      newActiveTransfers = transfers.slice();

    this.setActiveTransfersCount(newActiveTransfers);
  }

  toggleTransfersCount(count) {
    const activeTransfers    = this.state.activeTransfers;
    const index              = activeTransfers.indexOf(count);
    const newActiveTransfers = [...activeTransfers];

    if (index > -1) newActiveTransfers.splice(index, 1);
    else newActiveTransfers.push(count);

    this.setActiveTransfersCount(newActiveTransfers)
  }

  setActiveTransfersCount(activeTransfers) {
    this.setState({
      activeTransfers: activeTransfers
    });

    this.props.onChange(activeTransfers);
  }
}

export default Filter;