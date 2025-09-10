import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import Page from "@/components/Page"
import NavPages from "@/components/NavPages"
import Loader from "@/components/Loader"
import ProjectForm from "@/components/ProjectForm"
import schema from "@/utils/validators/initProjectDatas.validator"
import { projectInterface as projectType } from "@/pages/Global"
import ServiceForm from "@/components/ServiceForm"
import { v4 } from "uuid"
import ServiceCard from "@/components/ServiceCard"


interface projectInterface {
    id: string
    projectName: string
    projectMoney: number
    projectCategory: string
}

interface serviceInterface {
    id: string,
    name: string,
    toBeSpent: number,
    description: string,
    projectId: string
}

export default function Project () {
    const [project, setProject] = useState<projectInterface>()
    const [services, setServices] = useState<serviceInterface[]>([])
    const [showProjectDetails, setShowProjectDetails] = useState(true)
    const [showServiceForm, setShowServiceForm] = useState(false)

    const [projectId, setProjectId] = useState<string>("")
    const [projectName, setProjectName] = useState<string>("")
    const [projectBudget, setProjectBudget] = useState<number>(0)
    const [projectBudgetAux, setProjectBudgetAux] = useState<number>(0)
    const [projectCateg, setProjectCateg] = useState<string>("")

    const [totalUsed, setTotalUsed] = useState<number>(0)

    const router = useRouter()

    useEffect(()=> {
        if(!project) return 
        setProjectName(String(project.projectName))
        setProjectBudget(Number(project.projectMoney))
        setProjectCateg(String(project.projectCategory))
        setProjectBudgetAux(project.projectMoney)
    }, [project])

    useEffect(()=> {
        if(!services) return 
        const totalToSpent = services.reduce((acc, s) => acc + Number(s.toBeSpent), 0)
        setTotalUsed(totalToSpent)
        setProjectBudgetAux(projectBudget - totalToSpent)
    }, [services, projectBudget])

    const [serviceName, setServiceName] = useState<string> ('')
    const [toSpent, setToSpent] = useState<number> (1000)
    const [serviceDescription , setServiceDescription] = useState<string> ('')
  
    const states = {
        serviceName: serviceName,
        toSpent: toSpent,
        description: serviceDescription,
        setName: setServiceName,
        setToSpent: setToSpent,
        setDescription: setServiceDescription
    }

    const id = router.query.id

    async function postService (e:  React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (projectBudgetAux - toSpent < 0) {
            toast.error('O custo do serviço ultrapassa o orçamento do projecto.')
            return
        }

        const serviceToPostDatas = {
            id: v4(),
            name: serviceName,
            toBeSpent: toSpent,
            description: serviceDescription,
            projectId: id
        }
        
        try{
            const response = await fetch(`http://localhost:8080/services`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceToPostDatas)
            })

            if(response.status > 199 && response.status < 300) {
                toast.success('Serviço adicionado com sucesso.')
            }
            else{
                toast.error('Erro inesperado.')
            }

            setTimeout(()=> router.reload(), 3000)
        }

        catch{
            toast.error('Erro: servidor desligado, tente mais tarde!')
        }
    }

    useEffect(()=> {
        async function main () {
            if (!id) return

            try{
                const response = await fetch(`http://localhost:8080/projects/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (response.status === 404) {
                    toast.error('Projecto não encontrado!')
                    return
                }

                if (response.status !== 200){
                    toast.error('Erro ao pegar os dados do projecto!')
                    return
                }

                const json = await response.json()
                setProject(json)
                setProjectName(String(json.projectName))
                setProjectId(String(json.id))
                setProjectCateg(String(json.projectCategory))
                setProjectBudget(Number(json.projectMoney))
            }

            catch {
                toast.error('Erro ao pegar os dados do projecto!')
            }

            try{
                const response = await fetch(`http://localhost:8080/services?projectId=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (response.status === 404) {
                    return
                }

                if (response.status !== 200){
                    toast.error('Erro ao pegar os serviços!')
                    return
                }

                const json = await response.json()
                setServices(json)
            }

            catch (error) {
                toast.error('Erro ao pegar os serviços!')
                console.log(error)
            }
        }

        main()
    }, [id])

    async function updateProject () {
        try{
            const projectDatas: projectType = {
                projectName: projectName,
                projectMoney: projectBudget,
                projectCategory: projectCateg,
            }

            const validateData = schema.validate(projectDatas)

            if(validateData.error){
                toast.error(validateData.error.details[0].message)
                return
            }

            const response = await fetch(`http://localhost:8080/projects/${projectId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(projectDatas)
            })

            if(response.status > 199 && response.status < 300){
                toast.success('Projecto actualizado com sucesso.')
                const json = await response.json()
                setProject(json)
            }
            else{
                toast.error('Erro ao actualizar projecto.')
                return
            }
        }

        catch {
            toast.error('Erro ao conectar com o servidor.')
        }
    }

    return (
        <div className="flex">
            <NavPages />
            <Page title="Projecto">
                {
                    project?.projectName ? (
                        <section className="flex justify-between mt-[2rem] items-center gap-[2rem] border-b pb-[2rem] flex-wrap">
                            <section className=" px-[2.5rem] py-[1rem] rounded shadow bg-amber-500">
                                <h1 className="text-white">
                                    {project.projectName}
                                </h1>
                            </section>

                            <button className="btn-blue" onClick={()=> setShowProjectDetails(!showProjectDetails)}>
                                {showProjectDetails ?  "Editar" : "Mostrar detalhes"}
                            </button>

                            <section className="w-full">
                                {
                                    showProjectDetails ? 
                                    <div className="w-full h-full flex flex-col gap-[1rem]">
                                        <p>Categoria: {project.projectCategory}</p>
                                        <p>Total de Orçamento: {project.projectMoney} Kz</p>
                                        <p>Orçamento disponível: {projectBudgetAux} Kz</p>
                                        <p>Total Utilizado: {totalUsed} Kz</p>
                                    </div> 
                                    :
                                    <div className="w-full h-full">
                                        <ProjectForm 
                                            textBtn="Actualizar projecto" 
                                            onClickFunction={updateProject} 
                                            projectBudget={projectBudget} 
                                            projectCateg={projectCateg} 
                                            projectId={projectId} 
                                            projectName={projectName} 
                                            setProjectBuget={setProjectBudget} 
                                            setProjectCateg={setProjectCateg} 
                                            setProjectId={setProjectId} 
                                            setProjectName={setProjectName}
                                        />
                                    </div> 
                                }
                            </section>
                        </section>
                    ): (
                        <div>
                            <Loader />
                        </div>
                    )
                }

                <section className="flex border-b pb-[3rem] mt-[5rem] items-center justify-between flex-wrap gap-[2rem]">
                    <h2 className="text-amber-500">Adicionar Serviço:</h2>
                    <button onClick={()=> setShowServiceForm(!showServiceForm)} className="btn-blue">
                        {showServiceForm ? 'Fechar Formulário' : 'Exibir Formulário'}
                    </button>
                    {
                        showServiceForm && 
                        <ServiceForm onSubmitFunction={postService} states={states} textButton="Adicionar Serviço"/>
                    }
                </section>

                <section className="flex flex-col gap-[2rem] mt-[5rem]">
                    <h2 className="text-amber-500">Serviços:</h2>
                    <section className="projects flex relative gap-5 p-2.5 flex-wrap justify-center w-full ">
                        {
                            services && services.length > 0 ? (
                                services.map((service)=> (
                                    <ServiceCard 
                                        serviceDescription={service.description} 
                                        serviceId={service.id} 
                                        serviceMoney={service.toBeSpent} 
                                        serviceName={service.name} 
                                        key={service.id + "_serviceCardKey"} 
                                    />
                                ))
                            ) : <p>Sem serviços.</p>
                        }   
                    </section>
                </section>
            </Page>
        </div>
    )
}
