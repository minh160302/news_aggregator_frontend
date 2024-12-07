"use client";

import NewsProviderList from "@/components/list/NewsProviderList";
import SearchBar from "@/components/search/SearchBar";
import { NewsData } from "@/types";
import AxiosInstance from "@/utils/axiosInstance";
import { useEffect, useRef, useState } from "react";

type TrendingKeyword = {
  keyword: string;
  geolocation: string;
};

export default function News() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [newsData, setNewsData] = useState<NewsData>({});
  const [keywords, setKeywords] = useState<Array<TrendingKeyword>>([]);
  const [shouldSubmitOnclick, setShouldSubmitOnclick] = useState<boolean>(false);
  const searchFormRef = useRef<HTMLFormElement>(null);

  const handleClickKeyword = (value: string) => {
    setShouldSubmitOnclick(true);
    setSearchInput(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (searchFormRef.current && searchInput !== "" && shouldSubmitOnclick) {
      searchFormRef.current.requestSubmit();
      setShouldSubmitOnclick(false);
    }
  }, [shouldSubmitOnclick]);

  useEffect(() => {
    AxiosInstance.get("/trends")
      .then((res) => {
        setKeywords(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Trending keywords
        </h2>
        {keywords.length === 0 ? (
          <span className="text-sm font-medium text-gray-500">No Keywords</span>
        ) : (
          <div className="block">
            {keywords.map((kw) => (
              <h4
                key={kw.keyword}
                className="text-sm font-medium text-gray-500 p-1 hover:cursor-pointer"
                onClick={() => handleClickKeyword(kw.keyword)}
              >
                {kw.keyword}
              </h4>
            ))}
          </div>
        )}
      </div>
      <div className="block">
        <SearchBar
          input={searchInput}
          setInput={setSearchInput}
          setNewsData={setNewsData}
          formRef={searchFormRef}
        />
        <NewsProviderList data={newsData} />
      </div>
    </div>
  );
}
