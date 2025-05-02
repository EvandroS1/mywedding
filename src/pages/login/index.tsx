import "../../app/globals.css";

export default function Login () {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fcf1ed]">
      <div className="absolute top-3 p-4">
        <img src="assets/m&e.png" alt="melissa e evandro" />
        </div>
      <div className="flex flex-col items-center justify-center w-full max-w-xs p-4 mt-4 bg-white rounded-lg shadow-md">
      <h1 className="pt-2 py-4 text-2xl">Lista de presentes</h1>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 mb-4 border shadow-lg border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-12 border shadow-lg border-gray-300 rounded-lg"
        />
        <button className="w-full p-2 mb-2 shadow-lg text-white bg-amber-700 rounded-lg">
          Entrar
        </button>
        <button className="w-full p-2 mb-10 shadow-lg text-white bg-amber-700 rounded-lg">
          Criar conta
        </button>
        <button className="flex justify-center mb-2 items-center p-4 gap-7 h-8 w-full shadow-lg border-gray rounded-lg border"> <img width={20} src="/assets/google.png" alt="" /><p>Continue com Google</p></button>
        <button className="flex justify-center mb-2 items-center p-4 bg-blue-400 gap-4 h-8 w-full shadow-lg border-gray rounded-lg border"> <img width={20} src="https://static.xx.fbcdn.net/rsrc.php/v4/y3/r/U7MAWJlE6hZ.png" alt="" /><p>Continue com Facebook</p></button>
      </div>
    </div>
  );
}