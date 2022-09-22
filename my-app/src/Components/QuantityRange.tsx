import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

export function QuantityRange() {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 6,
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    const [inputValue, setInputValue] = useState(1);
    function getQuantity() {
        console.log(inputValue);
    }

    return (
        <HStack maxW="320px" border={"solid"}>
            <Button {...dec}>-</Button>
            <Input {...input} onChange={(e) => setInputValue(Number(e.target.value))} />
            <Button {...inc}>+</Button>
            <Button onClick={getQuantity}>Add to Cart</Button>
        </HStack>
    );
}
