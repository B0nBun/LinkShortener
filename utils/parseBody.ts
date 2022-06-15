import util from 'util'
import http from 'http'
import bodyParser from 'body-parser'

export const parseBody = async <T extends unknown>(req : http.IncomingMessage, res : http.ServerResponse) : Promise<T> => {
    await util.promisify(bodyParser.urlencoded({ extended : true }))(req, res)
    return (req as any).body as T
}

export default parseBody