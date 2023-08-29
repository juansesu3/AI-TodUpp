"use client";
import fetchSuggestion from "@/lib/fetchSuggestion";
import { useBoardStore } from "@/store/BoardStore";
import { CpuChipIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
//import Avatar from "react-avatar";

const Header = () => {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };
    fetchSuggestionFunc();
  }, [board]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 shadow-md bg-gray-900/10 rounded-b-2xl">
        <div
          className="absolute top-0 left-0 w-full h-96 rounded-md blur-3xl opacity-50 -z-50"
        />
        <div className="w-20">
        <Image
          src={"https://juan-sesu-ecommerce.s3.amazonaws.com/1693337012632.png"}
          alt="Trello logo"
          width={200}
          height={100}
          className="w-full md:w-56 pb-6 md:pb-0 object-contain"
        />
        </div>
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/*Search Box */}
          <form
            className="flex items-center space-x-5 bg-white rounded-md p-2 
          shadow-md flex-1 md:flex-initial"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2"
            />
            <button hidden>Search</button>
          </form>

          {/*Avatar 
          <Avatar name="Juan Suarez" round color="#0055D1" size="50" />*/}
        </div>
      </div>
      <div className="flex  items-center justify-center px-5 py-2 md:py-5 ">
        <p
          className="flex flex-col items-center p-5 text-sm font-medium pr-5 shadow-md rounded-xl w-fit
         bg-white italic max-w-3xl text-[#0055D1]"
        >
          <CpuChipIcon
            className={`inline-block h-10 w-10 text-[#50baf1] mr-1
          ${loading && "animate-spin"}
          `}
          />
          {suggestion && !loading
            ? suggestion
            : " GPT is summarising your task for the day..."}
        </p>
      </div>
    </header>
  );
};

export default Header;
