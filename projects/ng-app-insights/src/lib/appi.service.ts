import { Inject, Injectable } from '@angular/core';
import { INgAppInsightsService as INgAppInsightsService } from './interfaces/ng-app-insights.service';
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
import { NgAppInsightsConfiguration } from './types/ng-app-insights.config';
import { NG_APP_INSIGHTS_CONFIG } from './constants';

@Injectable()
export class NgAppInsightsService implements INgAppInsightsService {

  pagePostfix = '';
  appInsights: ApplicationInsights;

  constructor(@Inject(NG_APP_INSIGHTS_CONFIG) appInsightsConfig: NgAppInsightsConfiguration,
  ) {
    this.initialise(appInsightsConfig);
    this.addTelemetryInitializers();
  }

  private initialise(appInsightsConfig: NgAppInsightsConfiguration) {
    this.appInsights = new ApplicationInsights({
      config: appInsightsConfig,
    });
    this.appInsights.loadAppInsights();
    this.appInsights.context.application.ver = appInsightsConfig.applicationVersion;
    this.pagePostfix = appInsightsConfig.pageViewPostfix;
  }

  private addTelemetryInitializers() {
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

  addCustomTelemetryInitializer(data: any): void {
    this.appInsights?.addTelemetryInitializer((item) => {
      if (item && item.data) {
        item.data = { ...item.data, ...data }
      }
    });
  }

  clearAuthenticatedUserContext(): void {
    try {
      this.appInsights.clearAuthenticatedUserContext();
    } catch (e) { }
  }

  flush(): void {
    try {
      this.appInsights.flush();
    } catch (e) { }
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
    } catch (e) { }
  }

  startTrackEvent(name: string): void {
    try {
      console.log('startTrackEvent called'  );
      this.appInsights.startTrackEvent(name);
    } catch (e) { }
  }

  startTrackPage(name: string): void {
    try {
      this.appInsights.startTrackPage(name);
    } catch (e) { }
  }

  stopTrackEvent(
    name: string,
    properties?: StringDictionary,
    measurements?: NumberDictionary
  ): void {
    try {
      this.appInsights.stopTrackEvent(name, properties, measurements);
    } catch (e) { }
  }

  stopTrackPage(
    name?: string,
    url?: string,
    customProperties?: StringDictionary,
    measurements?: NumberDictionary
  ): void {
    try {
      this.appInsights.stopTrackPage(name, url, customProperties, measurements);
    } catch (e) { }
  }

  trackDependencyData(dependency: IDependencyTelemetry): void {
    try {
      this.appInsights.trackDependencyData(dependency);
    } catch (e) { }
  }

  trackEvent(
    event: IEventTelemetry,
    customProperties?: ICustomProperties
  ): void {
    try {
      this.appInsights.trackEvent(event, customProperties);
    } catch (e) { }
  }

  trackException(exception: IExceptionTelemetry): void {
    try {
      this.appInsights.trackException(exception);
    } catch (e) { }
  }

  trackMetric(
    metric: IMetricTelemetry,
    customProperties?: ICustomProperties
  ): void {
    try {
      this.appInsights.trackMetric(metric, customProperties);
    } catch (e) { }
  }

  trackPageView(pageView?: IPageViewTelemetry): void {
    try {
      this.appInsights.trackPageView(pageView);
    } catch (e) { }
  }

  trackPageViewPerformance(
    pageViewPerformance: IPageViewPerformanceTelemetry
  ): void {
    try {
      this.appInsights.trackPageViewPerformance(pageViewPerformance);
    } catch (e) { }
  }

  trackTrace(
    trace: ITraceTelemetry,
    customProperties?: ICustomProperties
  ): void {
    try {
      this.appInsights.trackTrace(trace, customProperties);
    } catch (e) { }
  }
}
