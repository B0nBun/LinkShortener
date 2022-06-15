import { Link, PrismaClient } from "@prisma/client";
import isUrlValid from "./url-validator";

const prisma = new PrismaClient()

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const characters = Array.from(`0123456789${alphabet}${alphabet.toUpperCase()}_-`)

// Encoding is just a conversion to base 64
const encodeId = (id : number) : string => {
    const base = characters.length
    let n = id
    let res = characters[n % base]
    n = Math.floor(n / base)
    while (n) {
        res = characters[n % base] + res
        n = Math.floor(n / base)
    }
    return res
}

// Decoding, respectively, is a conversion from base 64 to base 10
const decodeId = (s : string) : number => {
    const base = characters.length
    let result = 0
    Array.from(s.split('').reverse().entries())
        .forEach(([idx, char]) => {
            let foundIdx = characters.findIndex(c => c === char)
            result += Math.pow(base, idx) * foundIdx
        })
    return result
}

type AddLinkReturn = {
    link : Link,
    encodedId : string,
    msg : null
} | {
    link : null,
    encodedId : null,
    msg : string
}

const DataSource = {
    async addLink(url : string) : Promise<AddLinkReturn> {
        // Check if the same url already exists
        // TODO: Maybe make a better check, that returns true for https://example.com == www.example.com
        const sameLink = await prisma.link.findFirst({
            where : {
                url
            }
        })

        if (sameLink) {
            return {
                link : sameLink,
                encodedId : encodeId(sameLink.id),
                msg : null
            }
        }

        if (isUrlValid(url)) {
            return {
                link : null,
                encodedId : null,
                msg : 'given url is not valid'
            }
        }
        
        const result = await prisma.link.create({
            data : {
                url,
            }
        })
            .then(newLink => ({
                link : newLink,
                msg : ''
            }))
            .catch((e : Error) => ({
                link : null,
                msg : e.message
            }))

        if (!result.link) {
            return {
                link : null,
                encodedId : null,
                msg : result.msg,
            }
        }
        return {
            link : result.link,
            encodedId : encodeId(result.link.id),
            msg : null
        }
    },
    async getLink(encodedId : string) : Promise<Link | null> {
        const decodedId = decodeId(encodedId)
        const result = await prisma.link.findFirst({
            where : {
                id : decodedId
            }
        })
            .then(link => ({
                link,
                msg : ''
            }))
            .catch((e : Error) => ({
                link : null,
                msg : e.message
            }))
        if (!result.link) return null
        return result.link
    }
}

export default DataSource