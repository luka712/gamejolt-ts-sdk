function utilStrCompare(a: string, b: string): number {
    if (a === b) {
        return 0;
    }

    return a > b ? 1 : -1;
}

/**
 * Converts a set of query parameters into a query string.
 * @param queryParams
 */
export function utilCreateQueryString(
    queryParams: Record<string, string | number | undefined>,
): string {
    return Object.entries(queryParams)
        // Remove anything that is undefined
        .filter(([, value]) => value !== undefined)
        // Sort query parameters in order
        .sort((a, b) => utilStrCompare(a[0], b[0]))
        // Create key=value, whilst URL encoding the value
        .map(([key, value]) => `${key}=${encodeURIComponent("" + value)}`)
        .join("&");
}