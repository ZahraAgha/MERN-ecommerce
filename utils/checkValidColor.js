function isValidHexColor(hex) {
    const hexColorPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    return hexColorPattern.test(hex);
}
export default isValidHexColor;
