import Image from "next/image"
import toast from "react-hot-toast"
import { useRef } from "react"

interface serviceCardProps {
    serviceId: string
    serviceName: string
    serviceMoney: number
    serviceDescription: string
}


export default function ServiceCard (props: serviceCardProps) {
    const card = useRef<HTMLElement>(null)

    const handleDeleteService = ()=> {

        fetch(`http://localhost:8080/services/${props.serviceId}`, {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'Delete'
        }).then((res)=> {
            if(res.status > 199 && res.status < 300){
                toast.success('Serviço removido com sucesso.')
                if(card.current) card.current.style.display = 'none'
            }
        }).catch(()=> {
            toast.error('Erro ao remover serviço.')
        })
    }

    return (
        <section id={`project-${props.serviceId}`} ref={card} className="project_card h-auto max-w-[250px] min-w-[250px] max-h-[20rem]  justify-around p-2 flex flex-col gap-1 border rounded-2xl shadow-blue-200 shadow-2xl bg-blue-50  w-1/5 hover:scale-105 hover:transition hover:shadow ">
            <div className="project_name px-1 py-2 mb-1.5 bg-blue-500 rounded-2xl text-center font-bold wrap-break-word text-white"><p>{props.serviceName}</p></div>
            <div className="">
                <p className="project_money pl-2"><span className="font-bold">custo:</span> {props.serviceMoney}KZ</p>
            </div>
            <div className=" max-w-full max-h-[10rem] overflow-auto">
                <p className="project_category wrap-anywhere pl-2"><span className="font-bold">Descrição:</span> {props.serviceDescription}</p>
            </div>
            <div className="project_card_actions flex justify-start w-full">
                <button className="btn trash" onClick={()=> handleDeleteService()}><Image alt="Delete ICon for button" src={'/assets/trash.svg'} width={21} height={21}></Image></button>
            </div>
        </section>
    )
}
