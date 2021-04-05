export class Event {

  type: string | number;
  payload?: any;

  constructor(type: string | number, payload?: any) {
    this.type = type;
    this.payload = payload;
  }

}
