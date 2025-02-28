export default async function Page({ params }) {
  const pageParams = await params;
  console.log(pageParams);
  return <></>;
}
