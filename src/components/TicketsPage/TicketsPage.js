import React, {Component} from 'react';
import Filter from '../Filter/Filter';
import Ticket from '../Ticket/Ticket';
import './TicketsPage.css';
import data from '../../../public/tickets.json';

class TicketsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: {
        transfers: []
      }
    };
  }

  render() {
    const tickets = data.tickets
      .filter(ticket => this.state.filter.transfers.indexOf(ticket.stops) > -1)
      .sort(byPriceAsc)
      .map(ticketInfo => <Ticket data={ticketInfo} key={JSON.stringify(ticketInfo)}/>);

    const transfers = data.tickets
      .reduce(collectTransfers, []);

    return (
      <div className="tickets-page">
        <div className="tickets-page__header">
          <img src="/images/plane.svg"/>
        </div>

        <div className="tickets-page__instruments">
          <Filter transfers={transfers} onChange={this.handleFilterChange.bind(this)}/>
        </div>

        <div className="tickets-page__tickets">
          {tickets}
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