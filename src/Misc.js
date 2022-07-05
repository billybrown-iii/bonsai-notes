/** Remove leading and tailing spaces. */
const truncateSpaces = (str) => {
    if (str.length === 0) return str;
    while (str[0].match(/\s/)) str = str.slice(1);
    while (str[str.length - 1].match(/\s/)) str = str.slice(0, str.length - 1);
    return str;
}

export { truncateSpaces };