interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    handleSearch: () => void;
}

export default function SearchInput({ value, onChange, handleSearch }: SearchInputProps){
    return (
        <div>
            <input type="text"
            className="search"
            placeholder="Search Recipes"
            value={value}
            onChange={(e) => onChange(e.target.value)} />
            <br />
            <button onClick={handleSearch}>Search Recipe</button>
        </div>
    );
}