import { useState } from "react";
import TinyMCEEditor from "@/app/utils/tinymce";
import CustomButton from "@/app/components/widgets/button";
import { updateTemplate } from "@/app/lib/repo/templates_repo";
import { TempModel } from "@/app/models/templates_model";
import { toast } from "sonner";
import { updateQandA } from "@/app/lib/repo/qanda_repo";
import { QandAModel } from "@/app/models/qanda_model";

export default function Steps({ data }) {
  let [bodies, setBodies] = useState(data.steps ? JSON.parse(data.steps) : []);

  if (!data.steps || bodies.length === 0) {
    return <div>no step found</div>;
  }

  function addNewBody() {
    const newBody = {
      dataBody: "",
    };

    setBodies((prevBodies) => [...prevBodies, newBody]);
  }

  async function submitForm() {
    const updateData: QandAModel = {};

    updateData.steps = bodies;
    updateData._id = data._id;
    const res = await updateQandA(updateData);

    if (res.data === true) {
      toast.success("template updated");
    } else {
      toast.error("error updating template");
    }
  }

  return (
    <>
      <div className="mt-5">
        {bodies.map((body, index) => (
          <div key={index} className="flex flex-col md:flex-row mt-4">
            <div className="w-full lg:w-11/12">
              <TinyMCEEditor
                height="300"
                onChange={(e) => {
                  const updatedBodies = [...bodies];
                  updatedBodies[index].dataBody = e;
                  setBodies(updatedBodies);
                }}
                initialValue={body.dataBody}
              />
            </div>
            <div className="flex items-center justify-end right-0 mx-3 my-4">
              <button
                onClick={(e) => {
                  let updatedBodies = [...bodies];
                  updatedBodies = bodies.filter((_, i) => i !== index);

                  setBodies(updatedBodies);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <div className="py-10 px-10">
          <CustomButton color="green" type={"submit"} onClick={addNewBody}>
            Add
          </CustomButton>
        </div>
        <div className="py-10 px-10">
          <CustomButton color="green" type={"submit"} onClick={submitForm}>
            Publish
          </CustomButton>
        </div>
      </div>
    </>
  );
}