"use client";

import { useEffect, useState } from "react";
import { Greet } from "../bindings/changeme/greetservice";
import { Events } from "@wailsio/runtime";
import { toast } from "sonner";

export default function Home() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const [time, setTime] = useState("");

  useEffect(() => {
    return Events.On("time", (event) => setTime(event.data));
  }, []);

  async function handleGreet() {
    try {
      const res = await Greet(name);
      setResult(res);
      toast.success(res);
    } catch (err) {
      setResult(`Hata: ${String(err)}`);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 ">
      <input
        className="rounded border px-3 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button className="rounded bg-blue-600 px-4 py-2" onClick={handleGreet}>
        Say Hello
      </button>
      <p>{result}</p>
      <p>{time || "Clock Waiting..."}</p>
    </main>
  );
}
