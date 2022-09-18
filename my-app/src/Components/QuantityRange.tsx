import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

export function QuantityRange() {
    const isAdmin = useSelector((state: RootState) => state.account.isAdmin);
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 6,
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    if (isAdmin) {
        return (
            <HStack maxW="320px" border={"solid"}>
                <Button {...dec} isDisabled>
                    -
                </Button>
                <Input {...input} isDisabled />
                <Button {...inc} isDisabled>
                    +
                </Button>
                <Button isDisabled>Add to Cart</Button>
            </HStack>
        );
    }
    return (
        <HStack maxW="320px" border={"solid"}>
            <Button {...dec}>-</Button>
            <Input {...input} />
            <Button {...inc}>+</Button>
            <Button>Add to Cart</Button>
        </HStack>
    );
}
