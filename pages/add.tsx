import { GetServerSideProps, NextPage } from "next"
import React, { useCallback, useState } from "react"
import DataSource from "../datasource"
import copy from "../utils/copy"
import parseBody from "../utils/parseBody"

type Props = {
    newUrl : string,
    error : null
} | {
    newUrl : null,
    error : string
}

const Add : NextPage<Props> = ({ newUrl, error }) => {
    const [isCopied, setIsCopied] = useState(false)
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null)
    
    const handleLinkClick = useCallback((e : React.MouseEvent<HTMLElement>) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }
        const id = setTimeout(() => setIsCopied(false), 2000)
        setTimeoutId(id)
        if (!newUrl) return
        copy(newUrl)
            .then(() => setIsCopied(true))
            .catch(() => console.log('Clipboard is not supported'))
        setIsCopied(true)
    }, [timeoutId])
    
    return (
        <div className="flex flex-col items-center tablet:justify-center body-wrapper">
            <header className="flex flex-col items-center gap-4 py-10">
                <h1 className={`font-bold ${error ? 'text-red' : ''}`}>{error ? 'Server Error!' : 'Here\'s your short link:'}</h1>
            <span className={`box-content flex items-center justify-center ${isCopied ? 'h-[2.2em]' : 'h-0'} px-5 overflow-y-hidden transition-[height] bg-red text-white rounded-sm`}>Copied!</span>
                {
                    error ? (
                        <h2 className="bg-red text-white py-3 px-5 w-full text-center rounded-md">{error}</h2>
                    ) : (
                        <h2 onClick={handleLinkClick} className="cursor-pointer border-4 min-w-full text-center border-red rounded-md py-3 px-5 tablet:text-2xl tablet:py-5 overflow-x-auto">{newUrl}</h2>
                    )
                }
            </header>
            <div className="flex gap-5">
                <a className="text-xl bg-black text-white px-5 py-3 rounded-md" href="/">Go Back</a>
                <a className="text-xl bg-black text-white px-5 py-3 rounded-md" href={`/count?short_url=${newUrl}`}>Track Redirects</a>
            </div>
        </div>
    )
}

export default Add

export const getServerSideProps : GetServerSideProps<Props> = async (context) => {
    const { url } = await parseBody<{url : string | undefined}>(context.req, context.res)
    
    if (context.req.method === 'POST' && url) {
        let result = await DataSource.addLink(url)
        if (!result.link) {
            return {
                props : {
                    newUrl : null,
                    error : result.msg
                }
            }
        }

        return {
            props : {
                newUrl : `${context.req.headers.host || ''}/r/${result.encodedId}`,
                error : null
            }
        }
    }
    
    return {
        redirect : {
            destination : '/',
            permanent : false
        }
    }
}