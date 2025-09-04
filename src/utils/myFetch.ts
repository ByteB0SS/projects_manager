
interface myFetchprops {
    endpoint: string
    fetchType: string
    body?: object | object[] | string | undefined | null 
}

export default async function myFetch(props: myFetchprops)  {
    const option: RequestInit = {
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
        console.log(json)
    }
    catch (error) {
        const msg = 'Algum erro ao se conectar com o servidor!'
        console.log(msg)
        console.log(error)
    }
}