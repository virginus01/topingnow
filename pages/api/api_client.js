export async function apiClient(url) {
    try {
        console.log(url)
        const response = await fetch(url);
        return response;

    } catch (error) {
        return error;
    }
}
