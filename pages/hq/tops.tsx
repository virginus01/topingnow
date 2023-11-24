import UserLayout from "@/components/user_layout";
import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";

export default function Import() {
  const [file, setFile] = useState<File | null>(null);

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

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/file/importCsv", {
        method: "POST",
        body: formData,
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

        <div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-1 mt-2 rounded-lg w-full"
            onClick={handleSubmit}
            disabled={false}
            type="submit"
          >
            {false ? "logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </UserLayout>
  );
}
