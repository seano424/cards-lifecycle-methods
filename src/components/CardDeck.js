import React, { Component } from "react";
import axios from "axios";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export default class CardDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      deck: "",
    };
    this.handleRequestClick = this.handleRequestClick.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    const deck = response.data;
    this.setState({
      deck,
    });
  }

  async handleRequestClick() {
    const id = this.state.deck.deck_id;
    console.log(id);
    const response = await axios.get(`${API_BASE_URL}/${id}/draw/`);
    // console.log(response.data.cards);
    const card = response.data.cards;
    this.setState((prevState) => ({
      cards: [...prevState.cards, card],
    }));
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleRequestClick}>Gimme a card!</h1>
        <div>
          {this.state.cards !== [] &&
            this.state.cards.map((card) => (
              <img
                src={card[0].image}
                alt={`${card[0].value} of ${card[0].suit}`}
              />
            ))}
        </div>
      </div>
    );
  }
}
