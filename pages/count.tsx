import { GetServerSideProps, NextPage } from "next"
import { useState } from "react"
import DataSource from "../datasource"

interface Props {
    originalUrl : string,
    isShortUrlProvided : boolean,
    count : number,
    error : string | null,
}

const UrlNotProvided : React.FC = () => {
    const [url, setUrl] = useState('')

    const href = `/count?short_url=${url}`
    
    return (
        <div className="flex flex-col bg-red p-6 text-lg rounded-md gap-5">
            <p className="text-white">Input your short url and track how many redirects it recieved</p>
            <div className="flex rounded-sm overflow-hidden border-2 border-black">
                <input className="flex flex-auto rounded-none" placeholder="Short Url" type="text" value={url} onChange={e => setUrl(e.currentTarget.value)} />
                <a href={href} className="px-5 py-2 bg-black text-white hocus-active:bg-red outline-none hocus-active:text-white transition-colors rounded-none">Track</a>
            </div>
        </div>
    )
}

const RedirectCount : NextPage<Props> = ({ originalUrl, count, error, isShortUrlProvided }) => {
    
    return (
        <div className="body-wrapper flex flex-col gap-10 max-w-lg mx-auto items-center pt-10 px-7">
            <h1 className="font-bold text-center">Total Redirect Count</h1>
            {
                !isShortUrlProvided ? (
                    <div>
                        <UrlNotProvided />
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        {
                            error ? (
                                <h2 className="bg-red rounded-md py-3 px-5 text-center">{error}</h2>
                            ) : (
                                <a className="border-red border-4 rounded-md py-3 px-5 text-center" href={originalUrl}><h2>{originalUrl}</h2></a>
                            )
                        }
                        <span className="text-lg text-center">Total number of redirects that this link recieved:</span>
                        <h1 className="font-bold text-8xl text-center">{count}</h1>
                        <span className="text-lg text-center">Every redirect counts, even if it is from the same person</span>
                    </div>
                )
            }
            <a href="/" className="bg-black text-white px-5 py-3 rounded-md self-center">Go back</a>
        </div>
    )
}

export default RedirectCount

export const getServerSideProps : GetServerSideProps<Props> = async (context) => {
    const urlQuery = context.query.short_url
    const shortUrl = (urlQuery instanceof Array ? urlQuery[0] : urlQuery)
    
    if (!shortUrl) {
        return {
            props : {
                originalUrl : '',
                isShortUrlProvided : false,
                count : 0,
                error : null
            }
        }
    }
    
    const encodedId = shortUrl.split('/').pop() || ''
    const link = await DataSource.getLink(encodedId)

    if (!link) {
        return {
            props : {
                originalUrl : '',
                isShortUrlProvided : true,
                count : 0,
                error : 'This shortened link doesn\'t exist'
            }
        }
    }
    
    return { 
        props : {
            originalUrl : link.url,
            isShortUrlProvided : true,
            count : link.redirect_count,
            error : null
        }
    }
}