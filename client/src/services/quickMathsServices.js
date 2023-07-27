import axios from 'axios';

function createCode() {
    let result = '';
    const characters = 'abcedfghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 4) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result.toUpperCase();
}

export async function createNewGameDB() {
    const fetchURL =
        process.env.REACT_APP_BACKEND + '/api/quickMaths/createNewGame';
    const code = createCode();
    try {
        await axios({
            method: 'post',
            url: fetchURL,
            data: {
                gameCode: code,
            },
        });

        return code;
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            if (error.response) {
                // The client was given an error response (5xx, 4xx)
                console.error(error.response.data);
                // console.error(err.response.status);
                // console.error(err.response.headers);
            } else if (error.request) {
                // The client never received a response, and the request was never left
                console.error(error.request);
            } else {
                // Anything else
                console.error('Error', error.message);
            }
        }
    }
}

export async function initializeGameDB(code) {
    try {
        const fetchURL = `${process.env.REACT_APP_BACKEND}/api/quickMaths/initialize`;

        await axios({
            method: 'patch',
            url: fetchURL,
            data: {
                gameCode: code,
            },
        });
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            if (error.response) {
                // The client was given an error response (5xx, 4xx)
                console.error(error.response.data);
                // console.error(err.response.status);
                // console.error(err.response.headers);
            } else if (error.request) {
                // The client never received a response, and the request was never left
                console.error(error.request);
            } else {
                // Anything else
                console.error('Error', error.message);
            }
        }
    }
}
