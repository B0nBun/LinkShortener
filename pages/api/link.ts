import { NextApiHandler } from "next";
import DataSource from '../../datasource'

interface Response {
    link : string | null,
    msg : string
}

const handler : NextApiHandler<Response> = async (req, res) => {
    if (req.method === 'POST') {
        const url : string | undefined = req.body.url
        if (!url) return res.status(400).json({
            link : null,
            msg : 'The `url` field is not provided in request body'
        })
        
        let result = await DataSource.addLink(url)
        if (result.msg !== null) {
            return res.status(500).json({
                link : null,
                msg : `Server Error: ${result.msg}`
            })
        }
        
        return res.status(200).json({
            link : `${req.headers.host || ''}/r/${result.encodedId}`,
            msg : ''
        })
    }
    
    return res.status(405).json({
        link: null,
        msg : 'Method not allowed'
    })
}

export default handler