import { ValidationRulesEnum } from "@/modules/validate/enums/ValidationRulesEnum";

export const ValidationFunctionsEnum = {
    required: (inputValue) => inputValue.length === 0,
    match: (inputValue, equalValue) => inputValue.length === equalValue,
    max: (inputValue, maxValue = 15) => inputValue.length > maxValue,
    min: (inputValue, minValue = 3) =>
        inputValue.length < minValue && inputValue.length !== 0,

    name: (inputValue) => (inputValue.length > 15 ||
        inputValue.length < 3 ||
        !ValidationRulesEnum.name.test(inputValue)) &&
        inputValue.length !== 0,

    wallet: (inputValue) => (inputValue.length < 19 ||
        !ValidationRulesEnum.wallet.test(inputValue)) &&
        inputValue.length !== 0,

    watcher: (inputValue) => inputValue.length > 15 || inputValue.length < 1 && inputValue.length !== 0,

    isValid: (inputValue, ruleKey) => !ValidationRulesEnum[ruleKey].test(inputValue) &&
        inputValue.length !== 0,
};
