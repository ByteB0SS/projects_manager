import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import React from "react"

interface inputProps {
    inputId: string
    textLabel: string
    inputType: string | 'text' | 'number'
    placeholder: string
    value: string | number
    // eslint-disable-next-line
    setvalue: React.Dispatch<React.SetStateAction<any>> 
}
interface category{
    id: number,
    categoryName: string
}

interface projectFormProps {
    textBtn: string
    projectId: string
    projectName: string
    projectBudget: number 
    projectCateg: string
    setProjectId: React.Dispatch<React.SetStateAction<string>>
    setProjectName: React.Dispatch<React.SetStateAction<string>>
    setProjectBuget: React.Dispatch<React.SetStateAction<number>>
    setProjectCateg: React.Dispatch<React.SetStateAction<string>>
    onClickFunction: ()=> void
}

export function Input (inputProps: inputProps) {
    return (
        <div className="flex flex-col ">
            <label htmlFor={inputProps.inputId}>{inputProps.textLabel}</label>
            <input className="border rounded p-[1rem]" type={inputProps.inputType} placeholder={inputProps.placeholder} value={inputProps.value} onChange={(e)=> inputProps.setvalue(e.target.value)}/>
        </div>
    )
}

export default function ProjectForm (props: projectFormProps) {
    const [categories, setCategories] = useState<category[]>([])
    
    useEffect(()=> {
   
          async function fetchCategories() {
               try {
                       const getCategories = await fetch("http://localhost:8080/projectCategories", {
                           method: "GET",
                           headers: {
                               "Content-Type": "application/json"
                           }
                       })
                       console.log(getCategories)
                       const categoriesAux = await getCategories.json()
                       setCategories(categoriesAux)
                   
               }
               catch {
                   toast.error('Algum erro ao se conectar com o servidor, por favor tente mais tarde.')
               }
       }
          fetchCategories()
       }, [])     

    return (
        <div className="flex w-full h-full gap-[2rem] flex-col">
            <Input inputId="projectName" inputType="text" placeholder="Nome do projecto" textLabel="Nome do projecto" value={props.projectName} setvalue={props.setProjectName}></Input>
            <Input inputId="budget" inputType="number" placeholder="Orçamento" textLabel="Orçamento" value={props.projectBudget} setvalue={props.setProjectBuget}></Input>
            <select className="p-[1rem] rounded-[7px] border" name="Category" id="Category" value={props.projectCateg} onChange={(evt)=> props.setProjectCateg(evt.target.value)}>
                <option value="" hidden  >Selecione a categoria</option>
                {
                    categories.map((category)=> <option value={category.categoryName} key={category.id}>{category.categoryName}</option>)
                }
            </select>
            <button type="button" className="btn-blue max-w-[20rem]" onClick={props.onClickFunction}>{props.textBtn}</button>
        </div>
    )
}