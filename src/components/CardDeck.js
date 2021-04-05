import React, { Component } from "react";
import axios from "axios";
import './CardDeck.css'
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export default class CardDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      deck: ""
    };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    const deck = response.data;
    this.setState({
      deck,
    });
  }

  async getCard() {
    const id = this.state.deck.deck_id;
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}/draw/`);
      if (!response.data.success) {
        throw new Error('No card remaining')
      }
      const card = {...response.data.cards, randNum: Math.ceil(Math.random() * 45) * (Math.round(Math.random()) ? 1 : -1)};
      // console.log(response.data.cards);
      this.setState((prevState) => ({
        cards: [...prevState.cards, card],
        deck: response.data,
        randomNumber: Math.ceil(Math.random() * 45) * (Math.round(Math.random()) ? 1 : -1)
      }));
    } catch(err) {
      alert(err)
    }
  }

  render() {
    return (
      <div className="CardDeck">
        <h1 onClick={this.getCard}>Gimme a card!</h1>
        <div className="cards">
          {this.state.cards !== [] &&
            this.state.cards.map((card) => (
              <img
                style={{transform: `rotate(${card.randNum}deg)`}}
                src={card[0].image}
                alt={`${card[0].value} of ${card[0].suit}`}
              />
            ))}
        </div>
      </div>
    );
  }
}
