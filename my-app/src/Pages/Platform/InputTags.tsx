import { useState } from "react";
import "../../Components/css/tagsInput.css";

import Autosuggest from "react-autosuggest";
import React from "react";

const companies: string[] = [
    "practice",
    "gathering",
    "talk",
    "recruitment",
    "lesson-information",
    "product-promotion",
    "skateboard-design",
    "art-related-workshop",
    "skateboard-maintenance",
    "competition",
    "skateboard-performance",
    "question",
    "sharing",
];

const lowerCasedCompanies = companies.map((language) => language.toLowerCase());
export function InsertTags(props) {
    // bug: clear input after insertTags & selected, seconde selection will have a dot in front of
    // const [tags, setTags] = useState([]);
    const tags = props.tags;
    const setTags = props.setTags;
    // console.log("tags:",tags)
    // console.log("setTag:",setTags)
    function handleKeyDown(e) {
        if (e.key !== "Enter") return;
        const value: string = e.target.value.toLowerCase().replace(/ /g, "");
        // console.log("this is value :", value);
        if (!value.trim()) return;
        const existValue = tags.filter((tag: string) => tag.trim() === value.trim());
        // console.log("existValue:",existValue)
        if (existValue.length > 0) return;
        setTags([...tags, value]);
        console.log("this is e.target.value1 :", e.target.value);
        e.target.value = "";
        console.log("this is e.target.value2 :", e.target.value);
    }

    function handleSelect(e) {
        // console.log("this is value :", e.target.innerHTML);
        let value = e.target.innerHTML;
        setTags([...tags, value]);
        // console.log("this is value1 :", value);
        value = "";
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
                    // onSuggestionSelected={handleSelect}
                    getSuggestionValue={(suggestion) => suggestion}
                    renderSuggestion={(suggestion) => (
                        <div className="tag-item" onClick={handleSelect}>
                            <span className="text">{suggestion}</span>
                        </div>
                    )}
                    inputProps={{
                        value: value,
                        onChange: (_, { newValue, method }) => {
                            setValue(newValue);
                        },
                        onKeyDown: handleKeyDown,
                        placeholder: "type something",
                        className: "tags-input",
                    }}
                    highlightFirstSuggestion={true}
                />
            </div>
            {/* <input
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Tag something"
                className="tags-input"
            /> */}
        </div>
    );
}

// suggestion

// const companies: string[] = ["Company1", "Company2", "Big Corp", "Happy Toy Company"];

// const lowerCasedCompanies = companies.map((language) => language.toLowerCase());

// const TagsSuggestion: React.FC = () => {
//     const [value, setValue] = useState("");
//     const [suggestions, setSuggestions] = useState<string[]>([]);

//     function getSuggestions(value: string): string[] {
//         return lowerCasedCompanies.filter((language) =>
//             language.startsWith(value.trim().toLowerCase())
//         );
//     }
//     return (
//         <div>
//             <Autosuggest
//                 suggestions={suggestions}
//                 onSuggestionsClearRequested={() => setSuggestions([])}
//                 onSuggestionsFetchRequested={({ value }) => {
//                     setValue(value);
//                     setSuggestions(getSuggestions(value));
//                 }}
//                 onSuggestionSelected={(_, { suggestionValue }) =>
//                     console.log("Selected: " + suggestionValue)
//                 }
//                 getSuggestionValue={(suggestion) => suggestion}
//                 renderSuggestion={(suggestion) => <span>{suggestion}</span>}
//                 inputProps={{
//                     placeholder: "Type 'c'",
//                     value: value,
//                     onChange: (_, { newValue, method }) => {
//                         setValue(newValue);
//                     },
//                 }}
//                 highlightFirstSuggestion={true}
//             />
//         </div>
//     );
// };
