import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";

export function HookUsage() {
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
        <HStack maxW="320px">
            <Button {...inc}>+</Button>
            <Input {...input} />
            <Button {...dec}>-</Button>
            <Button>Add to Cart</Button>
        </HStack>
    );
}
