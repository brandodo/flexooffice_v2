import React, { Suspense } from "react";
import DiscussionCards from "@/components/DiscussionCards/DiscussionCards";
import DiscussionHeader from "@/components/DiscussionHeader/DiscussionHeader";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/configs/auth/authOptions";
import Loading from "./loading";

const getDiscussions = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/discussions`, {
    method: "GET",
  });
  const data = await response.json();

  return { discussions: data };
};

const Discussions = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const { discussions } = await getDiscussions();

  return (
    <section className="flex flex-col p-6 w-full overflow-auto items-center">
      <DiscussionHeader />

      <Suspense fallback={<Loading />}>
        <DiscussionCards data={discussions} />
      </Suspense>
    </section>
  );
};

export default Discussions;
