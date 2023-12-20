import {
  deleteImportedTopics,
  removeList,
  removeTopicsWithLists,
} from "../../mongodb/query";

export async function DELETE(request, { params }) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  let action = params.action;

  const formData = await request.formData();

  if (action === "delete_topics_by_import") {
    const { data } = await deleteTopicsByImport(formData);

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  if (action === "delete_topics_with_lists") {
    const data = await deleteTopicsWithLists(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  if (action === "delete_list") {
    const data = await deleteList(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //...............GET........................

  return new Response(JSON.stringify({ msg: "Can't process your request" }));
}

async function deleteTopicsByImport(formData: any) {
  const deleteData = JSON.parse(formData.get("deleteData"));

  let data = [];

  try {
    data = await deleteImportedTopics(deleteData._id);
  } catch {
    return { data: "not_found" };
  }

  return { data };
}

async function deleteTopicsWithLists(formData: any) {
  const deleteData = JSON.parse(formData.get("deleteData"));
  try {
    return await removeTopicsWithLists(deleteData._id);
  } catch {
    return { data: "not_found" };
  }
}

async function deleteList(formData: any) {
  const deleteData = JSON.parse(formData.get("deleteData"));
  try {
    return await removeList(deleteData._id);
  } catch {
    return { data: "not_found" };
  }
}
