import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/event/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Event </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
