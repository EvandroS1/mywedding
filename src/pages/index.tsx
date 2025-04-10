import "./globals.css";
import Bar from "@/components/bar";
import Container from "@/components/container";

export default function Home() {
  return (
    <Container picture="/assets/evandro melissa.jpg">
        {Bar("O nosso dia","/dia")}
        {Bar("O nosso lugar","/local")}
        {Bar("Nossa lista de presentes","/presentes")}
        {Bar("Confirme sua presença","/presenca")}
    </Container>
  );
}
