import { UserNavbar } from "@/app/components/user_navbar";
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Toping Now Dashboard",
  description: "This is topingnow",
};

export default function UserLayout({ children }) {
  return (
    <>
      <header className="z-40">
        <UserNavbar />
      </header>
      <main>
        <div className="flex flex-col">
          <div className="md:w-2/4 mt-8 md:mx-auto mx-2">{children}</div>
        </div>
        <Toaster position="bottom-right" visibleToasts={6} richColors />
      </main>
    </>
  );
}
