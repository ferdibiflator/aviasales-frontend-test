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
        <li className="filter-transfers-list-item" key={count}>
          <span className="filter-transfers-list-item__checkbox-line"
                onClick={this.toggleTransfersCount.bind(this, count)}>
            <div className={"filter-checkbox" + (isCountActive(count) ? " filter-checkbox--active" : "")}>
              <i className="filter-checkbox__check"></i>
            </div>
            <span>{count}</span>
          </span>
          <span className="filter-transfers-list-item__only-line" onClick={this.checkOnly.bind(this, count)}>
            ТОЛЬКО
          </span>
        </li>
      ));

    return <div className="filter">
      <div className="filter__title">КОЛИЧЕСТВО ПЕРЕСАДОК</div>

      <div className="filter__transfers">
        <ul className="filter-transfers-list">
          <li className="filter-transfers-list-item">
            <span className="filter-transfers-list-item__checkbox-line"
                  onClick={this.toggleAll.bind(this)}>
              <div className={"filter-checkbox" + (isAllActive() ? " filter-checkbox--active" : "")}>
                <i className="filter-checkbox__check"></i>
              </div>
              <span>Все</span>
            </span>
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

  checkOnly(count) {
    this.setActiveTransfersCount([count]);
  }

  setActiveTransfersCount(activeTransfers) {
    this.setState({
      activeTransfers: activeTransfers
    });

    this.props.onChange(activeTransfers);
  }
}

export default Filter;