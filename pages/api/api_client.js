export async function apiClient(url) {
    try {
        const response = await fetch(url);
        return response;
    } catch (error) {
        return error;
    }
}
