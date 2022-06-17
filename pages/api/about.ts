import { NextApiHandler } from "next";
import DataSource from '../../datasource'

interface Response {
    data : {
        createdAt : {
            seconds : number,
            minutes : number,
            hours : number
            day : number,
            month : number,
            year : number,
        },
        redirect_count : number,
        url : string
    } | null,
    msg : string
}

const handler : NextApiHandler<Response> = async (req, res) => {
    const shortUrlQuery = req.query.short_url
    const shortUrl = (shortUrlQuery instanceof Array ? shortUrlQuery[0] : shortUrlQuery) || ''
    if (!shortUrl) {
        return res.status(400).json({
            data : null,
            msg : 'The `short_url` field is not provided in query'
        })
    }

    const encodedId = shortUrl.split('/').pop() || ''
    const link = await DataSource.getLink(encodedId)
    if (!link) {
        return res.status(400).json({
            data : null,
            msg : 'Link with given short_url doesn\'t exist'
        })
    }

    return res.status(200).json({
        data : {
            redirect_count : link.redirect_count,
            createdAt : {
                seconds : link.createdAt.getUTCSeconds(),
                minutes : link.createdAt.getUTCMinutes(),
                hours : link.createdAt.getUTCHours(),
                day : link.createdAt.getUTCDate(),
                month : link.createdAt.getUTCMonth() + 1,
                year : link.createdAt.getUTCFullYear()
            },
            url : link.url
        },
        msg : ''
    })
}

export default handler