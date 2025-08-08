import  React  from "react"

interface pageProps {
    children: React.ReactNode,
    addiTionalClassName?: string,
    title: string,
}

export default function Page( props: pageProps ){
    return (
        <main className={`p-2.5 w-[80%] screen flex flex-col ${props.addiTionalClassName}`}>
            <header className="h-[7%] ">
                <h1 className="title pl-3 border-l-4 border-amber-500" data-aos="fade-left">{props.title}</h1>
            </header>
            <section className="h-[93%] main-page">
                {props.children}
            </section>
        </main>
    )
}

