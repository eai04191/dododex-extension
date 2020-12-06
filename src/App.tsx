import React, { useState, useEffect } from "react";
import Select from "react-select";
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

    return (
        <div className="App">
            <Select
                autoFocus={true}
                options={crs}
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
                placeholder="Type to Search..."
                // for Debug
                // menuIsOpen={true}
                styles={{
                    control: (base) => ({
                        ...base,
                        borderWidth: "0px",
                        borderBottomWidth: "1px",
                    }),
                    menu: (base) => ({
                        ...base,
                        marginTop: 0,
                        boxShadow: "none",
                        background: "#222",
                    }),
                    menuList: (base) => ({
                        ...base,
                        paddingTop: 0,
                        paddingBottom: 0,
                    }),
                    option: (base, { data, isFocused }) => {
                        const url =
                            "https://www.dododex.com/media/creature/" +
                            data.value +
                            ".png";

                        return {
                            ...base,
                            display: "flex",
                            alignItems: "center",

                            position: "relative",
                            background: "transparent",
                            height: "5rem",
                            overflow: "hidden",

                            color: isFocused ? "black" : "white",
                            fontSize: "1.1em",
                            fontWeight: 500,
                            textShadow: isFocused ? "" : "#000 1px 1px",
                            textDecoration: isFocused ? "underline" : "none",
                            textUnderlineOffset: "-1.5em",
                            textDecorationThickness: "1.1em",
                            textDecorationColor: isFocused ? "white" : "black",
                            textDecorationSkipInk: "none",
                            filter: isFocused ? "saturate(1.5)" : "saturate(1)",

                            ":before": {
                                content: '" "',
                                position: "absolute",
                                zIndex: "-1",
                                top: "-40%",
                                left: "-40%",
                                width: "180%",
                                height: "180%",
                                background: `center / cover no-repeat url(${url}) `,
                                filter: "blur(40px) saturate(1.5)",
                            },

                            ":after": {
                                content: '" "',
                                position: "absolute",
                                zIndex: "-1",
                                top: "10%",
                                right: "1rem",
                                width: "50%",
                                height: "80%",
                                background: `right / contain no-repeat url(${url}) `,
                            },
                        };
                    },
                    placeholder: (base) => ({ ...base, fontSize: "0.9rem" }),
                }}
            />
        </div>
    );
}

export default App;
