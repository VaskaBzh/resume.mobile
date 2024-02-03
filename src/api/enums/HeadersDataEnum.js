export const HeadersDataEnum = {
    "X-CSRF-TOKEN": "{data}",
    "Accept-Language": "{data}",
    Authorization: "Bearer {data}",
    "X-Access-Key": "{data}",
    "Content-Type": "application/json; charset=utf-8",
    "Accept": "application/vnd.api+json",
    "X-Requested-With": "XMLHttpRequest",

    getHeader(headerKey, data = null) {
        return data ? this[headerKey].replace("{data}", data) : this[headerKey];
    },
};
