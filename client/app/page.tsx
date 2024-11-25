"use client";

import Banner from "@/components/banner";
import Diagram from "@/components/diagram";
import ViewRaffles from "@/components/view-raffles";
import { getAuthToken, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const { user } = useDynamicContext();

  useEffect(() => {
    const dynamicJwtToken = getAuthToken();

    try {
      // this can silently fail, we don't really care
      axios.post(
        "/api/users/",
        {},
        {
          headers: {
            Authorization: `Bearer ${dynamicJwtToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between m-5">
        <Banner />
        <Diagram />
      </div>

      <div className="my-3" />

      <ViewRaffles />
    </div>
  );
}
