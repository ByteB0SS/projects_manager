import toast from "react-hot-toast"

interface myFetchprops {
    endpoint: string
    fetchType: string
    body?: object | object[] | string | undefined | null 
}

export default async function myFetch(props: myFetchprops)  {
    let option: RequestInit = {
        method: `${props.fetchType}`,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(props.body){
        option.body = JSON.stringify(props.body)
    }


    try{
        const response = await fetch(props.endpoint, option)
        const json = await response.json()
    }
    catch (error) {
        const msg = 'Algum erro ao se conectar com o servidor!'
        //console.log(error)
    }
}