import { NewsData } from "@/types";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import ArticleSummary from "../modal/ArticleSummary";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

interface NewsProviderListProps {
  data: NewsData;
}

export default function NewsProviderList(props: NewsProviderListProps) {
  const { data } = props;
  const [providerVisible, setProviderVisible] = useState<string>("");
  const [openSummaryModal, setOpenSummaryModal] = useState<boolean>(false);
  const [summarizedArticleUrl, setSummarizedArticleUrl] = useState<string>("");

  const handleToggleProvider = (source: string) => {
    setProviderVisible(source === providerVisible ? "" : source);
  };

  const handleOpenModal = (url: string) => {
    setOpenSummaryModal(true);
    setSummarizedArticleUrl(url);
  };

  useEffect(() => {
    if (!openSummaryModal) {
      setSummarizedArticleUrl("");
    }
  }, [openSummaryModal]);

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500">
        Available news providers
      </h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {Object.entries(data).map(([source, articles]) => (
          <li key={source} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={classNames(
                "bg-purple-600",
                "flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
              )}
            >
              {source.charAt(0)}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a
                  href={source}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {source}
                </a>
                <p className="text-gray-500">{articles.length} articles</p>
              </div>
              <div className="shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => handleToggleProvider(source)}
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {providerVisible !== "" && (
        <div>
          News Provider: {providerVisible}
          <ul role="list" className="divide-y divide-gray-100">
            {data[providerVisible].map((item) => (
              <li key={item.title} className="flex gap-x-4 py-5 ">
                {/* <img alt="" src={person.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" /> */}
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => handleOpenModal(item.url)}
                >
                  <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                </button>
                <div className="min-w-0">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <a
                    href={item.url}
                    className="mt-1 truncate text-xs/5 text-gray-500"
                    target="_blank"
                  >
                    {item.url}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ArticleSummary
        open={openSummaryModal}
        setOpen={setOpenSummaryModal}
        url={summarizedArticleUrl}
      />
    </div>
  );
}
