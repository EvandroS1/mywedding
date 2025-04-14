import Container from "@/components/container";
import "../../app/globals.css";

const Local = () => {
  return (
    <Container picture="/assets/place.png">
        <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Rancho Papaloosa</h1>
      <p>R. Nassau, 40 - Água Azul, Guarulhos - SP, 07179-530</p>
      <div style={{ width: "100%", borderRadius: "10px", overflow: "hidden" }}>
        <iframe
          title="Google Maps Rancho Papaloosa"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: "10px" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1464.2971054696367!2d-46.3988328!3d-23.3618793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce88d780ac0001%3A0x67a99de16510c88b!2sR.%20Nassau%2C%2040%20-%20%C3%81gua%20Azul%2C%20Guarulhos%20-%20SP%2C%2007179-530!5e0!3m2!1spt-BR!2sbr!4v1710000000000"
        />
      </div>
    </div>
    </Container>
  )
}

export default Local;