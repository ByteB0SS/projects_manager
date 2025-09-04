import Image from "next/image";

export default function Loader () {
    return(
        <div className="flex w-full h-full justify-center items-center absolute bg-white">
            <Image alt="Loader svg" src={'/assets/loader.svg'} width={80} height={80}></Image>
        </div>
    )
}