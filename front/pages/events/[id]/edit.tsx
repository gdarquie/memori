import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/event/Form";
import { Event } from "../../../types/Event";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  event: Event;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ event }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{event && `Edit Event ${event["@id"]}`}</title>
        </Head>
      </div>
      <Form event={event} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const event = await fetch(asPath.replace("/edit", ""));

  return { event };
};

export default Page;
