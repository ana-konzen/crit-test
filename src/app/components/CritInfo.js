import classNames from "classnames";

export default function CritInfo({ blockChildren }) {
  return (
    <div className="border-l-2 right-0 translate-x-[100%] top-10 absolute border-gray py-1 px-4 mt-4">
      {blockChildren.map((item, index) => {
        return <InfoLine key={index} text={item.paragraph.rich_text} />;
      })}
    </div>
  );
}

function InfoLine({ text }) {
  return (
    <div className="font-sans mb-1 text-sm">
      {text.map((item, index) => {
        const itemClass = classNames({
          "mr-0": true,
          "font-bold": item.annotations.bold,
          "font-semibold": item.annotations.code,
          hidden: item.annotations.color === "gray",
        });

        return (
          <span key={index} className={itemClass}>
            {item.plain_text}
          </span>
        );
      })}
    </div>
  );
}
