import Page from "@/components/Page";
import NavPages from "@/components/NavPages";

export default function Contact() {
  return (
    <div className="flex">
        <NavPages></NavPages>
        <Page addiTionalClassName="" title="Contacto">
            <div>
                <p>Conteudo principal do contact</p>
            </div>
        </Page>
    </div>
    
  );
}