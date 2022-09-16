import { useState } from 'react'
// import from "./css/TagsInput.css";

function TagsInput() {
    const [tags, setTags] = useState([]) 

    function handleKeyDowm(e: { key: string; target: { value: any } }) {
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value])
    }
    return (
        <div className='tags-input-container'>
            {/* <div className='tag-item'>
                <span className='text'>hello</span>
                <span className='close'>&times;</span>
            </div> */}
            {tags.map((tag, index) => {
                <div className='tag-item'>
                    <span className='text'>{tag}</span>
                    <span className='close'>&times;</span>
                </div>
            })}
            <input type="text" placeholder='Type something' className='tags-input'></input>
        </div>
    );
}

export default TagsInput;