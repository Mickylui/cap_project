import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, HStack, Icon, Input, useNumberInput } from "@chakra-ui/react";
import React from "react";
import "../../Components/css/Product.css";
import styles from "../../Components/css/leftRightPosition.module.scss";
import { BackButton } from "../../Components/BackButton";
import { QuantityRange } from "../../Components/QuantityRange";
import { FcLikePlaceholder } from "react-icons/fc";

export function ProductDetail() {
    //useEffect=>fetch data (state: admin-Updated), isEdited-->Editable, if like --> <Icon as={FcLike} fontSize={{md:"2rem"}}/>

    return (
        <div className="product-single">
            <div className={`left-image-like-box ${styles.leftPosition}`}>
                <div className="backButton-box">
                    <BackButton />
                </div>
                <div className="productImage-box">
                    <img
                        className="productImage"
                        src="./SkateBoardLogo.png"
                        alt="skateBoard-product"
                    />
                </div>
                <div className="like-box">
                    <Icon className="like" as={FcLikePlaceholder} fontSize={{ md: "2rem" }} />
                    <div className="product-like">190</div>
                </div>
            </div>
            <div className={`right-information-box  ${styles.rightPosition}`}>
                <div className="product-subtitle product-title-box">
                    <h2 className="product-key">PAIRS SKATING</h2>
                </div>
                <div className="product-subtitle product-cost-box">
                    <h6 className="product-key">$0.00</h6>
                </div>
                <div className="product-subtitle product-availability-box">
                    <p className="product-availability">
                        <h2 className="product-key">Availability</h2>
                        <div className="product-value product-availability">Many</div>
                    </p>
                </div>
                <div className="product-subtitle product-introduction-box">
                    <p className="product-introduction">
                        <h2 className="product-key">Product</h2>
                        <div className="product-value product-introduction">demo</div>
                    </p>
                </div>
                <div className="product-subtitle product-size-box">
                    <p className="product-size">
                        <h2 className="product-key product-size-key">Size</h2>
                        <div className="product-value product-sizes">7.0</div>
                        <div className="product-value product-sizes">7.3</div>
                        <div className="product-value product-sizes">7.5</div>
                    </p>
                </div>
                <div className="product-subtitle product-quantity-box">
                    <QuantityRange />
                </div>
                <div className="product-subtitle product-share-line-box">
                    <button>Copy link</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
