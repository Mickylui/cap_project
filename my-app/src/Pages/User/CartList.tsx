import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { CartItemState } from "../../Redux/Slice/cartSlice";
import { getCartFetch, removeCartItem } from "../../Api/productFetch";

function CartList(props: { usePoint: boolean }) {
    const cartItemArr = useSelector((state: RootState) => state.cart.product);
    const status = useSelector((state: RootState) => state.cart.status);
    console.log("check cartItem", cartItemArr[0].id);
    const token = window.localStorage.getItem("token");
    const [trigger,setTrigger] = useState(true)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCartFetch({ token }));
    }, [trigger]);

    if (props.usePoint) {
        return (
            <div>
                <TableContainer>
                    <Table size="sm">
                        <Thead>
                            <Tr>
                                <Th>Product</Th>
                                <Th>Qty</Th>
                                <Th>Size</Th>
                                <Th>Amount</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        {cartItemArr.map((item) => (
                            <Tbody>
                                <Tr>
                                    <Td>{item.name}</Td>
                                    <Td>{item.quantity}</Td>
                                    <Td>{item.size}</Td>
                                    <Td>{`$ ${item.unit_price * item.quantity}`}</Td>
                                    <Td>
                                        <DeleteIcon />
                                    </Td>
                                </Tr>
                            </Tbody>
                        ))}
                        <Tfoot>
                            <Tr>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                                <Th>{`$no`}</Th>
                                <Th></Th>
                            </Tr>
                            <Tr>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                                <Th>{`$Point`}</Th>
                            </Tr>
                            <Tr>
                                <Th>Total</Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                                <Th>{`$yes`}</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </div>
        );
    }

    return (
        <div>
            <TableContainer>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Order</Th>
                            <Th>Product</Th>
                            <Th>Qty</Th>
                            <Th>Size</Th>
                            <Th>Amount</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    {cartItemArr.map((item, idx) => (
                        <Tbody>
                            <Tr>
                                <Td>{idx + 1}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.quantity}</Td>
                                <Td>{Number(item.size)}</Td>
                                <Td>{`$ ${item.unit_price * item.quantity}`}</Td>
                                <Td>
                                    <Button
                                        onClick={() => {
                                            setTrigger(!trigger);
                                            dispatch(
                                                removeCartItem({
                                                    token: token,
                                                    product_id: item.id,
                                                })

                                            );

                                            
                                        }}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    ))}
                    <Tfoot>
                        <Tr>
                            <Th>Total</Th>
                            <Th></Th>
                            <Th></Th>
                            <Th></Th>
                            <Th>{`$ `}</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>
    );
}

export default CartList;
