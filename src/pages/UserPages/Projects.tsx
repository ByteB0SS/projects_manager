import Page from "@/components/Page";
import NavPages from "@/components/NavPages";
import CprojectLink from "@/components/CprojectLink";
import ProjectCard from "@/components/PorjectCard";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface projectInterface {
  id: string
  projectName: string
  projectMoney: number
  projectCategory: string
}


export default function Contact() {
  const [projects, setProjects] = useState<projectInterface[]>([])

  useEffect(()=> {
    try{
      async function main () {
        const response = await fetch('http://localhost:8080/projects')
        const json = await response.json()
        console.log(json)
        
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

                <section className="projects flex gap-5 p-2.5 flex-wrap justify-center  max-h-full overflow-y-auto">
                  {
                    projects.length > 0 ? (
                      projects.map((project) => {
                        return (
                          <ProjectCard proectMoney={project.projectMoney} projectCategory={project.projectCategory} projectId={project.id} projectName={project.projectName} key={project.id}></ProjectCard>
                        )
                      })
                    ): 'Sem projectos crie um.'
                  }
                </section>
            </div>
        </Page>
    </div>
    
  );
}