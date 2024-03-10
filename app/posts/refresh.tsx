"use client";
import React from "react";
import { base_url } from "../utils/custom_helpers";

export default function Revalidate({ tag, url }) {
  return <a onClick={() => refresh(tag, url)}>refresh</a>;
}

function refresh(tag, url) {
  const rev = base_url(`/api/actions?tag=${tag}`);
  fetch(rev);
  console.log(rev);
  return true;
}
