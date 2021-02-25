import { Injectable } from '@angular/core';
import { NumberDictionary, StringDictionary } from '../types/types';
import {
  IDependencyTelemetry,
  IEventTelemetry,
  IExceptionTelemetry,
  IMetricTelemetry,
  IPageViewPerformanceTelemetry,
  ITraceTelemetry,
  IPageViewTelemetry,
} from '@microsoft/applicationinsights-web';
import { ICustomProperties } from '@microsoft/applicationinsights-core-js';
import { ApplicationInsightsService } from '../appi.service';
@Injectable({
  providedIn: 'root',
  useClass: ApplicationInsightsService
})
export abstract class ApplicationPerformanceManagementService {
  abstract trackPageView(pageView?: IPageViewTelemetry): void;

  abstract startTrackPage(name: string): void;

  abstract stopTrackPage(name: string): void;

  abstract trackPageViewPerformance(
    pageViewPerformance: IPageViewPerformanceTelemetry
  ): void;

  abstract trackEvent(
    event: IEventTelemetry,
    customProperties?: ICustomProperties
  ): void;

  abstract startTrackEvent(name: string): void;

  abstract stopTrackEvent(
    name: string,
    properties?: StringDictionary,
    measurements?: NumberDictionary
  ): void;

  abstract trackException(exception: IExceptionTelemetry): void;

  abstract trackTrace(
    trace: ITraceTelemetry,
    customProperties?: ICustomProperties
  ): void;

  abstract trackMetric(
    metric: IMetricTelemetry,
    customProperties?: ICustomProperties
  ): void;

  abstract trackDependencyData(dependency: IDependencyTelemetry): void;

  abstract setAuthenticatedUserContext(
    authenticatedUserId: string,
    accountId?: string,
    storeInCookie?: boolean
  ): void;

  abstract clearAuthenticatedUserContext(): void;

  abstract flush(): void;
}
