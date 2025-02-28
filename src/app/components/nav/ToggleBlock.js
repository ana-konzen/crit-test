"use client";
import classNames from "classnames";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { useState } from "react";

export default function ToggleBlock({ title, slug, blockChildren, parent = true }) {
  if (!parent) console.log("child", blockChildren);
  const [visible, setVisible] = useState(false);

  const itemClass = classNames({
    hidden: !visible,
    block: visible,
  });

  const toggleClass = classNames({
    "ml-6": !parent,
  });

  const arrowClass = classNames({
    "size-5": true,
  });

  return (
    <div>
      <div
        className={`${toggleClass} text-sm mb-2 mt-4  border-b select-none cursor-pointer flex pb-1 justify-between`}
        onClick={() => setVisible(!visible)}
      >
        {title}
        {visible ? <ChevronUpIcon className={arrowClass} /> : <ChevronDownIcon className={arrowClass} />}
      </div>
      <div className={`${itemClass}`}>
        {blockChildren.map((child) => {
          if (child.type === "link_to_page") {
            if (!parent) console.log("child", child);
            return (
              <Link
                href={`/${slug}/${child.page_id}`}
                // as={`/${slug}/${child.slug}`}
                className="text-sm font-sans mb-2"
                key={child.id}
              >
                {child.title}
              </Link>
            );
          }
          if (child.type === "toggle" && child.has_children) {
            return (
              <ToggleBlock
                key={child.id}
                title={child.toggle.rich_text[0].plain_text}
                slug={slug}
                blockChildren={child.children}
                parent={false}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
