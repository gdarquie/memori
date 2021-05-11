export class Event {
  public "@id"?: string;

  constructor(_id?: string, public decription?: string, public date?: number) {
    this["@id"] = _id;
  }
}
