import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage(props) {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add New Meetup</title>
        <meta name="description" content="Add Your own Meetings" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
}

export default NewMeetupPage;
