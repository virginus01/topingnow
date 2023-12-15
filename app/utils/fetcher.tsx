"use client";
import useSWR from "swr";
import fetcher from "./fetch";

function usePagination(data, page, perPage) {
  const startIndex = (page - 1) * perPage;
  return data.slice(startIndex, startIndex + perPage);
}

export function usePaginatedSWR(url, page, perPage) {
  const { data } = useSWR(url, fetcher, {
    revalidateOnMount: true, // Initial data fetch
    revalidateOnFocus: true, // Refetch when component gains focus
    revalidateOnReconnect: true, // Refetch if network is restored
    revalidateInterval: 6000, // Refetch every 6 seconds (6000ms)
    keepPreviousData: true, // Maintain stale data while fetching new
  });

  const results = data?.data?.result ?? [];

  const paginatedData = usePagination(results, page, perPage);

  return {
    paginatedData,
    data,
    loading: !data,
  };
}
export default usePaginatedSWR;

export function useSingleSWR(url) {
  const { data } = useSWR(url, fetcher, {
    revalidateOnMount: true, // Initial data fetch
    revalidateOnFocus: true, // Refetch when component gains focus
    revalidateOnReconnect: true, // Refetch if network is restored
    revalidateInterval: 6000, // Refetch every 6 seconds (6000ms)
    keepPreviousData: true, // Maintain stale data while fetching new
  });
  const result = data?.data ?? {};
  return {
    result,
    data,
    loading: !data,
  };
}

export function usePaginatedSWRAdmin(url, page, perPage) {
  const { data } = useSWR(url, fetcher);

  const results = data?.data?.result ?? [];

  const paginatedData = usePagination(results, page, perPage);

  return {
    paginatedData,
    data,
    loading: !data,
  };
}
