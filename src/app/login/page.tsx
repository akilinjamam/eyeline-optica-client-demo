import LoginForm from "@/component/LoginForm";


export default function LoginPage() {
  return (
    <main className="h-[100vh] flex items-center justify-center bg-white text-black ">
      <div className="p-8 rounded-2xl shadow-lg bg-gray-100 w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <LoginForm/>
      </div>
    </main>
  );
}
