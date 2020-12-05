import React, { useState, useEffect } from "react";
import Select from "react-select";
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

    return (
        <div className="App">
            <Select
                autoFocus={true}
                options={crs}
                onChange={(option) => {
                    setSelectedOption(option?.value);
                }}
            />
        </div>
    );
}

export default App;
