"use client";

import React, { useState } from "react";
import axios from "axios";

interface Nft {
  identifier: string;
  name: string;
  image_url: string;
  opensea_url: string;
}

const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [collection, setCollection] = useState("");
  const [nftData, setNftData] = useState<Nft[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEthereumAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const fetchNftData = async (owner: string, coll?: string) => {
    if (!isValidEthereumAddress(owner)) {
      setErrorMessage("Invalid Ethereum Wallet");
      return;
    }
    setErrorMessage("");
    try {
      const url = process.env.NFT_DATA_URL!;
      const response = await axios.get(url, {
        params: {
          owner: owner,
          collection: coll,
        },
      });
      setNftData(response.data.nfts);
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      setNftData([]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchNftData(walletAddress, collection);
  };

  const handleCollectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCollection = event.target.value;
    setCollection(selectedCollection);
    if (walletAddress) {
      fetchNftData(walletAddress, selectedCollection);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded shadow-md w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Balthazar NFT Holdings Viewer
        </h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="walletAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black bg-white"
            />
            {errorMessage && (
              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="collection"
              className="block text-sm font-medium text-gray-700"
            >
              Collection
            </label>
            <select
              id="collection"
              name="collection"
              value={collection}
              onChange={handleCollectionChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black bg-white"
            >
              <option value="">Select a collection</option>
              <option value="pudgypenguins">Pudgy Penguins</option>
              <option value="boredapeyachtclub">Bored Ape Yacht Club</option>
              <option value="cryptopunks">CryptoPunks</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        {nftData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {nftData.map((nft) => (
              <div key={nft.identifier} className="bg-white p-4 rounded shadow">
                <a
                  href={nft.opensea_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={nft.image_url}
                    alt={nft.name}
                    className="w-full h-auto rounded"
                  />
                </a>
                <h3 className="text-sm font-medium text-gray-700 mt-2">
                  {nft.name}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No NFTs found for the provided address and collection.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
