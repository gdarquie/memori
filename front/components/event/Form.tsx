import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Event } from "../../types/Event";

interface Props {
  event?: Event;
}

export const Form: FunctionComponent<Props> = ({ event }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(event["@id"], { method: "DELETE" });
      router.push("/events");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{event ? `Edit Event ${event["@id"]}` : `Create Event`}</h1>
      <Formik
        initialValues={event ? { ...event } : new Event()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/events" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/events");
          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
            setErrors(error.fields);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="_decription">
                decription
              </label>
              <input
                name="decription"
                id="_decription"
                value={values.decription ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.decription && touched.decription ? " is-invalid" : ""
                }`}
                aria-invalid={errors.decription && touched.decription}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="decription"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_date">
                date
              </label>
              <input
                name="date"
                id="_date"
                value={values.date ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.date && touched.date ? " is-invalid" : ""
                }`}
                aria-invalid={errors.date && touched.date}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="date" />

            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/events">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {event && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
