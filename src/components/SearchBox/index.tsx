"use client";
import React, { useState, useRef } from "react";
import isValidAddress from "bitcoin-address-validation";

interface Props {
  setResult: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SearchBox({ setResult }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const searchTermRef = useRef<HTMLInputElement>(null);

  async function handleSearch() {
    const searchTerm = searchTermRef.current?.value;
    if (searchTerm && searchTerm !== "") {
      if (isValidAddress(searchTerm)) {
        setIsLoading(true);
        setMessage("⏳ Loading...");
        setTimeout(() => {
          setMessage("😀 Valid Bitcoin Address!");
          setResult("DATA GOES HERE!");
          setIsLoading(false);
        }, 1000);
      } else {
        setResult(null);
        setMessage("☹️ Invalid Bitcoin Address!");
      }
    } else {
      setResult(null);
      setMessage("");
    }
  }

  return (
    <>
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
    </>
  );
}
