import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import crs from "./crs.json";
import "./App.css";

function App() {
    const [selectedOption, setSelectedOption] = useState<
        null | undefined | string
    >(null);

    useEffect(() => {
        if (typeof selectedOption !== "string") {
            return;
        }
        window.open(
            `https://www.dododex.com/taming/${selectedOption}`,
            "_blank"
        );
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
                onChange={(option) => {
                    setSelectedOption(option?.value);
                }}
            />
        </div>
    );
}

export default App;
