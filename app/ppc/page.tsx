"use client";
import React, { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { base_url } from "../utils/custom_helpers";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { url, utm_campaign } = router.query;

  const redirectUrl = url
    ? `${url}?utm_source=topingnow.com&utm_medium=referral&utm_campaign=${utm_campaign}`
    : `${base_url()}?utm_source=topingnow.com&utm_medium=referral&utm_campaign=${utm_campaign}`;

  return redirect(redirectUrl);
}
