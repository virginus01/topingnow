import { deleteImportedTopics } from "../../mongodb/query";

export async function DELETE(
  request: Request,
  { params }: { params: { action: string } }
) {
  let action = params.action;

  const formData = await request.formData();

  if (action == "delete_topics_by_import") {
    const { data } = await deleteTopicsByImport(formData);
    return new Response(JSON.stringify({ data }), { status: 200 });
  }

  //...............GET........................

  return new Response(JSON.stringify({ msg: "can't process your request" }));
}

async function deleteTopicsByImport(formData: any) {
  const postData = JSON.parse(formData.get("_id"));
  let data = [];
  try {
    data = await deleteImportedTopics(postData._id);
  } catch {
    return { data: "not_found" };
  }
  return { data };
}
