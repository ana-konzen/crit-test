import Link from "next/link";

export default async function BurgerMenu() {
  return (
    <div className="bg-red z-10 font-serif block left-0 top-0 md:hidden text-cream fixed py-2 px-4 w-screen">
      <Link href="/">
        <h1 className="">
          Designing
          <br />
          Design
          <br />
          Crits
        </h1>
      </Link>
    </div>
  );
}
