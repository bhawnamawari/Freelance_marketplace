import { FaSearch } from "react-icons/fa";

const SearchBar = () => {

    return (

        <div className="bg-white rounded-xl p-2 flex shadow-xl">

            <input
                type="text"
                placeholder="Search projects..."
                className="flex-1 px-4 outline-none text-black"
            />

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">

                <FaSearch />

                Search

            </button>

        </div>

    );

};

export default SearchBar;