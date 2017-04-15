import React, {Component} from 'react';
import Filter from '../Filter/Filter';
import Ticket from '../Ticket/Ticket';
import './TicketsPage.css';
import data from '../../../public/tickets.json';

class TicketsPage extends Component {
  render() {
    const tickets = data.tickets
      .sort(byPriceAsc)
      .map(ticketInfo => <Ticket data={ticketInfo} key={JSON.stringify(ticketInfo)}/>);

    return (
      <div className="tickets-page">
        <div className="tickets-page__header">
          <img src="/images/plane.svg"/>
        </div>

        <div className="tickets-page__instruments">
          <Filter/>
        </div>

        <div className="tickets-page__tickets">
          {tickets}
        </div>
      </div>
    );

    function byPriceAsc(ticketA, ticketB) {
      return ticketA.price < ticketB.price ? -1 : +1;
    }
  }
}

export default TicketsPage;