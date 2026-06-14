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
  styles: [
    `
      .summary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }

      .summary-card {
        padding: 1rem;
        border-radius: 8px;
        background: #f9f9fa;
        border: 1px solid #ddd;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }

      .summary-card h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }
    `,
  ],
})
export class SalesSummaryComponent implements OnInit {
  data: any[] = [];

  ngOnInit(): void {
    this.loadSalesSummary();
  }

  async loadSalesSummary(): Promise<void> {
    try {
      const response = await fetch(
        'http://localhost:3000/api/reports/sales-summary',
      );
      this.data = await response.json();
    } catch (error) {
      console.error('Error loading sales summary:', error);
    }
  }
}
