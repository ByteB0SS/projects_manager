import { useState } from "react"

export default function CreateProjectForm(){
    const [projectName, setProjectName] = useState<string>("")
    const [money, setMoney] = useState<number>()
    const [cat, setCat] = useState<string>("Categoria")

    return(
        <form className="flex flex-col gap-5">
            <legend className="text-1xl font-bold">Criar projecto</legend>
            <input type="text" placeholder="Nome do projecto..." className="px-5 p-2 border-1 rounded-[7px] focus:border-amber-500" value={projectName} onChange={(evt)=> setProjectName(evt.target.value)}/>
            <input type="number" placeholder="Maximo a gastar(Orçamento)..." className="px-5 p-2 border-1 rounded-[7px]  focus:border-amber-500"  value={money} onChange={(evt)=> setMoney(Number(evt.target.value))}/>
            <select className="p-1 rounded-[7px] border" name="Category" id="Category" value={cat} onChange={(evt)=> setCat(evt.target.value)}>
                <option value="xyz">xyz</option>
                <option value="abc">abc</option>
            </select>
            <button className="create-btn mt-2.5 bg-blue-500 px-5 py-2.5 rounded-[7px] w-[100%]">Criar projecto.</button>
        </form>
    )
}