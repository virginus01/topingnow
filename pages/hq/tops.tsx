import UserLayout from "@/components/user_layout";
import { CustomButton } from "@/components/widgets/custom_designs";
import { SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function Import() {
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string | ArrayBuffer | null>(null);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (!file) {
      toast.error("please select a csv file");
      return null;
    }

    fileReader.onload = (e) => {
      const text = e.target?.result;
      setFileData(text as SetStateAction<null>);
    };
    fileReader.readAsText(file);

    try {
      const response = await fetch("/api/csv_import", {
        method: "POST",
        body: fileData,
      });

      if (response.ok) {
        return toast.success("CSV file imported successfully.");
      } else {
        return toast.error(response.statusText);
      }
    } catch (error) {
      return toast.error(error.statusText);
    }
  };

  return (
    <UserLayout>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleOnChange} />
        </div>

        <div className="mt-10">
          <CustomButton
            color="blue"
            onClick={handleSubmit}
            disabled={false}
            type="submit"
          >
            {false ? "Loading..." : "Login"}
          </CustomButton>
        </div>
      </form>
    </UserLayout>
  );
}
