const cutText = (text) => {
    if (text === "-") {
        return text;
    }

    return `${text.substr(0, 8)}...`;
}

const cutTextCenter = (text) => {
    if (text === "-") {
        return text;
    }

    return `${text.substr(0, 4)}...${text.substr(text.length - 4, text.length)}`;
}

export const FormatFunctionEnum = {
    wallet: cutTextCenter,
    txid: cutText,
}