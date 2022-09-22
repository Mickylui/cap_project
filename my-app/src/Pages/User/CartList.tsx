import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function CartList(props: { usePoint: boolean }) {
    const cartItemArr = useSelector((state: RootState) => state.cart.list);

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
                    {cartItemArr.map((item) => (
                        <Tbody>
                            <Tr>
                                <Td></Td>
                                <Td>{item.name}</Td>
                                <Td>{item.quantity}</Td>
                                <Td>{item.size}</Td>
                                <Td>{`$ ${item.unit_price * item.quantity}`}</Td>
                                <Td>
                                    <Button>
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
