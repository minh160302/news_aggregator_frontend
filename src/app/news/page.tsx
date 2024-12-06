"use client";

import NewsProviderList from "@/components/list/NewsProviderList";
import SearchBar from "@/components/search/SearchBar";
import { NewsData } from "@/types";
import { useState } from "react";

export default function News() {
  const [searchInput, setSearchInput] = useState("");
  const [newsData, setNewsData] = useState<NewsData>({});

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SearchBar input={searchInput} setInput={setSearchInput} setNewsData={setNewsData} />
      <NewsProviderList data={newsData} />
    </div>
  );
}
