import { deleteImportedTopics } from "../../mongodb/query";

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
