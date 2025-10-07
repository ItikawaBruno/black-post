import { Toaster } from "react-hot-toast";


export default function CreateToast() {
    return (
        <div>
<Toaster
  position="bottom-right"
  reverseOrder={false}
  toastOptions={{
    // Estilo base
    style: {
      background: "#000",       // Preto puro
      color: "#fff",            // Texto branco
      border: "1px solid #222", // Borda leve
      borderRadius: "10px",
      padding: "12px 16px",
      fontWeight: 500,
      boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
    },
    // Toast de sucesso
    success: {
      style: {
        background: "#000",
        color: "#fff",
        border: "1px solid #333",
      },
      iconTheme: {
        primary: "#000",  // Ícone preto discreto
        secondary: "#fff" // Fundo branco do ícone
      },
    },
    // Toast de erro
    error: {
      style: {
        background: "#000",
        color: "#fff",
        border: "1px solid #ff0000", // Borda vermelha para destaque
      },
      iconTheme: {
        primary: "#000",
        secondary: "#fff"
      },
    },
  }}
/>

        </div>
    )
}