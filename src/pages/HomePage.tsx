import React, { useEffect, useState } from "react";
import { ReporCard } from "../components/ReporCard";
import { useDebounce } from "../hooks/debounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const debounced = useDebounce(search);

  const [
    fetchRepos,
    { isLoading: AreReposLoading, data: repos = [] },
  ] = useLazyGetUserReposQuery();

  const { isLoading, isError, data = [] } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const clickHandler = (userName: string) => {
    fetchRepos(userName);
    setDropDown(false);
  };

  useEffect(() => {
    if (debounced.length > 3 && data.length) {
      setDropDown(true);
    } else {
      setDropDown(false);
    }
  }, [debounced, data]);

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600"> Something went wrong...</p>
      )}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github user...."
          value={search}
          onChange={handleOnChange}
        />
        {dropDown && (
          <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {data.map((user) => {
              const handleClick = () => clickHandler(user.login);
              return (
                <li
                  onClick={handleClick}
                  key={user.id}
                  className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  {user.login}
                </li>
              );
            })}
          </ul>
        )}
        <div className="container">
          {AreReposLoading && (
            <p className="text-center"> Repos are loading...</p>
          )}
          {repos.map((repo) => (
            <ReporCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};
