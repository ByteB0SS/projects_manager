import Page from "@/components/Page";
import NavPages from "@/components/NavPages";
import CprojectLink from "@/components/CprojectLink";
import ProjectCard from "@/components/PorjectCard";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

interface projectInterface {
  id: string
  projectName: string
  projectMoney: number
  projectCategory: string
}


export default function Project() {
  const [projects, setProjects] = useState<projectInterface[]>([])
  const [projectsLoading, setPorjectLoading] = useState<boolean>(true)
  useEffect(()=> {
    try{
      async function main () {
        const response = await fetch('http://localhost:8080/projects')
        const json = await response.json()
        console.log(json)
        
        setTimeout(()=> {
          setPorjectLoading(false)
        }, 1000)

        if(!(response.status === 200)){
          toast.error('Um erro ao pegar as informações dos projectos.')
        }
        else {
          setProjects(json)
        }
      }

      main()
    }
    catch{
      toast.error('Parece que houve um erro ao se conectar com o servidor')
    }
  }, [])

  return (
    <div className="flex">
        <NavPages></NavPages>
        <Page addiTionalClassName="" title="Projectos">
            <div className="h-full flex flex-col gap-10 items-center ">
                <section data-aos='zoom-in-right' className="header2 flex flex-col  justify-between gap-10 items-center">
                  <h2 className="text-5xl font-bold text-blue-500">Projectos cadastrados são<span className="text-amber-500 text-6xl"> Exibidos aqui...</span></h2>
                  <CprojectLink/>
                </section>

                <section className="projects flex relative gap-5 p-2.5 flex-wrap justify-center w-full ">
                  {
                    projects.length > 0 ? (
                      projects.map((project) => {
                        return (
                          <ProjectCard  proectMoney={project.projectMoney} projectCategory={project.projectCategory} projectId={project.id} projectName={project.projectName} key={project.id}></ProjectCard>
                        )
                      })
                    ): <p>Sem projectos</p>
                  }
                  {
                    projectsLoading && <Loader/>
                  }
                </section>
            </div>
        </Page>
    </div>
    
  );
}