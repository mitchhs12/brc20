"use client";
import React, { useEffect, useState } from "react";
import Visualizer from "@/components/Visualizer";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    console.log("result", result);
  }, [result]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-3xl pb-10">Transaction Visualizer</div>

      <SearchBox setResult={setResult} />
      {result && <Visualizer result={result} />}
    </main>
  );
}
