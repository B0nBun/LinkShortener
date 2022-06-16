import { GetServerSideProps, NextPage } from 'next'

interface Props {
    host : string
}

// TODO: Add API endpoint with redirect_count
const AboutApi : NextPage<Props> = ({ host }) => {
    return (
        <div className="body-wrapper flex flex-col max-w-5xl mx-auto tablet:text-lg">
            <section className="flex flex-col px-5 pt-5 gap-2">
                <a className="text-red underline text-sm" href="/">&lt;- Go back</a>
                <h1 className="font-bold">API</h1>
                <p>There's only one endpoint in the api:</p>
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
                            msg : null
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