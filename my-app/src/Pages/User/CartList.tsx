import React from 'react';
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
} from "@chakra-ui/react";

function CartList() {
    const cart = [
        {
            order: 1,
            product: "PAIRS SKATING",
            num: 2,
            size: "7.0",
            unitPrice: 190,
        },
        {
            order: 2,
            product: "PAIRS SKATING",
            num: 1,
            size: "7.3",
            unitPrice: 190,
        },
    ];
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
                                    </Tr>
                                </Thead>
                                {cart.map((item) => (
                                    <Tbody>
                                        <Tr>
                                            <Td>{item.order}</Td>
                                            <Td>{item.product}</Td>
                                            <Td>{item.num}</Td>
                                            <Td>{item.size}</Td>
                                            <Td>
                                                {`$ ${item.unitPrice*item.num}`}
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