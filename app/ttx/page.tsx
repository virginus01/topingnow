import React from "react";

export default function TtxPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="absolute inset-0 bg-[url(/images/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="pt-16 text-sm lg:text-lg md:text-md sm:text-sm text-gray-500 mb-20">
          hi
        </div>
      </div>
    </main>
  );
}
