import CowChart from "@/components/CowChart";
import { createClient } from "@/lib/supabase/server";

export default async function Home({ params }: { params: { id: number } }) {
  const supabase = createClient();

  const { data: cow } = await supabase
    .from("Cows")
    .select()
    .eq("id", params.id)
    .single();

  return (
    <main>
      <h1>{cow.name}</h1>
      <CowChart cowId={params.id} />
    </main>
  );
}
