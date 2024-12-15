import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  cards: any[] = []; // Array to store card data
  newCard: any = {
    iD_Carta: '',
    iD_Turno: '',
    juego: '',
    numero: '',
    palo: '',
    jugador: false,
  }; // Model for the new card
  editCard: any = null; // Almacena la carta que se está editando

  constructor() {}

  ngOnInit() {
    this.loadCards(); // Fetch cards on initialization
  }

  async loadCards() {
    try {
      const response = await axios.get('http://localhost:8080/product'); // Fetch all cards
      console.log('Response data:', response.data);
      this.cards = response.data; // Assign the response data to the cards array
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  }

  async deleteCard(cardId: number) {
    try {
      await axios.delete(`http://localhost:8080/product/${cardId}`);
      console.log(`Card with ID ${cardId} deleted successfully`);
      this.loadCards(); // Recarga la lista después de borrar
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  }

  async createCard() {
    try {
      const response = await axios.post(
        'http://localhost:8080/product',
        this.newCard
      );
      console.log('Card created:', this.newCard);
      this.loadCards(); // Recarga la lista de cartas
      this.resetNewCard(); // Resetea el formulario
    } catch (error) {
      console.error('Error creating card:', error);
    }
  }

  cancelEdit() {
    this.editCard = null; // Limpia la carta en edición
  }

  selectCardForEdit(card: any) {
    this.editCard = { ...card }; // Copia los datos de la carta seleccionada
  }

  resetNewCard() {
    this.newCard = {
      iD_Carta: '',
      iD_Turno: '',
      juego: '',
      numero: '',
      palo: '',
      jugador: false,
    };
  }

  async updateCard() {
    try {
      await axios.put(
        `http://localhost:8080/product/${this.editCard.id_Carta}`,
        this.editCard
      );
      console.log('Card updated:', this.editCard);
      this.editCard = null; // Limpia la carta en edición
      this.loadCards(); // Recarga la lista de cartas
    } catch (error) {
      console.error('Error updating card:', error);
    }
  }
}
