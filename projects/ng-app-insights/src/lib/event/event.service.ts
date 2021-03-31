import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Event } from './event.model';
import { EventType } from './event-type.enum';
import { MonitoringEvent } from '../models/monitoring-event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly handler: Subject<Event> = new Subject<Event>();

  publish<T>(event: Event) {
    this.handler.next(event);
  }

  publishMonitoringEvent(monitoringEvent: MonitoringEvent) {
    this.publish(new Event(EventType.Monitoring, monitoringEvent));
  }

  subscribe(type: string | number): Observable<Event> {
    return this.handler
      .asObservable()
      .pipe(filter((event) => {
        console.log(event);
       return event.type === type
      }));
  }
}
