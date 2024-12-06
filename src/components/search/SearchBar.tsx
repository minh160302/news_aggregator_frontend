"use client";

import { NewsData } from "@/types";
import AxiosInstance from "@/utils/axiosInstance";
import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";

interface SearchBarProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  setNewsData: Dispatch<SetStateAction<NewsData>>;
}

function SearchBar(props: SearchBarProps) {
  const { input, setInput, setNewsData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInput(event.target.value);
  };

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const response = await AxiosInstance.post(`/search/${input}`);
      const data: NewsData = response.data;
      for (const key in data) {
        if (data[key].length == 0) {
          delete data[key];
        }
      }
      setNewsData(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <label
        htmlFor="search"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Quick search
      </label>
      <div className="mt-2">
        <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <form action="submit" onSubmit={handleSubmitForm}>
            <input
              id="search"
              name="search"
              type="text"
              className="block min-w-0 grow px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
              value={input}
              onChange={handleChange}
              disabled={isLoading}
            />
          </form>
          <div className="flex py-1.5 pr-1.5">
            <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
