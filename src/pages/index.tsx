import Page from "@/components/Page";
import NavPages from "@/components/NavPages";
import CprojectLink from "@/components/CprojectLink";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="flex">
        <NavPages></NavPages>
        <Page addTionalClassName="" title="Home">
            <div className="flex flex-col justify-center items-center gap-10 h-full">
                <div className="flex flex-col justify-center items-center gap-2.5" data-aos="fade-right">
                  <h2 className="text-blue-500 text-5xl font-bold ">Bem-Vindo ao Projects <span className="text-6xl text-amber-500">Mananger</span></h2>
                  <p>Planeje, organize e crie já projectos de maneira eficaz com a nossa app!</p>
                  <p className="pb-5">Ferramenta criada com ❤️‍🩹 por @Rubem-Ernesto-Figueiredo</p>
                  <CprojectLink/>
                </div>

                <div data-aos="flip-left">
                  <Image src={"/assets/welcome.svg"} alt="welcome image" width={500} height={500}></Image>
                </div>
            </div>
        </Page>
    </div>
    
  );
}