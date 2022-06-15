const isUrlValid = (url : string) : boolean => {
    const regex = new RegExp("((http|https)://)?(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")
    return regex.test(url)
}

export default isUrlValid