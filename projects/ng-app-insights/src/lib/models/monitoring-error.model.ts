import { MonitoringBaseEvent } from './monitoring-base-event.model';

export class MonitoringError extends MonitoringBaseEvent {
  error: Error;

  constructor({
    properties,
    error,
  }: {
    properties?: Map<string, string | number>;
    error: Error;
  }) {
    super({
      properties,
    });
    this.error = error;
  }
}
