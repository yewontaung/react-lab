type AppSelectProps = {
    id: string;
    name: string;
    className?: string;
    options: { value: string, label: string }[];
    onChange: (value: string) => void;
}

export function AppSelect({ id, name, options, onChange, className }: AppSelectProps) {
    return (
        <div className={`border py-1 px-2 ${className}`}>
            <select className="focus:outline-0" name={name} id={id} onChange={(e) => onChange(e.target.value)}>
                {options.map((option) => (
                    <option className="" key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}