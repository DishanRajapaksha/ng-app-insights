import { MonitoringBaseEvent } from './monitoring-base-event.model';

export class MonitoringEvent extends MonitoringBaseEvent {
  type?: string;
  typeId: string | number;
  name?: string;
  action: string;

  constructor({
    action,
    properties,
    typeId,
    type,
    name
  }: {
    action: string;
    properties?: Map<string, string | number>;
    typeId: string | number;
    type?: string;
    name?: string;
  }) {
    super({
      properties,
    });
    this.action = action;
    this.typeId = typeId;
    this.type = type;
    if (!name) {
      this.name = `${this.type}-${this.action}`;
    } else {
      this.name = name;
    }
  }
}
