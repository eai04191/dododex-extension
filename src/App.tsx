import React, { useState, useEffect } from "react";
import Select, { components, createFilter } from "react-select";
import crs from "./crs.json";
import "./App.css";

function App(): JSX.Element {
    const [selectedOption, setSelectedOption] = useState<
        null | undefined | string
    >(null);
    const [inputText, setInputText] = useState<null | string>(null);

    useEffect(() => {
        if (typeof selectedOption !== "string") {
            return;
        }
        const level = inputText?.split(",")[1];
        const dododex = "https://www.dododex.com/";

        const url = level
            ? dododex + "taming/" + selectedOption + `#level=${level}`
            : dododex + "taming/" + selectedOption;
        window.open(url, "_blank");
    }, [selectedOption]);

    const { Option } = components;
    const IconOption = (props: any) => (
        <Option {...props}>
            <img
                src={
                    "https://www.dododex.com/media/creature/" +
                    props.data.value +
                    ".png"
                }
                style={{ height: "2rem" }}
            />
            {props.data.label}
        </Option>
    );

    return (
        <div className="App">
            <Select
                autoFocus={true}
                options={crs}
                components={{ Option: IconOption }}
                onInputChange={(input) => {
                    if (input) setInputText(input);
                }}
                onChange={(option) => {
                    setSelectedOption(option?.value);
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                })}
                filterOption={(option, rawInput) => {
                    const creature = rawInput.toLowerCase().split(",")[0];
                    return option.value.includes(creature);
                }}
            />
        </div>
    );
}

export default App;
