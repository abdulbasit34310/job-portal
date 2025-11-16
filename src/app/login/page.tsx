import LoginForm from "@/features/auth/components/login-form";
import { getCurrentUser } from "@/features/auth/server/auth.actions";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === "applicant") return redirect("/dashboard");
    if (user.role === "employer") return redirect("/employer-dashboard");
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;