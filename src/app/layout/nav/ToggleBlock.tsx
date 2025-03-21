"use client";
import classNames from "classnames";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { TocChild } from "@/notion/notion";
import Link from "next/link";

import { useState } from "react";

interface ToggleBlockProps {
  title: string;
  slug: string;
  blockChildren: TocChild[];
}

export default function ToggleBlock({ title, slug, blockChildren }: ToggleBlockProps) {
  const [visible, setVisible] = useState(false);

  const itemClass = classNames({
    hidden: !visible,
    block: visible,
  });

  const arrowClass = classNames({
    "size-5": true,
  });

  return (
    <div>
      <div
        className={`text-sm mb-2 mt-4 border-b select-none cursor-pointer flex pb-1 justify-between`}
        onClick={() => setVisible(!visible)}
      >
        {title}
        {visible ? <ChevronUpIcon className={arrowClass} /> : <ChevronDownIcon className={arrowClass} />}
      </div>
      <div className={`${itemClass} flex flex-col`}>
        {blockChildren.map((child) => {
          return (
            <Link href={`/${slug}/${child.slug}`} className="text-sm font-sans mb-2" key={child.id}>
              {child.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
