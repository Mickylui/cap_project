import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
};

export function Scroll() {
    const [state, setState] = useState([
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
        { id: 1, name: "abc" },
    ]);
    // console.log("this is length:", state.length);
    // console.log(
    //     "this is Array.from(state, item => item.index < 10):",
    //     Array.from(state, (item) => item.id < 10)
    // );

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            setState(state.concat(Array.from({ length: 20 })));
        }, 1500);
    };
    return (
        // <div>
        //     <h1>demo: react-infinite-scroll-component</h1>
        //     <hr />
        //     <InfiniteScroll
        //         dataLength={this.state.items.length}
        //         next={this.fetchMoreData}
        //         hasMore={true}
        //         loader={<h4>Loading...</h4>}
        //         pullDownToRefreshContent={
        //             <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        //         }
        //         releaseToRefreshContent={
        //             <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        //         }
        //         endMessage={
        //             <p style={{ textAlign: "center" }}>
        //                 <b>Yay! You have seen it all</b>
        //             </p>
        //         }
        //     >
        //         {this.state.items.map((i, index) => (
        //             <div style={style} key={index}>
        //                 div - #{index}
        //             </div>
        //         ))}
        //     </InfiniteScroll>
        // </div>
        <div>
            <h1>demo: react-infinite-scroll-component</h1>
            <hr />
            <InfiniteScroll
                dataLength={state.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
                }
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {state.map((item) => (
                    <div style={style} key={item.id}>
                        div - #{item.id}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}
