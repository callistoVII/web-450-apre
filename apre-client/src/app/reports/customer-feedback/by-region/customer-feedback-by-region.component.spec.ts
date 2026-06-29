/**
 * Author: Niki Nielsen
 * Date: 06/28/2026
 * File: customer-feedback-by-region.component.spec.ts
 * Description: Unit tests for the CustomerFeedbackByRegionComponent.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerFeedbackByRegionComponent } from './customer-feedback-by-region.component';
import { CommonModule, NgIf, NgFor } from '@angular/common';

describe('CustomerFeedbackByRegionComponent', () => {
  let component: CustomerFeedbackByRegionComponent;
  let fixture: ComponentFixture<CustomerFeedbackByRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFeedbackByRegionComponent, CommonModule, NgIf, NgFor],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFeedbackByRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Ensures the component initializes without errors
    expect(component).toBeTruthy();
  });

  it('should show empty-state message when data is empty', () => {
    component.data = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    // Should show the empty-state message when no data is returned
    const emptyMessage = compiled.querySelector('.empty-state');

    expect(emptyMessage).toBeTruthy();
    expect(emptyMessage?.textContent?.trim()).toBe(
      'No customer feedback data available',
    );
  });

  it('should render table rows when data is present', () => {
    // Mock two rows of data
    component.data = [
      { region: 'North', averageRating: 4.5, totalResponses: 12 },
      { region: 'South', averageRating: 3.8, totalResponses: 8 },
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    // Query rendered rows
    const rows = compiled.querySelectorAll('tbody tr');

    // Verify correct number of rows
    expect(rows.length).toBe(2);

    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent?.trim()).toBe('North');
    expect(firstRowCells[1].textContent?.trim()).toBe('4.5');
    expect(firstRowCells[2].textContent?.trim()).toBe('12');
  });
});
