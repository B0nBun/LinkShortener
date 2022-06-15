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
            permanent : true,
            destination : link.url
        }
    }
}

export default Redirect