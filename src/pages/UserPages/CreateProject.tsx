import Page from "@/components/Page";
import NavPages from "@/components/NavPages";
import CreateProjectForm from "@/components/CreateProjectForm";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="flex">
        <NavPages></NavPages>
        <Page title="Criar projecto">
            <div className="flex flex-col justify-center items-center h-[100%] gap-14">
                <div className="flex flex-col justify-center items-center" data-aos="fade-right">
                  <h1 className="text-5xl text-blue-500 font-bold">Quer começar  gerenciar seu <span className="text-6xl text-amber-500">projecto?</span></h1>
                  <p className="text-2xl font-bold">Então cadastre-o!</p>
                </div>

                <div className="flex justify-around items-center  w-[70%]">
                  <div data-aos="fade-right">
                    <CreateProjectForm/>
                  </div>

                  <div data-aos="flip-right">
                    <Image src={"/assets/create-project-img.svg"} alt="Create-project-img" width={500} height={500}></Image>
                  </div>
                </div>
            </div>
        </Page>
    </div>
    
  );
}