/**
 * Author: Niki Nielsen
 * Date: 06/28/2026
 * File: customer-feedback-by-region.component.ts
 * Description: Displays customer feedback aggregated by region.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';

interface CustomerFeedbackByRegion {
  region: string;
  averageRating: number;
  totalResponses: number;
}

@Component({
  selector: 'app-customer-feedback-by-region',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  template: `
    <div class="report-container">
      <h1>Customer Feedback by Region</h1>

      <div *ngIf="data.length === 0" class="empty-state">
        No customer feedback data available
      </div>

      <table *ngIf="data.length > 0" class="report-table">
        <thead>
          <tr>
            <th>Region</th>
            <th>Average Rating</th>
            <th>Total Responses</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of data">
            <td>{{ item.region }}</td>
            <td>{{ item.averageRating }}</td>
            <td>{{ item.totalResponses }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class CustomerFeedbackByRegionComponent implements OnInit {
  // Holds the API response data
  data: CustomerFeedbackByRegion[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadCustomerFeedback();
  }

  /**
   * Calls the backend API to fetch customer feedback grouped by region.
   * Assigns the returned data to the component's `data` array.
   */
  async loadCustomerFeedback(): Promise<void> {
    try {
      console.log('DATA BEFORE FETCH:', this.data);

      const response = await fetch(
        'http://localhost:3000/api/reports/customer-feedback/by-region',
      );

      this.data = await response.json();

      console.log('DATA AFTER FETCH:', this.data);
    } catch (error) {
      console.error('Error loading customer feedback by region:', error);
      this.data = [];
    }
  }
}
