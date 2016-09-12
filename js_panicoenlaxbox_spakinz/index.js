"use strict";

function objectToQueryString(value, parentPropertyName) {
    if (!isValidObject(value)) {
        return "";
    }
    let queryString = "";
    for (var propertyName in value) {
        if (typeof(value[propertyName]) === "object") {
            queryString += objectWithParentToQueryString(value[propertyName], propertyName);
        } else {
            queryString += `${propertyName}=${value[propertyName]}&`;
        }
    }

    return removeLastAmpersand(queryString);
}

function isValidObject(value) {
    return typeof(value) !== "undefined" && value !== null && typeof(value) !== "string" && !isEmptyObject(value);
}

function objectWithParentToQueryString(value, parentPropertyName) {
    let queryString = "";
    for (var propertyName in value) {
        if (typeof(value[propertyName]) === "object") {
            queryString += objectWithParentToQueryString(value[propertyName], `${parentPropertyName}[${propertyName}]`);
        } else {
            queryString += `${parentPropertyName}[${propertyName}]=${value[propertyName]}&`;
        }
    }
    return queryString;
}

function isEmptyObject(value) {
    return JSON.stringify(value) === "{}";
}

function removeLastAmpersand(value) {
    if (value.lastIndexOf("&") === value.length - 1) {
        return value.substring(0, value.length - 1);
    }
    return value;
}

module.exports = objectToQueryString;