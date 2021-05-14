import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Event } from "../../types/Event";

interface Props {
  events: Event[];
}

export const List: FunctionComponent<Props> = ({ events }) => (
  <div>
    <h1>Event List</h1>
    <Link href="/events/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>decription</th>
          <th>date</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {events &&
          events.length !== 0 &&
          events.map((event) => (
            <tr key={event["@id"]}>
              <th scope="row">
                <ReferenceLinks items={event["@id"]} type="event" />
              </th>
              <td>{event["decription"]}</td>
              <td>{event["date"]}</td>
              <td>
                <ReferenceLinks
                  items={event["@id"]}
                  type="event"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${event["@id"]}/edit`}>
                  <a>
                    <i className="bi bi-pen" aria-hidden="true" />
                    <span className="sr-only">Edit</span>
                  </a>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
