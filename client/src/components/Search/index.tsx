interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    handleSearch: () => void;
}

export default function SearchInput({ value, onChange, handleSearch }: SearchInputProps) {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault
        handleSearch()
    }

    return (
        <form className="md:w-1/3 lg:w-1/2 mx-auto mt-5" onSubmit={onSubmit} >
            <input type="text"
                name="search"
                className=" w-full p-3 rounded-md bg-background border-2 border-accent-dark text-center focus:outline-none focus:ring-2 focus:ring-accent-dark placeholder:text-slate-400"
                placeholder="Enter Ingredient/Recipes"
                value={value}
                onChange={(e) => onChange(e.target.value)} />
            <br />
            <button
                className="mt-1 w-full border p-3 bg-gradient-to-r from-[#D72638] bg-[#A2A2BE] text-white rounded-[4px]"
                style={{ cursor: 'pointer' }}
                type="submit">Search Recipe</button>
        </form>
    );
}