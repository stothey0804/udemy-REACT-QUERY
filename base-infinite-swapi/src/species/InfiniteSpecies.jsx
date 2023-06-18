import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
	const response = await fetch(url);
	return response.json();
};

export function InfiniteSpecies() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isFetching,
		isError,
		error,
	} = useInfiniteQuery({
		queryKey: "sw-species",
		queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
		getNextPageParam: (lastPage) => lastPage.next,
	});

	if (isError) {
		return <div>{error.toString()}</div>;
	}

	if (isLoading) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<>
			{isFetching && <div className="loading">Loading...</div>}
			{data.pages.map((pageData) => {
				return pageData.results.map((species) => {
					return (
						<Species
							name={species.name}
							language={species.language}
							averageLifespan={species.average_lifespan}
						></Species>
					);
				});
			})}
			<InfiniteScroll
				loadMore={fetchNextPage}
				hasMore={hasNextPage}
			></InfiniteScroll>
		</>
	);
}
