"use client";
import React, { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { base_url } from "../utils/custom_helpers";

export default function Page() {
  const searchParams = new URLSearchParams(window.location.search);
  const url = searchParams ? searchParams.get("url") : base_url();
  const utm_campaign = searchParams
    ? searchParams.get("utm_campaign")
    : "topingnow";

  if (url) {
    return redirect(
      String(
        `${url}?utm_source=${"topingnow.com"}&utm_medium=referral&utm_campaign=${utm_campaign}`
      )
    );
  }

  return redirect(
    String(
      `${base_url()}?utm_source=${"topingnow.com"}&utm_medium=referral&utm_campaign=${utm_campaign}`
    )
  );
}
