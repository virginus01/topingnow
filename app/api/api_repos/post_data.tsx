import generateImportId from "@/app/lib/repo/import_repo";

export async function PostData(data, updatedData, postFunction, isImport) {
  if (Array.isArray(data) && data !== null && data.length > 0) {
    if (isImport === "yes") {
      const importId = await generateImportId("test", data);
      data.forEach((im, i) => {
        data[i].importId = importId;
      });
    }
    const result = await postFunction();
    return {
      success: result.success,
      ids: result.ids,
      msg: `${result.msg}`,
      dataBody: data,
    };
  } else {
    return {
      success: true,
      ids: [],
      msg: `${updatedData.length} data updated`,
      dataBody: updatedData,
    };
  }
}
