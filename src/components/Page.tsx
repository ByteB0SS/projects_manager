import  React  from "react"
import Loader from "./Loader"
import Image from "next/image"
import { useEffect, useState } from "react"

interface pageProps {
    children: React.ReactNode,
    addiTionalClassName?: string,
    title: string,
}

export default function Page( props: pageProps ){
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=> {
        setTimeout(()=> {
            setLoading(false)
        }, 500)
    }, [])

    return (
        <main className={` flex main-content-page p-2.5 w-[80%] screen relative overflow-auto  flex-col gap-[2rem] ${props.addiTionalClassName}`}>
            {
                loading ? '' :  (
                    <div className="w-full h-fullz">
                        <header className="mb-[2rem] flex border-amber-500 border-l-[0.4rem] justify-between items-center">
                            <h1 className="title pl-3  text-start " data-aos="fade-left">{props.title}</h1>
                            <div className="flex  flex-col justify-center items-center">
                                <Image className="" id="logo-link" src={'/assets/logo2.png'} alt="Logo da da web site" width={40} height={40}></Image>
                                <p className="mini-title text-blue-500 font-bold">Pro<span className="text-amber-500">Man</span></p>
                            </div>
                        </header>

                        {props.children}
                    </div>

                )
            }
            
            {
                loading && <Loader/>
            }
        </main>
    )
}

