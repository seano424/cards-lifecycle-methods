import React, { Component } from "react";

export default class Card extends Component {
  render() {
    const { card } = this.props
    return (
      <img
        style={{ transform: `rotate(${card.randNum}deg)` }}
        src={card[0].image}
        alt={`${card[0].value} of ${card[0].suit}`}
      />
    );
  }
}
