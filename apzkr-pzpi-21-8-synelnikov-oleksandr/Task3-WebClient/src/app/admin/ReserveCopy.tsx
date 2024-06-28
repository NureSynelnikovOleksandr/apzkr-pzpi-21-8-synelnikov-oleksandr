"use client";

import { useState } from "react";
import dump from "./db-dump";

export default function ReserveCopy() {
  return (
    <div className="m-10 inline-block rounded-md bg-slate-400 p-5">
      <p className="mb-2 text-xl">Reserve Copy</p>
      <Button />
    </div>
  );
}

function Button() {
  const [state, setState] = useState("none");

  switch (state) {
    case "none":
      return (
        <button
          className="rounded-md bg-green-500 p-2"
          onClick={() => {
            setState("load");
            dump()
              .then(() => {
                setState("done");
              })
              .catch(() => {
                setState("error");
              });
          }}
        >
          Create
        </button>
      );
    case "load":
      return <div className="p-2">Loading...</div>;
    case "done":
      return (
        <a
          className="rounded-md bg-blue-500 p-2"
          href="/db-data-dump.sql"
          download="reserve-copy.sql"
        >
          Download
        </a>
      );
    case "error":
      return (
        <div className="rounded-md p-2 text-red-500">
          Error. Please, try later.
        </div>
      );
  }
}
