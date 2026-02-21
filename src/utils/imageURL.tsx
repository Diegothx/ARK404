function getDrawingURL(fileURL: string): string {
    if (!fileURL) return "";

    return fileURL.startsWith("http")
        ? fileURL
        : `/ARK404/images/drawings/${fileURL}`;
}

export { getDrawingURL };