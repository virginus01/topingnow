import {
  removeImport,
  removeList,
  removeQandA,
  removeTop,
  removeTopics,
} from "../../mongodb/query";

export async function DELETE(request, { params }) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  let action = params.action;

  const formData = await request.formData();

  if (action === "delete_import") {
    const data = await deleteImport(formData);
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

  if (action === "delete_top") {
    const data = await deleteTop(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  if (action === "delete_topics") {
    const data = await deleteTopics(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  if (action === "delete_qanda") {
    const data = await deleteQandA(formData);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: headers,
    });
  }

  //...............GET........................

  return new Response(JSON.stringify({ msg: "Can't process your request" }));
}

async function deleteImport(formData: any) {
  const deleteData = JSON.parse(formData.get("deleteData"));
  try {
    return await removeImport(deleteData._id);
  } catch {
    return { data: "not_found" };
  }
}

async function deleteTopics(formData: any) {
  const deleteData = JSON.parse(formData.get("deleteData"));

  try {
    return await removeTopics(deleteData._id);
  } catch {
    return { data: "not_found" };
  }
}

async function deleteQandA(formData: any) {
  const deleteData = JSON.parse(formData.get("deleteData"));
  try {
    return await removeQandA(deleteData._id);
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

async function deleteTop(formData: any) {
  const deleteData = JSON.parse(formData.get("deleteData"));
  try {
    return await removeTop(deleteData._id);
  } catch {
    return { data: "not_found" };
  }
}
