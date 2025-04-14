import Container from "@/components/container";
import "../../app/globals.css";

const Dia = () => {
  return (
    <Container picture="/assets/evandro melissa.jpg">
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
  <h1 className="text-2xl font-semibold mb-4">Data: 07/09/2025</h1>
  <ul className="space-y-3 text-lg text-gray-700">
    <li>O evento começa às <strong>16:30</strong></li>
    <li>Entrada permitida até as <strong>17:00</strong></li>
    <li>Encerramento às <strong>22:00</strong></li>
    <li>Não será permitido a entrada de terceiro, apenas constantes no convite.</li>
    <li>Por favor, cuidem com carinho: danos ao espaço ou à decoração poderão ser cobrados.</li>
  </ul>
</div>

    </Container>
  );
};

export default Dia;
