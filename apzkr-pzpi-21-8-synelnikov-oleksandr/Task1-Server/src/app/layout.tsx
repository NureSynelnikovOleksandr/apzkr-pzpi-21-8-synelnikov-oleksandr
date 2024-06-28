import { Inter } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const isUserLoggedIn = !(error || !data?.user);

  return (
    <html lang="en" className="bg-slate-200">
      <body className={inter.className + " flex h-screen flex-col"}>
        <div className="flex justify-between bg-slate-400 px-2 py-5">
          <nav>
            <Link
              className="mx-2 inline-block rounded-lg bg-slate-300 p-2 hover:bg-slate-200 "
              href="/"
            >
              Main
            </Link>
          </nav>
          {isUserLoggedIn ? (
            <div>
              <Link
                className="mx-2 inline-block rounded-lg bg-slate-300 p-2 hover:bg-slate-200 "
                href="/private"
              >
                Profile
              </Link>
              <form
                className="mx-2 inline-block rounded-lg bg-slate-300 p-2 hover:bg-slate-200"
                action={async () => {
                  "use server";

                  const supabase = createClient();
                  await supabase.auth.signOut();
                }}
              >
                <input type="submit" className="" value="Log Out"></input>
              </form>
            </div>
          ) : (
            <div>
              <Link
                className="mx-2 inline-block rounded-lg bg-slate-300 p-2 hover:bg-slate-200 "
                href="/login"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
        <div className="grow">{children}</div>
      </body>
    </html>
  );
}
