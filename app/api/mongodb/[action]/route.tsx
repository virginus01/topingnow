import {
  getTops,
  getTopics,
  getTopic,
  getPopularTopics,
  getLists,
  getList,
  getUser,
} from "../query";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(
  request: any,
  { params }: { params: { action: string } }
) {
  const { searchParams } = new URL(request.url);
  let limit = searchParams.get("limit");
  let top_id = searchParams.get("top_id");
  let id = searchParams.get("id");
  let topicId = searchParams.get("topicId");
  let listId = searchParams.get("listId");
  let uid = searchParams.get("uid");
  let action = params.action;

  if (!limit) {
    limit = "10";
  }

  //fetching tops
  if (action == "get_tops") {
    const { data } = await fetchTops(limit);
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  //fetching topics
  if (action == "get_topics") {
    const { data } = await fetchTopics(top_id, limit);
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  //fetching topic info
  if (action == "get_topic") {
    const { data } = await fetchTopic(id);
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  //fetching popular topic
  if (action == "get_popular_topics") {
    const { data } = await fetchPopularTopics(limit);
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  //fetching lists
  if (action == "get_lists") {
    const { data } = await fetchLists(topicId, limit);
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  //fetching list info
  if (action == "get_list") {
    const { data } = await fetchList(listId);
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  //fetching a user
  if (action == "get_user") {
    const { data } = await fetchUser(uid);
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  //return info
  return new Response(JSON.stringify({ data: "please define action" }), {
    status: 400,
  });
}

async function fetchTops(limit: string | number | null) {
  let data = [];
  try {
    data = await getTops(limit);
  } catch {
    return { data: "error" };
  }
  return { data };
}

async function fetchTopics(
  top_id: string | number | null,
  limit: string | number | null
) {
  let data = [];
  try {
    data = await getTopics(top_id, limit);
  } catch {
    return { data: "error" };
  }
  return { data };
}

async function fetchTopic(id: string | number | null) {
  let data = [];
  try {
    data = await getTopic(id);
  } catch {
    return { data: "error" };
  }
  return { data };
}

async function fetchPopularTopics(limit: number | string | null) {
  let data = [];
  try {
    data = await getPopularTopics(limit);
  } catch {
    return { data: "error" };
  }
  return { data };
}

async function fetchLists(
  topicId: string | number | null,
  limit: string | number | null
) {
  let data = [];
  try {
    data = await getLists(topicId, limit);
  } catch {
    return { data: "error" };
  }
  return { data };
}

async function fetchList(listId: string | number | null) {
  let data = [];
  try {
    data = await getList(listId);
  } catch {
    return { data: "error" };
  }
  return { data };
}

async function fetchUser(uid: string | number | null) {
  let data = [];
  try {
    data = await getUser(uid);
  } catch {
    return { data: "error" };
  }
  return { data };
}
