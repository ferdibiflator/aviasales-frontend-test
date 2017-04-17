import React, {Component} from 'react';
import Filter from '../Filter/Filter';
import Ticket from '../Ticket/Ticket';
import './TicketsPage.css';
import http from '../../utils/http';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class TicketsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets  : [],
      filter   : {
        transfers: []
      },
      isLoading: true
    };
  }

  componentDidMount() {
    http.get('/tickets.json', null, response => this.setState({
      tickets  : response.tickets,
      isLoading: false
    }));
  }

  render() {
    if (this.state.isLoading) return null;

    const tickets = this.state.tickets
      .filter(ticket => this.state.filter.transfers.indexOf(ticket.stops) > -1)
      .sort(byPriceAsc)
      .map(ticketInfo => <Ticket data={ticketInfo} key={JSON.stringify(ticketInfo)}/>);

    const transfers = this.state.tickets
      .reduce(collectTransfers, []);

    return (
      <div className="tickets-page">
        <div className="tickets-page__header">
          <img className="tickets-page-logo" src="/images/plane.svg"/>
        </div>

        <div className="tickets-page__instruments">
          <Filter transfers={transfers} onChange={this.handleFilterChange.bind(this)}/>
        </div>

        <div className="tickets-page__tickets">
          <CSSTransitionGroup
            transitionName="transition-tickets"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            {tickets}
          </CSSTransitionGroup>
        </div>
      </div>
    );

    function byPriceAsc(ticketA, ticketB) {
      return ticketA.price < ticketB.price ? -1 : +1;
    }

    function collectTransfers(arr, ticket) {
      if (arr.indexOf(ticket.stops) < 0) arr.push(ticket.stops);

      return arr;
    }
  }

  handleFilterChange(transfers) {
    this.setState({
      filter: {
        transfers: transfers
      }
    });
  }
}

export default TicketsPage;