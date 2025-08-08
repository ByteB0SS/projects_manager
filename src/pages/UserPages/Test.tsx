import Page from "@/components/Page";
import toast from "react-hot-toast";
import NavPages from "@/components/NavPages";

export default function () {
    function showToast () {
        toast.success('O lucas foi corniado com sucesso!')
    }

    return (
        <div className="flex">
            <NavPages></NavPages>
            <Page title="Pagina de testes developers" >
                <div>
                    <div>
                        <button className="border w-2xs rounded p-1 bg-green-400" onClick={showToast}>
                            Sucesso
                        </button>
                        <button className="border rounded w-2xs p-1 m-3 bg-red-400" onClick={()=> {toast.error('Não é possivel fazer o rubem ser corno, ele é muito bonito pra tal por favor tente fazer isso no lucas.')}}>
                            Erro
                        </button>
                    </div>
                </div>
            </Page>
        </div>
    )
}