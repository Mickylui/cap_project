import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
    height: 300,
    border: "1px solid green",
    margin: 6,
    padding: 8,
};

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
    { id: 19, name: "a" },
    { id: 20, name: "a" },
    { id: 21, name: "a" },
    { id: 22, name: "a" },
    { id: 23, name: "a" },
    { id: 24, name: "a" },
    { id: 25, name: "a" },
    { id: 26, name: "a" },
    { id: 27, name: "a" },
    { id: 28, name: "a" },
    { id: 29, name: "a" },
    { id: 30, name: "a" },
    { id: 31, name: "a" },
    { id: 32, name: "a" },
    { id: 33, name: "a" },
    { id: 34, name: "a" },
    { id: 35, name: "a" },
];

export default function Scroll() {
    const [startingNumb, setStartingNumb] = useState(1);
    const perItems = 5;
    const [displayItems, setDisplayItems] = useState(data.slice(0, perItems));
    console.log("startingNumb:", startingNumb);

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        console.log("fetchMoreData!");
        setTimeout(() => {
            setDisplayItems(
                displayItems.concat(
                    data.splice(perItems * startingNumb, perItems * (startingNumb + 1))
                )
            );
        }, 1500);
        console.log("form:", perItems * startingNumb);
        console.log("to:", perItems * (startingNumb + 1));
        setStartingNumb(startingNumb + 1);
    };

    return (
        <div>
            <h1>demo: react-infinite-scroll-component</h1>
            <hr />
            <div style={{ height: "100%", overflowY: "scroll" }}>
                <InfiniteScroll
                    dataLength={displayItems.length}
                    next={fetchMoreData}
                    hasMore={startingNumb < data.length / perItems}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {displayItems.map((i, index) => (
                        <div style={style} key={index}>
                            div - #{i.id}
                            {i.name}
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
}
