# 💍 MyWedding — Confirmação de Presença

Este projeto é uma aplicação web desenvolvida em **Next.js** para gerenciar a confirmação de presença dos convidados de um casamento. A proposta é permitir que os convidados busquem seus nomes na lista e confirmem a presença de forma simples, rápida e intuitiva.

---

## 📸 Demonstração  
![Logo MyWedding](public/assets/exemploApp.png.png)

---

## 📚 Tecnologias e Ferramentas

- **Next.js** — Framework React para aplicações modernas com renderização híbrida.
- **React Hook Form** — Gerenciamento de formulários e validações.
- **React Hook Form Field Array** — Controle de campos dinâmicos no formulário.
- **React Toastify** — Sistema de notificações amigável e personalizável.
- **MockAPI** — API REST fake e gratuita utilizada como backend e banco de dados da aplicação.
- **Geist UI Icons** — Ícones modernos e leves.
- **Tailwind CSS** — Framework CSS para estilização responsiva e rápida.
- **Vercel (opcional)** — Hospedagem da aplicação frontend.

---

## 📝 Funcionalidades

- Busca de nomes dos convidados com sugestões automáticas.
- Confirmação de presença de um ou mais convidados.
- Validação:
  - Verifica se o nome existe na lista de convidados.
  - Bloqueia confirmação duplicada.
- Adição e remoção dinâmica de campos de nomes.
- Notificações de sucesso e erro em tempo real.

---

## 🌐 API e Banco de Dados

Como API e banco de dados, utilizamos a [**MockAPI**](https://mockapi.io/), que permite:

- Criar e gerenciar endpoints RESTful.
- Armazenar e consultar dados como se fosse uma API real.
- Simular interações completas com o banco de dados sem a necessidade de um backend próprio.

### 📁 Estrutura da MockAPI:
- **Endpoint**  
  `https://67fffe04b72e9cfaf72687d9.mockapi.io/api/`

- **Modelo de dados**
  ```json
  {
    "nome": "Evandro",
    "confirmado": true
  }

# Como rodar o projeto
## Clone o repositório
git clone https://github.com/EvandroS1/mywedding.git

## Acesse a pasta
cd mywedding

## Instale as dependências
npm install

## Rode o projeto
npm run dev


# 📌 Autor
*Feito por Evandro, Henrique, Thiago*