/**
 * Author: Niki Nielsen
 * Date: 06/21/2026
 * File: call-duration-by-date-range.component.spec.ts
 * Description: Unit tests for the Sprint 2 Major Task component.
 * These Tests verify:
 * 1 - date selection updates component state
 * 2 - the API is called with correct query parameters
 * 3 - the API response populates chart data correctly.
 */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CallDurationByDateRangeComponent } from './call-duration-by-date-range.component';
import { environment } from '../../../../environments/environment';

describe('CallDurationByDateRangeComponent', () => {
  let component: CallDurationByDateRangeComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CallDurationByDateRangeComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(CallDurationByDateRangeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  /**
   * Test 1:
   * Ensures the component initializes with expected default values.
   */
  it('should create with default values', () => {
    expect(component).toBeTruthy();
    expect(component.startDate).toBeNull();
    expect(component.endDate).toBeNull();
    expect(component.showChart).toBeFalse();
  });

  /**
   * Test 2:
   * Ensures date selection handlers update component state.
   */
  it('should update startDate and endDate when dates are selected', () => {
    const start = new Date('2024-08-07');
    const end = new Date('2024-08-08');

    component.onStartDateSelected(start);
    expect(component.startDate).toEqual(start);

    component.onEndDateSelected(end);
    expect(component.endDate).toEqual(end);
  });

  /**
   * Test 3:
   * Ensures fetchPerformanceData() calls the API with correct query params.
   */
  it('should call API with correct query parameters', () => {
    component.startDate = new Date('2024-08-07');
    component.endDate = new Date('2024-08-08');

    component.fetchPerformanceData();

    const startISO = component.startDate.toISOString();
    const endISO = component.endDate.toISOString();

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/reports/agent-performance/call-duration-by-date-range?startDate=${startISO}&endDate=${endISO}`,
    );

    expect(req.request.method).toBe('GET');
  });

  /**
   * Test 4:
   * Ensures API response populates agents, callDurationData, and showChart.
   */
  it('should populate chart data when API returns results', () => {
    component.startDate = new Date('2024-08-07');
    component.endDate = new Date('2024-08-08');

    component.fetchPerformanceData();

    const req = httpMock.expectOne(() => true);

    req.flush([
      {
        agents: ['David'],
        callDurations: [300],
      },
    ]);

    expect(component.agents).toEqual(['David']);
    expect(component.callDurationData).toEqual([300]);
    expect(component.showChart).toBeTrue();
  });
});
