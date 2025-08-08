import Image from "next/image"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

interface ProjectCardProps {
    projectId: string
    projectName: string
    proectMoney: number
    projectCategory: string
    delay?: number
}

export default function ProjectCard (props: ProjectCardProps) {
    const delay = props.delay ? props.delay : 0

    useEffect(() => {
    AOS.init({
        duration: 1000,
        once: true,
    });
    }, []);

    return (
        <section data-aos-delay={delay} className="project_card h-auto min-w-[250px] justify-around p-2 flex flex-col gap-1 border rounded-2xl shadow-blue-200 shadow-2xl bg-blue-50 flex-wrap w-1/5 hover:scale-105 hover:transition hover:shadow ">
            <div className="project_name px-1 py-2 mb-1.5 bg-amber-500 rounded-2xl text-center font-bold text-white">{props.projectName}</div>
            <div className="project_money">Orçamento: {props.proectMoney}KZ</div>
            <div className="project_category">{props.projectCategory}</div>
            <div className="project_card_actions">
                <button className="btn trash"><Image alt="Delete ICon for button" src={'/assets/trash.svg'} width={21} height={21}></Image></button>
                <button className="btn edit"><Image alt="Edit Icon For Button" src={'/assets/edit.png'} width={20} height={20}></Image></button>
            </div>
        </section>
    )
}