import CowChart from "@/components/CowChart";

export default async function Home() {
  return (
    <main>
      <h1>Main Page</h1>
      <CowChart cowId={1} />
    </main>
  );
}
