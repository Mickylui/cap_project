import { Slideshow } from "../Components/AutoSlider";
import "../Components/css/landingPage.scss";
import { Link as RouteLink } from "react-router-dom";
export function LandingPage() {
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
                        src="https://images.unsplash.com/photo-1591311337241-cecfd26f1da1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2thdGVib2FyZGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
                        alt=""
                        className="galleryImg"
                    />
                    <div className="gallerySubTitle-box">
                        <h1 className="gallerySubTitle">Show Yourself!</h1>
                    </div>
                </div>
                <div className="galleryItem">
                    <img
                        src="https://cdn.shopify.com/s/files/1/0515/3724/8432/articles/group-of-skate-kids_384x.png?v=1617567034"
                        alt=""
                        className="galleryImg"
                    />
                    <div className="gallerySubTitle-box">
                        <h1 className="gallerySubTitle">Tight bond with other</h1>
                    </div>
                </div>
                <div className="galleryItem">
                    <img
                        src="https://i0.wp.com/youthcare.org/wp-content/uploads/2021/01/pexels-allan-mas-5370615-scaled.jpg?fit=1834%2C2560&ssl=1"
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
                        src="https://st.depositphotos.com/1993283/2007/i/600/depositphotos_20073547-stock-photo-skateboarding.jpg"
                        alt=""
                        className="nsImg"
                    />
                </div>
                <div className="nsItem">
                    <h3 className="nsTitleSm">Activity Platform</h3>
                    <h1 className="nsTitle">Ask for anything</h1>
                    <h1 className="nsTitle">you want</h1>
                    <h3 className="nsTitleSm">Customize design, event, gathering...</h3>
                    <RouteLink to={"platform/posts"}>
                        <button className="nsButton">Go start</button>
                    </RouteLink>
                </div>
                <div className="nsItem">
                    <img
                        src="https://apicms.thestar.com.my/uploads/images/2022/09/06/1726547.jpg"
                        alt=""
                        className="nsImg"
                    />
                </div>
            </div>
        </>
    );
}

export default LandingPage;
