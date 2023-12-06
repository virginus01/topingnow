import {
  getTops,
  getTopics,
  getTopic,
  getPopularTopics,
  getLists,
  getList,
  getUser,
  getTop,
  fetchImports,
} from "@/app/api/mongodb/query";

export async function GET(
  request: any,
  { params }: { params: { action: string } }
) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  const { searchParams } = new URL(request.url);
  let limit = searchParams.get("limit");
  let topId = searchParams.get("topId");
  let id = searchParams.get("id");
  let topicId = searchParams.get("topicId");
  let listId = searchParams.get("listId");
  let uid = searchParams.get("uid");
  let page = parseInt(searchParams.get("page") as string, 10);
  let perPage = parseInt(searchParams.get("perPage") as string, 10);
  let action = params.action;

  limit = "10";

  //...............GET........................

  //fetching tops
  if (action == "get_tops") {
    const { data } = await fetchTops(limit);
    return new Response(JSON.stringify({ data }), { status: 200, headers });
  }

  //fetching a top
  if (action == "get_top") {
    const { data } = await fetchTop(id);
    return new Response(JSON.stringify({ data }), { status: 200, headers });
  }

  //fetching topics
  if (action == "get_topics") {
    const data = await fetchTopics(topId, page, perPage);
    return new Response(JSON.stringify({ data }), { status: 200, headers });
  }

  //fetching topic info
  if (action == "get_topic") {
    const { data } = await fetchTopic(id);
    return new Response(JSON.stringify({ data }), { status: 200, headers });
  }

  //fetching popular topic
  if (action == "get_popular_topics") {
    const { data } = await fetchPopularTopics(limit);
    return new Response(JSON.stringify({ data }), { status: 200, headers });
  }

  //fetching lists
  if (action == "get_lists") {
    const { data } = await fetchLists(topicId, page, perPage);
    return new Response(JSON.stringify({ data }), { status: 200, headers });
  }

  //fetching list info
  if (action == "get_list") {
    const { data } = await fetchList(listId);
    return new Response(JSON.stringify({ data }), { status: 200, headers });
  }

  //fetching a user
  if (action == "get_user") {
    const { data } = await fetchUser(uid);
    return new Response(JSON.stringify({ data }), { status: 200, headers });
  }

  //fetching a user
  if (action == "get_imports") {
    const { data } = await getImports();
    return new Response(JSON.stringify({ data }), { status: 200, headers });
  }

  //.....................PUT.......................

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
    return { data: "839847 error" };
  }
  return { data };
}

async function fetchTop(id: any) {
  let data = [];

  try {
    data = await getTop(id);
  } catch {
    return { data: "746466 error" };
  }
  return { data };
}

async function fetchTopics(
  topId: string | number | null,
  page: number,
  perPage: number
) {
  let data = [];
  try {
    return await getTopics(topId, page, perPage);
  } catch {
    return { data: "84746 error" };
  }
}

async function fetchTopic(id: string | number | null) {
  let data = [];
  try {
    data = await getTopic(id);
  } catch {
    return { data: "not_found" };
  }
  return { data };
}

async function fetchPopularTopics(limit: number | string | null) {
  let data = [];
  try {
    data = await getPopularTopics(limit);
  } catch {
    return { data: "87476 error" };
  }
  return { data };
}

async function fetchLists(
  topicId: string | number | null,
  page: number,
  perPage: number
) {
  let data = [];
  try {
    return await getLists(topicId, page, perPage);
  } catch {
    return { data: "74746 error" };
  }
  return { data };
}

async function fetchList(listId: string | number | null) {
  let data = [];
  try {
    data = await getList(listId);
  } catch {
    return { data: "8474747 error" };
  }
  return { data };
}

async function fetchUser(uid: string | number | null) {
  let data = [];
  try {
    data = await getUser(uid);
  } catch {
    return { data: "8474747 error" };
  }
  return { data };
}

async function getImports() {
  let data = [];
  try {
    return await fetchImports();
  } catch {
    return { data: "8474747 error" };
  }
  return { data };
}
