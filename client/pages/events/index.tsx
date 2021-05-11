import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/event/List";
import { PagedCollection } from "../../types/Collection";
import { Event } from "../../types/Event";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Event>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Event List</title>
      </Head>
    </div>
    <List events={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/events");

  return { collection };
};

export default Page;
