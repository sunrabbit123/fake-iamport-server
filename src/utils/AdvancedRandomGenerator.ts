import { ArrayUtil, RandomGenerator } from "@nestia/e2e";
import { randint } from "tstl/algorithm/random";

export const AdvancedRandomGenerator = {
    ...RandomGenerator,
    cardNumber: () =>
        ArrayUtil.repeat(4, () => RandomGenerator.digit(1, 4)).join("-"),
    name: (length: number = 3) =>
        Array(length)
            .fill("")
            .map(() => String.fromCharCode(randint(44031, 55203)))
            .join(""),
};
