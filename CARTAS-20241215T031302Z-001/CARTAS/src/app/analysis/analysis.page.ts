import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {
  analysis: any[] = []; // Array to store analysis data

  constructor() {}

  ngOnInit() {
    this.loadAnalysis(); // Fetch analysis on initialization
  }

  async loadAnalysis() {
    try {
      const response = await axios.get('http://localhost:8080/product'); // Fetch all cards
      console.log('Response data:', response.data);
      this.analysis = response.data; // Assign the response data to the analysis array
    } catch (error) {
      console.error('Error fetching analysis:', error);
    }
  }
}
