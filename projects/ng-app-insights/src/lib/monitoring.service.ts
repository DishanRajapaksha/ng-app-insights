import { Injectable } from '@angular/core';

import {
  IPageViewTelemetry,
  IExceptionTelemetry,
  IEventTelemetry,
} from '@microsoft/applicationinsights-web';

import { EventService } from './event/event.service';
import { EventType } from './event/event-type.enum';
import { convertMapToDictionary } from './util.service';
import { MonitoringPageView } from './models/monitoring-page-view.model';
import { MonitoringError } from './models/monitoring-error.model';
import { MonitoringEvent } from './models/monitoring-event.model';
import { CoreMonitoringEventType } from './enums/core-monitoring-event-type.enum';
import { Event } from './event/event.model';
import { INgAppInsightsService } from './interfaces/ng-app-insights.service';

@Injectable({
  providedIn: 'root',
})
export class MonitoringService {
  constructor(
    private apm: INgAppInsightsService,
    private eventService: EventService
  ) {
    this.subscribeToEvents();
  }

  private static createEvent(data: MonitoringEvent): IEventTelemetry {
    const event: IEventTelemetry = {} as IEventTelemetry;

    if (data) {
      if (data.name) {
        event.name = data.name;
      }
      if (data.properties) {

        const defaultProperties = new Map<string, string | number>([
          ['typeId', data?.typeId.toString()],
          ['type', data?.type],
          ['action', data?.action]
        ]);

        event.properties = convertMapToDictionary(new Map([...data.properties, ...defaultProperties]));
      }
    }

    return event;
  }

  private static createError(data?: MonitoringError): IExceptionTelemetry {
    const event: IExceptionTelemetry = {} as IExceptionTelemetry;

    if (data) {
      if (data.error) {
        event.exception = data.error;
      }
      if (data.properties) {
        event.properties = convertMapToDictionary(data.properties);
      }
    }
    return event;
  }

  private static createPageView(data?: MonitoringPageView): IPageViewTelemetry {
    const event: IPageViewTelemetry = {} as IPageViewTelemetry;

    if (data) {
      if (data.name) {
        event.name = data.name;
      }
      if (data.uri) {
        event.name = data.uri;
      }
      if (data.properties) {
        event.properties = convertMapToDictionary(data.properties);
      }
    }
    return event;
  }

  private subscribeToEvents(): void {
    this.subscribeToEventService();
  }

  private subscribeToEventService(): void {
    try {
      this.eventService.subscribe(EventType.Monitoring).subscribe((event) => {
        this.processMonitoringEvent(event);
      });
    } catch (error) {
      console.log(error);
    }
  }

  private processMonitoringEvent(event: Event): void {
    if (event && event.type === EventType.Monitoring && event.payload) {
      if (event.payload instanceof MonitoringEvent) {
        if (event.payload.typeId === CoreMonitoringEventType.StartTrackEvent) {

          if (event?.payload?.name) {
            this.apm.startTrackEvent(event.payload.name);
          }

        } else if (event.payload.typeId === CoreMonitoringEventType.StopTrackEvent) {

          if (event?.payload?.name) {
            this.apm.stopTrackEvent(event.payload.name, convertMapToDictionary(event.payload.properties));
          }

        } else {
          this.apm.trackEvent(MonitoringService.createEvent(event.payload));
        }
      } else if (event.payload instanceof MonitoringError) {
        this.apm.trackException(MonitoringService.createError(event.payload));
      } else if (event.payload instanceof MonitoringPageView) {
        this.apm.trackPageView(MonitoringService.createPageView(event.payload));
      }
    }
  }

  public async flush(): Promise<void> {
    this.apm.flush();
  }

  public setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie?: boolean): void {
    this.apm.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie);
  }

  public addCustomTelemetryInitializer(data: any): void {
    this.apm.addCustomTelemetryInitializer(data);
  }
}
