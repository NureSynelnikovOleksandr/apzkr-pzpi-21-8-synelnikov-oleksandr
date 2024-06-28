import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex h-full">
      <form className="m-auto flex w-[400px] flex-col gap-7 rounded-md bg-slate-400 p-6">
        <div className="">
          <label className="inline-block" htmlFor="email">
            Email
          </label>
          <input
            className="block w-full rounded-md p-2"
            id="email"
            name="email"
            type="email"
            required
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="block w-full rounded-md p-2"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        <div className="flex justify-evenly">
          <button
            className="mx-2 inline-block rounded-lg bg-slate-300 p-2 hover:bg-slate-200"
            formAction={login}
          >
            Log in
          </button>
          <button
            className="mx-2 inline-block rounded-lg bg-slate-300 p-2 hover:bg-slate-200"
            formAction={signup}
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
