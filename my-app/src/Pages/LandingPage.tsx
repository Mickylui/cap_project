import { Slideshow } from "../Components/AutoSlider";
import "../Components/css/landingPage.scss";
import { Link as RouteLink } from "react-router-dom";
export function LandingPage() {
  return (
    <>
      <video className="landingVideo" muted autoPlay loop width={"100%"}>
        <source src="./landingVideo.mp4" type="video/mp4" />
      </video>

      <div className="landing_features" style={{ marginTop: "55px" }}>
        <div className="feature">
          <i className="fa-solid fa-trophy" style={{ fontSize: "90px" }}></i>
          <span className="featureTitle">HIGH QUALITY</span>
          <span className="featureDesc">
            We provide ONLY high quality skateboard.
          </span>
        </div>
        <div className="feature">
          <i
            className="fa-solid fa-money-check-dollar"
            style={{ fontSize: "90px" }}
          ></i>
          <span className="featureTitle">REWARD</span>
          <span className="featureDesc">
            To promote skateboard culture, we offer reward for our friends and
            customers.
          </span>
        </div>
        <div className="feature">
          <i
            className="fa-solid fa-truck-fast"
            style={{ fontSize: "90px" }}
          ></i>
          <span className="featureTitle">FREE SHIPPING</span>
          <span className="featureDesc">Fast shipping on all orders.</span>
        </div>
      </div>

      <div className="product" id="product">
        <Slideshow />
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
