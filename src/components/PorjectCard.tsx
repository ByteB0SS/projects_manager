import Image from "next/image"
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import Link from "next/link";

interface ProjectCardProps {
    projectId: string
    projectName: string
    proectMoney: number
    projectCategory: string
    delay?: number
}

export default function ProjectCard (props: ProjectCardProps) {
    const delay = props.delay ? props.delay : 0

    async function removeProject () {
        try {
            const response = await fetch('http://localhost:8080/projects/' + props.projectId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            if(response.status !== 200) {
                toast.error('Erro ao remover projecto!')
                return
            }
            else {
                toast.success('Projecto removido com sucesso!')
                document.getElementById(`project-${props.projectId}`)?.classList.add('disappear')
            }
            
        }

        catch { 
            toast.error('Erro ao remover projecto!')
        }
    }

    return (
        <section data-aos-delay={delay} id={`project-${props.projectId}`} className="project_card h-auto max-w-[250px] min-w-[250px] max-h-[20rem]  justify-around p-2 flex flex-col gap-1 border rounded-2xl shadow-blue-200 shadow-2xl bg-blue-50 flex-wrap w-1/5 hover:scale-105 hover:transition hover:shadow ">
            <div className="project_name px-1 py-2 mb-1.5 bg-amber-500 rounded-2xl text-center font-bold wrap-break-word text-white"><p>{props.projectName}</p></div>
            <p className="project_money pl-2">Orçamento: {props.proectMoney}KZ</p>
            <p className="project_category pl-2">{props.projectCategory}</p>
            <div className="project_card_actions">
                <button className="btn trash" onClick={removeProject}><Image alt="Delete ICon for button" src={'/assets/trash.svg'} width={21} height={21}></Image></button>
                <Link href={`/UserPages/Project/${props.projectId}`} className="btn edit"><Image alt="Edit Icon For Button" src={'/assets/edit.png'} width={20} height={20}></Image></Link>
            </div>
        </section>
    )
}