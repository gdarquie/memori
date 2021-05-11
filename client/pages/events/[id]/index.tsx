import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/event/Show";
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
          <title>{`Show Event ${event["@id"]}`}</title>
        </Head>
      </div>
      <Show event={event} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const event = await fetch(asPath);

  return { event };
};

export default Page;
