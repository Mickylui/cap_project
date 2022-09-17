import { Slideshow } from "../Components/AutoSlider";
import "../Components/css/landingPage.scss";
export function LandingPage() {
    const products = [
        {
            id: 1,
            title: "Air Force",
            price: 119,
            colors: [
                {
                    code: "black",
                    img: "./img/air.png",
                },
                {
                    code: "darkblue",
                    img: "./img/air2.png",
                },
            ],
        },
        {
            id: 2,
            title: "Air Jordan",
            price: 149,
            colors: [
                {
                    code: "lightgray",
                    img: "./img/jordan.png",
                },
                {
                    code: "green",
                    img: "./img/jordan2.png",
                },
            ],
        },
        {
            id: 3,
            title: "Blazer",
            price: 109,
            colors: [
                {
                    code: "lightgray",
                    img: "./img/blazer.png",
                },
                {
                    code: "green",
                    img: "./img/blazer2.png",
                },
            ],
        },
        {
            id: 4,
            title: "Crater",
            price: 129,
            colors: [
                {
                    code: "black",
                    img: "./img/crater.png",
                },
                {
                    code: "lightgray",
                    img: "./img/crater2.png",
                },
            ],
        },
        {
            id: 5,
            title: "Hippie",
            price: 99,
            colors: [
                {
                    code: "gray",
                    img: "./img/hippie.png",
                },
                {
                    code: "black",
                    img: "./img/hippie2.png",
                },
            ],
        },
    ];
    return (
        <>
            <video className="landingVideo" muted autoPlay loop width={"100%"}>
                <source src="./landingVideo.mp4" type="video/mp4" />
            </video>

            <div className="features" style={{ marginTop: "55px" }}>
                <div className="feature">
                    <i className="fa-solid fa-money-check-dollar" style={{ fontSize: "90px" }}></i>
                    <span className="featureTitle">FREE SHIPPING</span>
                    <span className="featureDesc">Free worldwide shipping on all orders.</span>
                </div>
                <div className="feature">
                    <i className="fa-solid fa-trophy" style={{ fontSize: "90px" }}></i>
                    <span className="featureTitle">30 DAYS RETURN</span>
                    <span className="featureDesc">
                        No question return and easy refund in 14 days.
                    </span>
                </div>
                <div className="feature">
                    <i className="fa-solid fa-truck-fast" style={{ fontSize: "90px" }}></i>
                    <span className="featureTitle">GIFT CARDS</span>
                    <span className="featureDesc">Buy gift cards and use coupon codes easily.</span>
                </div>
            </div>

            <div className="product" id="product">
                <Slideshow />
                {/* <img src="./skateBoardLogo.png" alt="" className="productImg" />
                <div className="productDetails">
                    <h1 className="productTitle">PAIR SKATEBOARD</h1>
                    <h2 className="productPrice">$199</h2>
                    <p className="productDesc">
                        Lorem ipsum dolor sit amet consectetur impal adipisicing elit. Alias
                        assumenda dolorum doloremque sapiente aliquid aperiam.
                    </p>
                    <div className="colors">
                        <div className="color"></div>
                        <div className="color"></div>
                    </div>
                    <div className="sizes">
                        <div className="size">42</div>
                        <div className="size">43</div>
                        <div className="size">44</div>
                    </div>
                    <button className="productButton">BUY NOW!</button>
                </div> */}
                {/* <div className="payment">
                    <h1 className="payTitle">Personal Information</h1>
                    <label>Name and Surname</label>
                    <input type="text" placeholder="John Doe" className="payInput" />
                    <label>Phone Number</label>
                    <input type="text" placeholder="+1 234 5678" className="payInput" />
                    <label>Address</label>
                    <input type="text" placeholder="Elton St 21 22-145" className="payInput" />
                    <h1 className="payTitle">Card Information</h1>
                    <div className="cardIcons">
                        <img src="./img/visa.png" width="40" alt="" className="cardIcon" />
                        <img src="./img/master.png" alt="" width="40" className="cardIcon" />
                    </div>
                    <input type="password" className="payInput" placeholder="Card Number" />
                    <div className="cardInfo">
                        <input type="text" placeholder="mm" className="payInput sm" />
                        <input type="text" placeholder="yyyy" className="payInput sm" />
                        <input type="text" placeholder="cvv" className="payInput sm" />
                    </div>
                    <button className="payButton">Checkout!</button>
                    <span className="close">X</span>
                </div> */}
            </div>
            <div className="gallery">
                <h1 className="galleryTitle">Join Us</h1>
                <div className="galleryItem">
                    <img
                        src="https://images.pexels.com/photos/9295809/pexels-photo-9295809.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                        className="galleryImg"
                    />
                    <div className="gallerySubTitle-box">
                        <h1 className="gallerySubTitle">Show Yourself!</h1>
                    </div>
                </div>
                <div className="galleryItem">
                    <img
                        src="https://images.pexels.com/photos/1040427/pexels-photo-1040427.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                        className="galleryImg"
                    />
                    <div className="gallerySubTitle-box">
                        <h1 className="gallerySubTitle">Tight bond with other</h1>
                    </div>
                </div>
                <div className="galleryItem">
                    <img
                        src="https://images.pexels.com/photos/7856965/pexels-photo-7856965.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                        className="galleryImg"
                    />
                    <div className="gallerySubTitle-box">
                        <h1 className="gallerySubTitle">Just Do it!</h1>
                    </div>
                </div>
            </div>
            <div className="newSeason">
                <div className="nsItem">
                    <img
                        src="https://images.pexels.com/photos/4753986/pexels-photo-4753986.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                        className="nsImg"
                    />
                </div>
                <div className="nsItem">
                    <h3 className="nsTitleSm">Activity Platform</h3>
                    <h1 className="nsTitle">Ask for anything</h1>
                    <h1 className="nsTitle">you want</h1>
                    <h3 className="nsTitleSm">Customize design, event, gathering...</h3>
                    <a href="#nav">
                        <button className="nsButton">Go start</button>
                    </a>
                </div>
                <div className="nsItem">
                    <img
                        src="https://images.pexels.com/photos/7856965/pexels-photo-7856965.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                        className="nsImg"
                    />
                </div>
            </div>
        </>
    );
}

export default LandingPage;
