"use client";
import Head from 'next/head';
import "../../app/globals.css";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from "react-toastify";
import IUsers from '../../../types/user';
import getUsers from '@/functions/getUsers';

interface IFormData {
  email: string;

}


const ExcluirDadosUsuario = () => {
  const [profile, setProfile] = useState<IUsers[]>([])

  const {
      register,
      handleSubmit,
      setValue,
      formState: { },
    } = useForm<IFormData>({
    });
  
    useEffect(() => {
          async function loadUsers() {
            const data: IUsers[] = await getUsers();
            setProfile(data);
          }
      
          loadUsers()
        }, []);
    
  const onSubmit = async (data: IFormData) => {
    const userExists = profile.find((user) => user.email === data.email);
    if(userExists === undefined) {
      toast.error(`${data.email} não foi encontrado na base de dados.`, {
        theme: "dark",
      });
      setValue('email', '')

      return
    }

    const userId = userExists?.id;

    try {
      // Simulação de envio para o seu backend
      const response = await fetch(`https://67fffe04b72e9cfaf72687d9.mockapi.io/api/convidados/shopProfile/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success(`Dados de ${data.email} excluidos com sucesso.`, {
          theme: "dark",
        }); // Limpa o campo de e-mail após o sucesso
        setValue('email', '')
      } else {
        toast.error(`Holve um erro ao excluir os dados de ${data.email}.`, {
          theme: "dark",
        });
        setValue('email', '')

      }
    } catch (errors) {
      console.error("Erro ao excluir dados:", errors);
      toast.error(`Holve um erro ao excluir os dados de ${data.email}.`, {
        theme: "dark",
      });
      setValue('email', '')

    }
    }
  ;

  return (
    <>
      <Head>
        <title>Exclusão de Dados do Usuário - My Wedding</title>
      </Head>
      <main style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <article style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#333', marginBottom: '20px', textAlign: 'center' }}>Exclusão de Dados do Usuário</h1>

          <p style={{ fontSize: '1em', color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>
            Se você deseja solicitar a exclusão dos dados que coletamos sobre você (incluindo seu ID, nome, foto de perfil e e-mail) através do seu login com o Facebook ou outras interações com a nossa plataforma, por favor, preencha o formulário abaixo.
          </p>

          <section style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
            <h2 style={{ fontSize: '1.5em', color: '#333', marginBottom: '10px' }}>Solicitar Exclusão de Dados</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Seu e-mail de cadastro:</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  id="email"
                  name="email"
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
              </div>
              <button
                type="submit"
                style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '1em' }}
              >
                Enviar Solicitação de Exclusão
              </button>
            </form>

          </section>

          <section>
            <h2 style={{ fontSize: '1.5em', color: '#333', marginBottom: '10px' }}>Processo de Exclusão</h2>
            <p style={{ fontSize: '1em', color: '#555', lineHeight: '1.6', marginBottom: '10px' }}>
              Ao recebermos sua solicitação, tomaremos as seguintes medidas:
            </p>
            <ol style={{ listStyleType: 'decimal', paddingLeft: '20px', color: '#555', lineHeight: '1.6', marginBottom: '15px' }}>
              <li><strong>Verificação de Identidade:</strong> Para proteger sua privacidade, poderemos solicitar informações adicionais para verificar sua identidade antes de processar sua solicitação.</li>
              <li><strong>Confirmação:</strong> Após verificarmos sua identidade, confirmaremos o recebimento da sua solicitação e informaremos o prazo em que seus dados serão excluídos.</li>
              <li><strong>Exclusão dos Dados:</strong> Se sua solicitação for válida, excluiremos permanentemente seus dados pessoais (ID, nome, foto de perfil e e-mail) dos nossos sistemas dentro de um prazo de 7 dias úteis.</li>
            </ol>
            <p style={{ fontSize: '1em', color: '#555', lineHeight: '1.6', marginBottom: '10px' }}>
              Após a exclusão dos seus dados, algumas informações agregadas e anonimizadas poderão ser retidas para fins estatísticos e de melhoria do serviço, sem que seja possível identificar você individualmente.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5em', color: '#333', marginBottom: '10px' }}>Contato</h2>
            <p style={{ fontSize: '1em', color: '#555', lineHeight: '1.6' }}>
              Se você tiver alguma dúvida sobre o processo de exclusão de dados, por favor, entre em contato conosco:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', lineHeight: '1.6' }}>
              <li>Por e-mail: <a href="mailto:evandrogomes542@gmail.com" style={{ color: '#007bff', textDecoration: 'underline' }}>evandrogomes542@gmail.com</a></li>
              <li>Por telefone: +55 (11) 98209-815</li>
            </ul>
          </section>
        </article>
      </main>
      <ToastContainer />
    </>
  );
};

export default ExcluirDadosUsuario;