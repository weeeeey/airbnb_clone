"use client";
import { useCountries } from "@/app/hooks";
import Select from "react-select";

export type CountrySelectValue = {
    value: string;
    label: string;
    flag: string;
    region: string;
    latlng: number[];
};
interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (v: CountrySelectValue) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
    const { getAll } = useCountries();
    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(v) => onChange(v as CountrySelectValue)}
                formatOptionLabel={(option: CountrySelectValue) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>{option.flag}</div>
                        <div>
                            {option.label}
                            <span className="text-neutral-500 ml-1">
                                ({option.region})
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => "p-3 border-2",
                    input: () => "text-lg",
                    option: () => "text-lg",
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: "black",
                        primary25: "#ffe4e6",
                    },
                })}
            />
        </div>
    );
};

export default CountrySelect;
