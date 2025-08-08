import Page from "@/components/Page";
import NavPages from "@/components/NavPages";

export default function Contact() {
  return (
    <div className="flex">
        <NavPages></NavPages>
        <Page addiTionalClassName="" title="Empresa">
            <div>
                <p>Conteudo principal da Empresa</p>
            </div>
        </Page>
    </div>
    
  );
}