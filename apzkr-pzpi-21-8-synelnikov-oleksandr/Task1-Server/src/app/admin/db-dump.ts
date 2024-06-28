"use server";

import { exec } from "node:child_process";

export default async function dump() {
  console.log("Starting dump.");
  const child = exec(
    `npx supabase db dump --db-url ${process.env.DB_URL} -f public/db-data-dump.sql --data-only`,
  );

  return new Promise(function (resolve, reject) {
    child.addListener("error", reject);
    child.addListener("exit", resolve);
  });
}
