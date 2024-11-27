import Login from "../components/auth/Login";
import Parts from "../utils/Particles";

export default function LoginPage() {
  return (
    <div className="flex justify-center" data-testid="login-container">
      <Parts />
      <div data-testid="login-inner-container" className="z-50">
        <Login />
      </div>
    </div>
  );
}
