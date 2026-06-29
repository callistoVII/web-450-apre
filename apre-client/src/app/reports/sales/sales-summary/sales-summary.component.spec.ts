/**
 * Author: Niki Nielsen
 * Date: 06/13/2026
 * File: sales-summary.component.spec.ts
 * Description: Sales summary component unit tests
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesSummaryComponent } from './sales-summary.component';

describe('SalesSummaryComponent', () => {
  let component: SalesSummaryComponent;
  let fixture: ComponentFixture<SalesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call the sales summary API', async () => {
    const mockData = [
      { region: 'North', totalSales: 120000, transactions: 340 },
    ];

    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      } as Response),
    );

    await component.loadSalesSummary();

    expect(window.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/reports/sales/summary',
    );
    expect(component.data).toEqual(mockData);
  });

  it('should show no data message when data is empty', () => {
    component.data = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No sales summary data available');
  });

  it('should render sales summary cards when data is present', () => {
    component.data = [
      { region: 'North', totalSales: 120000, transactions: 340 },
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('North');
    expect(compiled.textContent).toContain('120,000');
    expect(compiled.textContent).toContain('340');
  });
});
