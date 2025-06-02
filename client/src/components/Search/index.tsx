interface SearchInputProps {
    value: string
    onChange: (value: string) => void
}

export default function SearchInput({ value, onChange} : SearchInputProps){
    return (
        <div>
            <input type="text"
            className="search"
            placeholder="Search Recipies"
            value={value}
            onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}