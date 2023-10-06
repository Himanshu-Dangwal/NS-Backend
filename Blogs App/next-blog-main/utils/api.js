const BASE_URL = 'http://127.0.0.1:8080/api/';

// Function for making GET requests
export const get = async (url) => {
    try {
        const response = await fetch(BASE_URL + url);
        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }
        return response.json();
    } catch (error) {
        throw new Error('Error', error);
    }
};

// Function for making POST requests
export const post = async (url, data) => {
    try {
        const response = await fetch(BASE_URL + url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }
        return response.json();
    } catch (error) {
        throw new Error('Error:', error)
    }
};

// Function for making PUT requests
export const put = async (url, data) => {
    try {
        const response = await fetch(BASE_URL + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }
        return response.json();
    } catch (error) {
        throw new Error('Error:', error);
    }
};

// Function for making DELETE requests
export const del = async (url) => {
    try {
        const response = await fetch(BASE_URL + url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }
        return response.json();
    } catch (error) {
        throw new Error('Error', error);
    }
};