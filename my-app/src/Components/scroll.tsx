import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
};

export default function Scroll() {
    const data = [
        { id: 1, name: "a" },
        { id: 2, name: "a" },
        { id: 3, name: "a" },
        { id: 5, name: "a" },
        { id: 6, name: "a" },
        { id: 7, name: "a" },
        { id: 8, name: "a" },
        { id: 9, name: "a" },
        { id: 10, name: "a" },
        { id: 11, name: "a" },
        { id: 12, name: "a" },
        { id: 13, name: "a" },
        { id: 14, name: "a" },
        { id: 15, name: "a" },
        { id: 16, name: "a" },
        { id: 17, name: "a" },
        { id: 18, name: "a" },
    ];
    const [startingNumb, setStartingNumb] = useState(1);
    const displayItems = 5;
    const newArr = data.splice(0, displayItems);
    const [state, setState] = useState(newArr);
    console.log("newArr:", newArr);
    console.log("startingNumb:", startingNumb);

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        console.log("fetchMoreData!")
        setTimeout(() => {
            setState(
                state.concat(
                    data.splice(
                        displayItems * startingNumb + startingNumb,
                        displayItems * (startingNumb + 1) + startingNumb
                    )
                )
            );
        }, 1500);
        setStartingNumb(startingNumb + 1);
    };

    return (
        <div>
            <h1>demo: react-infinite-scroll-component</h1>
            <hr />
            <InfiniteScroll
                dataLength={displayItems}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {state.map((i, index) => (
                    <div style={style} key={index}>
                        div - #{i.id}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}
