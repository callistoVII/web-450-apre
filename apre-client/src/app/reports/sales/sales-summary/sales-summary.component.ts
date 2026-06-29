/**
 * Author: Niki Nielsen
 * Date: 06/13/2026
 * File: sales-summary.component.ts
 * Description: Sales summary component
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Sales Summary Report -->
    <h2>Sales Summary Report</h2>

    <div class="summary-grid" *ngIf="data.length > 0">
      <div class="summary-card" *ngFor="let row of data">
        <h3>{{ row.region }}</h3>

        <p><strong>Total Sales:</strong> {{ row.totalSales | number }}</p>
        <p><strong>Transactions:</strong> {{ row.transactions }}</p>
      </div>
    </div>

    <p *ngIf="data.length === 0">No sales summary data available.</p>
  `,
  styles: [],
})
export class SalesSummaryComponent implements OnInit {
  data: any[] = [];

  ngOnInit(): void {
    this.loadSalesSummary();
  }

  async loadSalesSummary(): Promise<void> {
    try {
      // Fetch the sales summary report
      const response = await fetch(
        'http://localhost:3000/api/reports/sales/summary',
      );

      // Assign the returned data to the component
      this.data = await response.json();
    } catch (error) {
      console.error('Error loading sales summary:', error);
    }
  }
}
