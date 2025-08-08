import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

interface PageLinkProps {
    iconHref: string,
    pageHref: string,
    pageName: string
}



function PageLink(props: PageLinkProps) {
    const router = useRouter()
    
    return (
        <li>
            <Link href={props.pageHref} className={`flex page-link gap-2  p-1.5 ${(router.pathname === props.pageHref ? " selected" : "")}`}>
                <Image  src={props.iconHref} alt="link page icon" width={24} height={24}></Image>
                <p>{props.pageName}</p>
            </Link>
        </li>
    )
}   

export default function NavPages () {
    return(
        <aside className="main-aside h-screen p-2.5 w-[20%] border-r gap-12 flex flex-col static justify left-0 border-r-zinc-400">

            <section className="logo flex flex-col justify-center items-center gap-2.5 text-2xl font-bold">
                <Image src={'/assets/logo2.png'} alt="Logo da da web site" width={200} height={200}></Image>
                <h1 className="text-center text-blue-500">Project <span className="text-3xl text-amber-500">Manager</span></h1>
            </section>

            <nav>
                <ul className="flex flex-col gap-3">
                    <PageLink iconHref="/assets/home.svg" pageHref="/" pageName="Home"/>
                    <PageLink iconHref="/assets/create_project.svg" pageHref="/UserPages/Projects" pageName="Projectos"/>
                    <PageLink iconHref="/assets/enterprise.svg" pageHref="/UserPages/Enterprise" pageName="Empresa"/>
                    <PageLink iconHref="/assets/contact.svg" pageHref="/UserPages/Contact" pageName="Contactar"/>
                    <PageLink iconHref="/assets/contact.svg" pageHref="/UserPages/Test" pageName="Testes de dev"/>
                </ul>
            </nav>

            <section className="nav-others flex flex-col gap-2 mt-7 ml-2.5">
                <p>Outros:</p>
                <div>
                    <a href="https://storyset.com/education" target="_blank" className="underline hover:text-blue-900 text-blue-600">Education illustrations by Storyset</a>
                </div>
            </section>
            
        </aside>
    )
}