"use client";
import React, { useState, useRef, useEffect } from "react";
import isValidAddress from "bitcoin-address-validation";
import { networks } from "@/utils/data";
import { isAddress } from "web3-validator";

interface Props {
  setResult: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SearchBox({ setResult }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [network, setNetwork] = useState<string>("bitcoin");
  const searchTermRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleSearch();
  }, [network]);

  async function handleSearch() {
    const searchTerm = searchTermRef.current?.value;
    if (searchTerm && searchTerm !== "") {
      let isValidAddressValue = false;
      if (network !== "Bitcoin") {
        isValidAddressValue = isAddress(searchTerm);
      } else {
        isValidAddressValue = isValidAddress(searchTerm);
      }
      if (isValidAddressValue) {
        setIsLoading(true);
        setMessage("⏳ Loading...");
        setTimeout(() => {
          setMessage(`😀 Valid ${network} Address!`);
          setResult("DATA GOES HERE!");
          setIsLoading(false);
        }, 1000);
      } else {
        setResult(null);
        setMessage(`☹️ Invalid ${network} Address!`);
      }
    } else {
      setResult(null);
      setMessage("");
    }
  }

  function handleNetworkChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setNetwork(event?.target.value);
  }

  return (
    <>
      <select
        value={network}
        onChange={handleNetworkChange}
        className="ml-2 px-4 py-2 rounded-md focus:outline-none dark:text-black focus:ring-2 focus:ring-blue-500"
      >
        {networks.map((net) => (
          <option key={net} value={net}>
            {net}
          </option>
        ))}
      </select>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex py-4">
        <input
          type="text"
          ref={searchTermRef}
          onChange={handleSearch}
          className="px-4 py-2 rounded-md focus:outline-none w-full dark:text-black focus:ring-2 focus:ring-blue-500"
          placeholder={`${network} Wallet Address`}
          disabled={isLoading}
        />
      </div>
      {message}
    </>
  );
}
