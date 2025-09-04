import { Input } from "./ProjectForm"
import React from "react"

interface statesType {
    serviceName: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    toSpent: number,
    setToSpent: React.Dispatch<React.SetStateAction<number>>,
    description: string,
    setDescription: React.Dispatch<React.SetStateAction<string>>
}

interface serviceFormProps {
    states:  statesType
    textButton: string,
    onSubmitFunction: (e:  React.MouseEvent<HTMLButtonElement>) => void,
}

export default function ServiceForm (props: serviceFormProps) {
    return ( 
        <form className="w-full flex flex-col justify-start gap-[2rem] rounded">
            <Input inputId="name" inputType="text" placeholder="Digite o nome do serviço" setvalue={props.states.setName} textLabel="Nome do Serviço" value={props.states.serviceName}/>
            <Input inputId="Custos" inputType="number" placeholder="Quanto este serviço pode custar?" setvalue={props.states.setToSpent} textLabel="Custo do Serviço" value={props.states.toSpent}/>
            <textarea className="border p-[1rem]" cols={20}  id="description" placeholder="Descreva o Serviço..."  value={props.states.description} onChange={(e) => props.states.setDescription(e.target.value)} ></textarea>
            <button className="btn-blue" onClick={props.onSubmitFunction} type="submit">{props.textButton}</button>
        </form>
    )
}