import { NextPage, GetServerSideProps } from "next";
import DataSource from "../../datasource";

// TODO: Maybe use NextApiHandler instead of a page
const Redirect : NextPage = () => {
    return <h1>Error 404: No url</h1>
}

export const getServerSideProps : GetServerSideProps = async (context) => {
    const idParam : string | string[] | undefined = context.params?.encodedId
    const encodedId : string = (idParam instanceof Array ? (idParam.join('')) : idParam) || ''

    const link = await DataSource.getLinkWithInc(encodedId)
    if (!link) {
        return {
            notFound : true
        }
    }
    
    return {
        redirect : {
            permanent : false,
            // I don't know how to fix the problem where user doesn't input the protocol
            // e.g. example.com will riderect not to https://example.com, but to http://hostname/r/example.com
            // so I decided to put this ternary operator here
            destination : !link.url.match(/https?:\/\//) ? `https://${link.url}` : link.url
        }
    }
}

export default Redirect