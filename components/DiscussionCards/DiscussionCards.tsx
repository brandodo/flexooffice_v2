import React from "react";
import { DiscussionCard } from "../DiscussionCard/DiscussionCard";

const DiscussionCards = async ({ data }) => {
  return (
    <>
      {data?.map((discussion) => {
        return <DiscussionCard data={discussion} key={discussion._id} />;
      })}
    </>
  );
};

export default DiscussionCards;
