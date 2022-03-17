import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupDetails from "../../components/meetups/MeetupDetails";

function MeetupPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetails {...props.meetupData} />;
    </Fragment>
  );
}

export async function getStaticPaths(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://sleman:5771125sss@cluster0.siog9.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupsId = await meetupsCollection.find().toArray();

  await client.close();

  return {
    fallback: false,
    paths: meetupsId.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // ? fetch from API ?
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://sleman:5771125sss@cluster0.siog9.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  await client.close();

  return {
    props: {
      meetupData: {
        image: meetup.image,
        title: meetup.title,
        description: meetup.description,
        address: meetup.address,
      },
    },
  };
}

export default MeetupPage;
