import { useState, useEffect } from "react"
import { json } from "stream/consumers"

//Interfaces
interface category{
    id: number,
    categoryName: string
}

interface project{
    projectName: string,
    projectMoney: number,
    projectCategory: string
}

export default function CreateProjectForm(){
    const [projectName, setProjectName] = useState<string>("")
    const [money, setMoney] = useState<number>(0)
    const [cat, setCat] = useState<string>("Categoria")
    const [categories, setCategories] = useState<category[]>([])

    useEffect(()=> {
       async function fetchCategories() {
        const getCategories = await fetch("http://localhost:8080/projectCategories", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })

        const categoriesAux = await getCategories.json()
        setCategories(categoriesAux)
       }

       fetchCategories()
    }, [])     

    async function createProject () {
        const projectDatas: project = {
            projectName: projectName,
            projectMoney: money,
            projectCategory: cat,
        }
        let response = await fetch("http://localhost:8080/projects", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(projectDatas)
        })
    }

    return(
        <form id="create-project-id-alterado-3" className="flex flex-col gap-5">
            <legend className="text-1xl font-bold">Criar projecto</legend>
            <input type="text" placeholder="Nome do projecto..." className="px-5 p-2 border-1 rounded-[7px] focus:border-amber-500" value={projectName} onChange={(evt)=> setProjectName(evt.target.value)}/>
            <input type="number" placeholder="Maximo a gastar(Orçamento)..." className="px-5 p-2 border-1 rounded-[7px]  focus:border-amber-500"  value={money} onChange={(evt)=> setMoney(Number(evt.target.value))}/>
            <select className="p-1 rounded-[7px] border" name="Category" id="Category" value={cat} onChange={(evt)=> setCat(evt.target.value)}>
                <option value="">Selecione a categoria</option>
                {
                    categories.map((category)=> <option value={category.categoryName} key={category.id}>{category.categoryName}</option>)
                }
            </select>
            <button type="button" className="create-btn mt-2.5 bg-blue-500 px-5 py-2.5 rounded-[7px] w-[100%]"onClick={createProject}>Criar projecto.</button>
        </form>
    )
}