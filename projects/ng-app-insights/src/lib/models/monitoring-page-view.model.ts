import { MonitoringBaseEvent } from './monitoring-base-event.model';

export class MonitoringPageView extends MonitoringBaseEvent {
  uri?: string;
  name?: string;

  constructor({
    properties,
    uri,
    name,
  }: {
    properties?: Map<string, string | number>;
    uri: string;
    name: string;
  }) {
    super({
      properties,
    });
    this.uri = uri;
    this.name = name;
  }
}
