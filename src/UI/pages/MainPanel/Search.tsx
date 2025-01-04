import { useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";

interface SearchProps {
  placeholder: string;
  data: Player[];
}

export const Search = ({ placeholder, data }: SearchProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredSearch, setFilteredSearch] = useState<Player[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord: string = event.target.value;
    setSearchValue(searchWord);
    const newFilter: Player[] = data.filter((player: Player) => {
      return player.username.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredSearch([]);
    } else {
      setFilteredSearch(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredSearch([]);
    setSearchValue("");
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        id="Search"
        className="relative flex size-full items-center justify-center gap-2 rounded bg-background px-2 text-sm text-textcolor lg:bg-background2 noDrag"
      >
        <MdSearch className="size-6" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0"
          onChange={handleSearch}
          value={searchValue}
        />
        {filteredSearch.length === 0 ? null : (
          <MdClose
            id="clearSearch"
            className="cursor-pointer"
            onClick={clearInput}
          />
        )}
        {/* TODO:  Look into cmdk search bar*/}
      </div>
      {filteredSearch.length !== 0 && (
        <div className="flex flex-col bg-background overflow-hidden overflow-y-scroll">
          {filteredSearch.slice(0, 15).map((player, index) => {
            return <a key={index}>{player.username}</a>;
          })}
        </div>
      )}
    </div>
  );
};
