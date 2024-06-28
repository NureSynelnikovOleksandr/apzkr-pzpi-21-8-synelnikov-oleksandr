import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { data: string; id: string } },
) {
  const collName = snakeToCamel(params.data);
  const supabase = createClient();

  const { data: select } = await supabase
    .from(collName)
    .select()
    .eq("id", params.id);

  return NextResponse.json(select);
}

export async function PUT(
  request: Request,
  { params }: { params: { data: string; id: string } },
) {
  const collName = snakeToCamel(params.data);
  const supabase = createClient();
  const data = await request.json();

  const { data: select } = await supabase
    .from(collName)
    .update(data)
    .eq("id", params.id)
    .select();

  return NextResponse.json(select);
}

export async function DELETE(
  request: Request,
  { params }: { params: { data: string; id: string } },
) {
  const collName = snakeToCamel(params.data);
  const supabase = createClient();

  const { data: select } = await supabase
    .from(collName)
    .delete()
    .eq("id", params.id)
    .select();

  return NextResponse.json(select);
}

function snakeToCamel(input: string): string {
  const words = input.split("_");

  const pascalCaseString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return pascalCaseString;
}
