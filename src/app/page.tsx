"use client";
import React, { useState, useRef } from "react";
import Visualizer from "@/components/Visualizer";
import isValidAddress from "bitcoin-address-validation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const searchTermRef = useRef<HTMLInputElement>(null);

  async function handleSearch() {
    const searchTerm = searchTermRef.current?.value;
    if (searchTerm && searchTerm !== "") {
      if (isValidAddress(searchTerm)) {
        setIsLoading(true);
        setMessage("⏳ Loading...");
        console.log("Searching for:", searchTerm);
        setTimeout(() => {
          console.log("Search done!");
          setResult("Hello!");
          setMessage("😀 Valid Bitcoin Address!");
          setIsLoading(false);
        }, 1000);
      } else {
        setResult(null);
        setMessage("☹️ Invalid Bitcoin Address!");
        console.log(message);
      }
    } else {
      setResult(null);
      setMessage("");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-3xl pb-10">BRC20 Visualizer</div>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex py-4">
        <input
          type="text"
          ref={searchTermRef}
          onChange={handleSearch}
          className="px-4 py-2 rounded-md focus:outline-none w-full dark:text-black focus:ring-2 focus:ring-blue-500"
          placeholder="Bitcoin Wallet Address"
          disabled={isLoading}
        />
      </div>
      {message}
      {result && <Visualizer />}
    </main>
  );
}
