import { Injectable } from '@angular/core';
import { ApplicationPerformanceManagementService } from './interfaces/application-performance-management.service';
import {
  ApplicationInsights,
  IExceptionTelemetry,
  IEventTelemetry,
  IDependencyTelemetry,
  IPageViewTelemetry,
  IPageViewPerformanceTelemetry,
  IMetricTelemetry,
  ITraceTelemetry,
} from '@microsoft/applicationinsights-web';
import { NumberDictionary, StringDictionary } from './types/types';
import { ICustomProperties } from '@microsoft/applicationinsights-core-js';

@Injectable()
export class ApplicationInsightsService
  implements ApplicationPerformanceManagementService {

  // TODO: get from outside
  environment: any = {};
  pagePostfix = 'Doc Import';

  appInsights = new ApplicationInsights({
    config: this.environment.appInsightsConfig,
  });

  constructor(
  ) {
    this.initialise();
    this.addTelemetryInitializers();
  }

  private initialise() {
    this.appInsights.loadAppInsights();
    this.appInsights.context.application.ver = this.environment.version;
  }

  private addTelemetryInitializers() {
    /**
     * Set current session details
     */
    // TODO: get from outside
    const initialiseData = {};

    this.appInsights?.addTelemetryInitializer((item) => {
      if (item && item.data) {
        item.data = {...item.data, ...initialiseData}
      }
    });
    /**
     * Add resolution to Page view traces
     */
    this.appInsights?.addTelemetryInitializer((item) => {
      const devicePixelRatio = window.devicePixelRatio;
      const height =
        devicePixelRatio === 1
          ? window.screen.height
          : window.screen.height * devicePixelRatio;
      const width =
        devicePixelRatio === 1
          ? window.screen.width
          : window.screen.width * devicePixelRatio;
      const innerHeight =
        devicePixelRatio === 1
          ? window.innerHeight
          : window.innerHeight * devicePixelRatio;
      const innerWidth =
        devicePixelRatio === 1
          ? window.innerWidth
          : window.innerWidth * devicePixelRatio;
      if (
        item &&
        (item.baseType === 'PageviewData' ||
          item.baseType === 'PageviewPerformanceData') &&
        item.data
      ) {
        item.data.resolution = `${width}x${height}`;
        item.data.screenHeight = height.toString();
        item.data.screenWidth = width.toString();
        item.data.windowSize = `${innerWidth}x${innerHeight}`;
        item.data.windowHeight = innerHeight.toString();
        item.data.windowWidth = innerWidth.toString();
        item.data.scale = (devicePixelRatio * 100).toString();
      }
      /**
       * Append postfix to page name end
       */
      if (
        item &&
        (item.baseType === 'PageviewData' ||
          item.baseType === 'PageviewPerformanceData') &&
        item.baseData &&
        item.baseData.name
      ) {
        item.baseData.name = `${item.baseData.name} ${this.pagePostfix}`;
      }
    });
  }

  clearAuthenticatedUserContext(): void {
    try {
      this.appInsights.clearAuthenticatedUserContext();
    } catch (e) {}
  }

  flush(): void {
    try {
      this.appInsights.flush();
    } catch (e) {}
  }

  setAuthenticatedUserContext(
    authenticatedUserId: string,
    accountId?: string,
    storeInCookie = false
  ): void {
    try {
      this.appInsights.setAuthenticatedUserContext(
        authenticatedUserId,
        accountId,
        storeInCookie
      );
    } catch (e) {}
  }

  startTrackEvent(name: string): void {
    try {
      this.appInsights.startTrackEvent(name);
    } catch (e) {}
  }

  startTrackPage(name: string): void {
    try {
      this.appInsights.startTrackPage(name);
    } catch (e) {}
  }

  stopTrackEvent(
    name: string,
    properties?: StringDictionary,
    measurements?: NumberDictionary
  ): void {
    try {
      this.appInsights.stopTrackEvent(name, properties, measurements);
    } catch (e) {}
  }

  stopTrackPage(
    name?: string,
    url?: string,
    customProperties?: StringDictionary,
    measurements?: NumberDictionary
  ): void {
    try {
      this.appInsights.stopTrackPage(name, url, customProperties, measurements);
    } catch (e) {}
  }

  trackDependencyData(dependency: IDependencyTelemetry): void {
    try {
      this.appInsights.trackDependencyData(dependency);
    } catch (e) {}
  }

  trackEvent(
    event: IEventTelemetry,
    customProperties?: ICustomProperties
  ): void {
    try {
      this.appInsights.trackEvent(event, customProperties);
    } catch (e) {}
  }

  trackException(exception: IExceptionTelemetry): void {
    try {
      this.appInsights.trackException(exception);
    } catch (e) {}
  }

  trackMetric(
    metric: IMetricTelemetry,
    customProperties?: ICustomProperties
  ): void {
    try {
      this.appInsights.trackMetric(metric, customProperties);
    } catch (e) {}
  }

  trackPageView(pageView?: IPageViewTelemetry): void {
    try {
      this.appInsights.trackPageView(pageView);
    } catch (e) {}
  }

  trackPageViewPerformance(
    pageViewPerformance: IPageViewPerformanceTelemetry
  ): void {
    try {
      this.appInsights.trackPageViewPerformance(pageViewPerformance);
    } catch (e) {}
  }

  trackTrace(
    trace: ITraceTelemetry,
    customProperties?: ICustomProperties
  ): void {
    try {
      this.appInsights.trackTrace(trace, customProperties);
    } catch (e) {}
  }
}
