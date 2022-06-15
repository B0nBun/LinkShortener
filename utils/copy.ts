const copy = async (text : string) : Promise<void> => {
    if (window.navigator && window.navigator.clipboard) {
        return window.navigator.clipboard.writeText(text)
    }
    return Promise.reject('Sorry, clipboard is not supported in your browser')
}

export default copy