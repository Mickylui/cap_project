import { useState } from "react";
import "../../Components/css/tagsInput.css";

import Autosuggest from "react-autosuggest";
import React from "react";

const companies: string[] = [
    "practice",
    "gathering",
    "talk",
    "recruitment",
    "lesson information",
    "product promotion",
    "skateboard design",
    "art related workshop",
    "skateboard maintenance",
    "competition",
    "skateboard performance",
    "question",
    "sharing",
];

const lowerCasedCompanies = companies.map((language) => language.toLowerCase());
export function InsertTags(props) {
    const tags = props.tags;
    const setTags = props.setTags;
    function handleKeyDown(e) {
        if (e.key !== "Enter") return;
        const value: string = e.target.value.toLowerCase();
        if (!value.trim()) return;
        const existValue = tags.filter((tag: string) => tag.trim() === value.trim());
        if (existValue.length > 0) return;
        setTags([...tags, value]);
        console.log("this is e.target.value1 :", e.target.value);
   
        console.log("this is e.target.value2 :", e.target.value);
    }

    function handleSelect(e) {
        // console.log("this is value :", e.target.innerHTML);
        console.log("check event",e)
        let value = e.target.innerHTML;
        setTags([...tags, value]);
        console.log("this is value1 :", value);
        value = "";
        e.target.innerHTML = "";
        // console.log("this is value2 :", value);
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    function getSuggestions(value: string): string[] {
        return lowerCasedCompanies.filter((language) =>
            language.startsWith(value.trim().toLowerCase())
        );
    }

    return (
        <div className="tags-input-container">
            {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span
                        className="item-close"
                        onClick={() => {
                            removeTag(index);
                        }}
                    >
                        &times;
                    </span>
                </div>
            ))}
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsClearRequested={() => setSuggestions([])}
                    onSuggestionsFetchRequested={({ value }) => {
                        setValue(value);
                        setSuggestions(getSuggestions(value));
                    }}
                    getSuggestionValue={(suggestion) => suggestion}
                    renderSuggestion={(suggestion) => (
                        <div className="tag-item" onClick={async(e)=>{await handleSelect(e); setValue("")}}>
                            <span className="text" >{suggestion}</span>
                        </div>
                    )}
                    inputProps={{
                        value: value,
                        onChange: (_, { newValue, method }) => {
                            setValue(newValue);
                            console.log("check value",newValue)
                        },
                        onKeyDown: handleKeyDown,
                        placeholder: " type something",
                        className: "tags-input",
                    }}
                    highlightFirstSuggestion={true}
                />
            </div>
        </div>
    );
}
