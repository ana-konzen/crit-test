import { getContentParams } from "@/notion/notion";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const pageParams = await params;
  const contentParams = await getContentParams();
  const navLinks = contentParams.filter((param) => param.parent_slug === pageParams.section);

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.page_id}
          className="text-red font-bold font-sans"
          href={`/${link.parent_slug}/${link.slug}`}
        >
          {link.title}
        </Link>
      ))}
    </>
  );
}
