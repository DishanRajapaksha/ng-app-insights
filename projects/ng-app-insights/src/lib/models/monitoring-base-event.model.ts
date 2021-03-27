export class MonitoringBaseEvent {
  properties?: Map<string, string | number>;

  constructor({ properties }: { properties?: Map<string, string | number> }) {
    this.properties = properties;
  }
}
