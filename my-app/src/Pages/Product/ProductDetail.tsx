import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import React from "react";
import "../../Components/css/Product.css";
import styles from "../../Components/css/leftRightPosition.module.scss";

export function ProductDetail() {
    //useEffect=>fetch data (state: admin-Updated)

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 6,
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <div>
            <div className="product-singel" style={{ display: "flex" }}>
                <div className={`left-image-like-box ${styles.leftPosition}`}>
                    <Button>
                        <ArrowBackIcon />
                    </Button>
                    <img src="./SkateBoardLogo.png" alt="skateBoard-product" />
                    <div className="product-like">190</div>
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
                        <HStack maxW="320px">
                            <Button {...inc}>+</Button>
                            <Input {...input} />
                            <Button {...dec}>-</Button>
                            <Button>Add to Cart</Button>
                        </HStack>
                    </div>
                    <div className="product-subtitle product-share-line-box">
                        <button>Copy link</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
