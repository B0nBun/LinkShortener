import { GetServerSideProps, NextPage } from 'next'

interface Props {
    host : string
}

const AboutApi : NextPage<Props> = ({ host }) => {
    return (
        <div className="body-wrapper flex flex-col max-w-5xl mx-auto tablet:text-lg">
            <section className="flex flex-col px-5 pt-5 gap-5">
                <a className="text-red underline text-sm" href="/">&lt;- Go back</a>
                <h1 className="font-bold">API</h1>
                <section className="flex flex-col gap-2">
                    <h2 className="font-bold">Add a new shortened url</h2>
                    <code className="text-red">POST : /api/link</code>
                    <p>With Request body:</p>
                    <pre className="bg-black text-white p-2 rounded-sm overflow-x-auto">{
                        JSON.stringify({
                            url : 'https://example.com'
                        }, null, 2)
                    }</pre>                
                    <p>JSON Response:</p>
                    <pre className="bg-black text-white p-2 rounded-sm overflow-x-auto">
                        <b className="text-white">// Success:</b><br />
                        {
                            JSON.stringify({
                                link : `${host}/r/123abc`,
                                msg : ''
                            }, null, 2)
                        }
                        <br/>
                        <b className="text-white">// Error:</b><br />
                        {
                            JSON.stringify({
                                link : null,
                                msg : '<Some error>'
                            }, null, 2)
                        }
                    </pre>
                </section>
                <section className="flex flex-col gap-2">
                    <h2 className="font-bold">Get data about shortened url</h2>
                    <code className="text-red">GET : /api/about?short_url=&lt;shortened_url&gt;</code>
                    <p>Query params</p>
                    <pre className="bg-black text-white p-2 rounded-sm overflow-x-auto">
                        {
                            JSON.stringify({
                                short_url : `${host}/r/123abc`
                            }, null, 2)
                        }                        
                    </pre>
                    <p>JSON Response:</p>
                    <pre className="bg-black text-white p-2 rounded-sm overflow-x-auto">
                        <b className="text-white">// Success:</b><br />
                        <b className="text-white">// Date is in UTC</b><br />
                        {
                            JSON.stringify({
                                data : {
                                    createdAt : {
                                        seconds : 0,
                                        minutes : 0,
                                        hours : 0,
                                        day : 1,
                                        month : 1,
                                        year : 1970,
                                    },
                                    redirect_count : 0,
                                    url : 'https://original_long_url.com' 
                                },
                                msg : ''
                            }, null, 2)
                        }
                        <br/>
                        <b className="text-white">// Error:</b><br />
                        {
                            JSON.stringify({
                                data : null,
                                msg : '<Some error>'
                            }, null, 2)
                        }
                    </pre>
                </section>
            </section>
        </div>
    )
}

export const getServerSideProps : GetServerSideProps<Props> = async ({ req }) => {
    return {
        props : {
            host : req.headers.host || 'hostname.eg'
        }
    }
}

export default AboutApi