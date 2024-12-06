export type NewsArticleSummary = {
    title: string;
    url: string;
    // summary: string;
}

export type NewsData = {
    [key: string]: Array<NewsArticleSummary>
}