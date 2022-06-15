import { NextPage, GetServerSideProps } from "next";
import DataSource from "../../datasource";

interface Props {
    url : string
}

const Redirect : NextPage<Props> = props => {
    return <a href={props.url || '/'}>{props.url || 'Error 404: No url' }</a>
}

export const getServerSideProps : GetServerSideProps<Props> = async (context) => {
    const idParam : string | string[] | undefined = context.params?.encodedId
    const encodedId : string = (idParam instanceof Array ? (idParam.join('')) : idParam) || ''

    const link = await DataSource.getLink(encodedId)
    if (!link) {
        // TODO: 404
        return {
            props : {
                url : ''
            }
        }
    }
    
    return {
        props : {
            url : link.url
        }
    }
}

export default Redirect