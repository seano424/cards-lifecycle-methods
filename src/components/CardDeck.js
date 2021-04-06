import React, { Component } from "react";
import axios from "axios";
import "./CardDeck.css";
import Card from "./Card";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export default class CardDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      deck: "",
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
        throw new Error("No card remaining");
      }
      const card = {
        ...response.data.cards,
        randNum:
          Math.ceil(Math.random() * 45) * (Math.round(Math.random()) ? 1 : -1),
      };
      // console.log(response.data.cards);
      this.setState((prevState) => ({
        cards: [...prevState.cards, card],
        deck: response.data,
        randomNumber:
          Math.ceil(Math.random() * 45) * (Math.round(Math.random()) ? 1 : -1),
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return (
      <div className="CardDeck">
        <div className="icons">
          <i className="fas fa-heart"></i>
          <h2>Card Dealer</h2>
          <i className="fas fa-heart"></i>
        </div>
        <h3>A little demo made with react</h3>
        <h6 onClick={this.getCard}>Gimme a card!</h6>
        <div className="cards">
          {this.state.cards !== [] &&
            this.state.cards.map((card) => <Card card={card} />)}
        </div>
      </div>
    );
  }
}
