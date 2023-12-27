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
  fetchTemplates,
  fetchTemplate,
  fetchQandAs,
  fetchAQandA,
  fetchFiles,
} from "@/app/api/mongodb/query";

export async function GET(
  request: any,
  { params }: { params: { action: string } }
) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  const { searchParams } = new URL(request.url);
  let limit = searchParams.get("limit");
  let topId = searchParams.get("topId");
  let id = searchParams.get("id");
  let _id = searchParams.get("_id");
  let topicId = searchParams.get("topicId");
  let listId = searchParams.get("listId");
  let uid = searchParams.get("uid");
  let q = searchParams.get("q");
  let rand = searchParams.get("rand");
  let process = searchParams.get("process");
  let page = parseInt(searchParams.get("page") as string, 10);
  let perPage = parseInt(searchParams.get("perPage") as string, 10);
  let action = params.action;

  limit = "10";

  //...............GET........................

  //fetching tops
  if (action == "get_tops") {
    const data = await fetchTops(page, perPage, q);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //fetching a top
  if (action == "get_top") {
    const data = await fetchTop(id);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //fetching topics
  if (action == "get_topics") {
    const data = await fetchTopics(topId, page, perPage, q);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //fetching topic info
  if (action == "get_topic") {
    const data = await fetchTopic(topicId, process);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //fetching topic info
  if (action == "get_topic_with_essentials") {
    const data = await fetchTopicWithEssentials(topicId, page);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //fetching popular topic
  if (action == "get_popular_topics") {
    const data = await fetchPopularTopics(_id, page, perPage);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }
  //fetching lists
  if (action == "get_lists") {
    const data = await fetchLists(topicId, page, perPage);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }
  //fetching list info
  if (action == "get_list") {
    const data = await fetchList(listId);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //fetching a user
  if (action == "get_user") {
    const data = await fetchUser(uid);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //fetching a user
  if (action == "get_imports") {
    const data = await getImports();
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //fetching templates
  if (action == "get_templates") {
    const data = await getTemplates(page, perPage);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  ///
  if (action == "get_template") {
    const data = await getTemplate(id, rand);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  if (action == "get_qandas") {
    const data = await getQandAs(page, perPage);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  if (action == "get_qanda") {
    const data = await getQandA(id, rand);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //fetching a user
  if (action == "get_files") {
    const data = await getFiles();
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //.....................PUT.......................

  //return info
  return new Response(JSON.stringify({ data: "please define get action" }), {
    status: 400,
    headers: headers,
  });
}

async function fetchTops(page: number, perPage: number, q: any) {
  try {
    return await getTops(page, perPage, q);
  } catch (e) {
    return { data: "839847 error" };
  }
}

async function fetchTop(id: any) {
  try {
    return await getTop(id);
  } catch {
    return { data: "746466 error" };
  }
}

async function fetchTopics(
  topId: string | number | null,
  page: number,
  perPage: number,
  q: string | number | null
) {
  try {
    return await getTopics(topId, page, perPage, "no", q);
  } catch {
    return { msg: "84746 error" };
  }
}

async function fetchTopic(id: any, process: any) {
  try {
    return await getTopic(id, process);
  } catch {
    console.log("error: 8475775");
    return "not_found";
  }
}

async function fetchTopicWithEssentials(id: any, page: any) {
  try {
    return await getTopic(id, "yes", page, 10, "yes");
  } catch (e) {
    console.log(`error: 847785775 ${e}`);
    return "not_found";
  }
}

async function fetchPopularTopics(_id: any, page: number, perPage: number) {
  try {
    return await getPopularTopics(_id, page, perPage);
  } catch {
    return { data: "87476 error" };
  }
}

async function fetchLists(
  topicId: string | number | null,
  page: number,
  perPage: number
) {
  try {
    return await getLists(topicId, page, perPage);
  } catch {
    return { msg: "74746 error" };
  }
}

async function fetchList(listId: string | number | null) {
  try {
    return await getList(listId);
  } catch {
    return { msg: "error: 6454554" };
  }
}

async function fetchUser(uid: string | number | null) {
  try {
    return await getUser(uid);
  } catch {
    return { data: "8474747 error" };
  }
}

async function getImports() {
  try {
    return await fetchImports();
  } catch {
    return { msg: "8474747 error" };
  }
}

async function getTemplates(page: any, perPage: any) {
  try {
    return await fetchTemplates();
  } catch {
    return { msg: "8474747 error" };
  }
}

async function getTemplate(templateId: any, rand: any) {
  try {
    return await fetchTemplate(templateId, rand);
  } catch {
    return { msg: "8474747 error" };
  }
}

async function getQandA(Id: any, rand: any) {
  try {
    return await fetchAQandA(Id, rand);
  } catch {
    return { msg: "8474747 error" };
  }
}

async function getQandAs(page: any, perPage: any) {
  try {
    return await fetchQandAs(page, perPage);
  } catch {
    return { msg: "8474747 error" };
  }
}

async function getFiles() {
  try {
    return await fetchFiles();
  } catch {
    return { msg: "848947 error" };
  }
}
