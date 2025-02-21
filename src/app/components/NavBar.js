"use client";

import { fetchDatabase } from "@/notion/notion";
import { useEffect, useState } from "react";

const pages = ["Preface", "The Case", "The Framework", "Case Studies", "Interviews"];
const romanNumbers = ["I", "II", "III", "IV", "V"];

export default function NavBar() {
  const [notionPages, setPages] = useState([]);
  useEffect(() => {
    async function fetchPages() {
      const response = await fetchDatabase({
        database_id: "1985ae7ea4ba80f4bd84efe7913f4ae4",
        filter: {
          property: "Main",
          checkbox: {
            equals: true,
          },
        },
      });
      console.log(response);
      setPages(response.results);
    }
    fetchPages();
  }, []);
  return (
    <div className="bg-red z-10 font-serif m-[5vh] text-cream h-[90vh] fixed p-8 w-menu rounded-[25px]">
      <h1 className="text-xl mb-10">
        Designing
        <br />
        Design
        <br />
        Crits
      </h1>
      <div className="flex flex-col mt-4">
        {pages.map((page, index) => (
          <NavLink key={index} title={`${romanNumbers[index]}. ${page}`} />
        ))}
      </div>
    </div>
  );
}

function NavLink({ title }) {
  return <div className=" text-sm mb-4">{title}</div>;
}
