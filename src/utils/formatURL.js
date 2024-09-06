const formatURL = (text) => {
    text = text.split("");
    text.shift();

    return text.join("");
}

module.exports = formatURL;