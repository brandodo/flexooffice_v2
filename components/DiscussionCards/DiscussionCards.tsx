"use client";

import { useGetDiscussions } from "@/app/dashboard/discussions/useGetDiscussions";
import React from "react";
import { DiscussionCard } from "../DiscussionCard/DiscussionCard";
import DiscussionCardSkeleton from "../DiscussionCard/DiscussionCardSkeleton";

const DiscussionCards = () => {
  const { discussions, loading } = useGetDiscussions();

  if (loading) {
    return (
      <>
        <DiscussionCardSkeleton />
        <DiscussionCardSkeleton />
        <DiscussionCardSkeleton />
        <DiscussionCardSkeleton />
        <DiscussionCardSkeleton />
        <DiscussionCardSkeleton />
        <DiscussionCardSkeleton />
        <DiscussionCardSkeleton />
      </>
    );
  }

  return (
    <>
      {discussions?.map((discussion) => {
        return <DiscussionCard data={discussion} key={discussion._id} />;
      })}
    </>
  );
};

export default DiscussionCards;
