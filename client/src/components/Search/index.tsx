interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    handleSearch: () => void;
}

export default function SearchInput({ value, onChange, handleSearch }: SearchInputProps) {
    return (
        <div className="w-full flex-colum items-center">
            <input type="text"
                className="search w-1/2 border"
                placeholder="Search Recipes"
                value={value}
                onChange={(e) => onChange(e.target.value)} />
            <br />
            <button
                className="mt-1 w-1/2 border p-3 bg-gradient-to-r from-[#D72638] bg-[#A2A2BE] text-white rounded-[4px]"
                style={{ cursor: 'pointer' }}
                type="submit"
                onClick={handleSearch}>Search Recipe</button>
        </div>
    );
}