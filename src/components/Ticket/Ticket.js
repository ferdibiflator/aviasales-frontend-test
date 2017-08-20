import React from 'react';
import './Ticket.css';
import PropTypes from 'prop-types';

function Ticket({data}) {
  const logo           = <img src={`/images/carriers/${data.carrier}.png`} className="ticket-company-logo" alt=""/>;
  const btn            = <button className="ticket-btn" type="button">{`Купить\nза ${data.price} Р`}</button>;
  const origin         = {
    time: <div className="ticket-flight-info__time">{data['departure_time']}</div>,
    city: <div className="ticket-flight-info__city">{`${data['origin']}, ${data['origin_name']}`}</div>,
    date: <div className="ticket-flight-info__date">{formatDate(data['departure_date'])}</div>
  };
  const destination    = {
    time: <div className="ticket-flight-info__time">{data['arrival_time']}</div>,
    city: <div className="ticket-flight-info__city">{`${data['destination']}, ${data['destination_name']}`}</div>,
    date: <div className="ticket-flight-info__date">{formatDate(data['arrival_date'])}</div>
  };
  const transfersCount = <div className="ticket-transfers__count">{getCountText(data['stops'])}</div>;

  return (
    <div className="ticket">
      <div className="ticket__price-info">
        {logo}
        {btn}
      </div>

      <div className="ticket__flight-info">
        <div className="ticket-flight-info ticket-flight-info--origin">
          {origin.time}
          {origin.city}
          {origin.date}
        </div>

        <div className="ticket-transfers">
          {transfersCount}
          <img className="ticket-transfers__image" src="/images/flight.svg"/>
        </div>

        <div className="ticket-flight-info ticket-flight-info--destination">
          {destination.time}
          {destination.city}
          {destination.date}
        </div>
      </div>
    </div>
  );
}

Ticket.propTypes = {
  data: PropTypes.shape({
    "origin"          : PropTypes.string.isRequired,
    "origin_name"     : PropTypes.string.isRequired,
    "destination"     : PropTypes.string.isRequired,
    "destination_name": PropTypes.string.isRequired,
    "departure_date"  : PropTypes.string.isRequired,
    "departure_time"  : PropTypes.string.isRequired,
    "arrival_date"    : PropTypes.string.isRequired,
    "arrival_time"    : PropTypes.string.isRequired,
    "carrier"         : PropTypes.string.isRequired,
    "stops"           : PropTypes.number.isRequired,
    "price"           : PropTypes.number.isRequired
  })
};

export default Ticket;

function formatDate(date) {
  const matches       = /^(\d\d)\.(\d\d)\.(\d\d)$/.exec(date);
  const parsedDate    = new Date(`20${matches[3]}`, matches[2], matches[1]);
  const localeOptions = {
    day  : 'numeric',
    month: 'short',
    year : 'numeric'
  };

  const firstPart  = `${parsedDate.toLocaleString('ru', localeOptions).replace('.', '').replace(' г.', '')}`;
  const secondPart = `${getWeekDay(parsedDate)}`;

  return `${firstPart}, ${secondPart}`;

  function getWeekDay(date) {
    var days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    return days[date.getDay()];
  }
}

function getCountText(count) {
  if (count == 0) return '';

  const lastDigital = `${count}`.substr(-1);

  if (['1'].indexOf(lastDigital) > -1) return count + ' ПЕРЕСАДКА';
  if (['2', '3', '4'].indexOf(lastDigital) > -1) return count + ' ПЕРЕСАДКИ';
  else return count + ' ПЕРЕСАДОК';
}