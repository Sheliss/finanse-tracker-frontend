import Button from "@/components/Button";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState<number>(5);
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token found.");
      return;
    }

    async function verifyUser() {
      try {
        const response = await fetch(
          `https://finance-api.harukanyan.space/api/auth/verify?token=${token}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Verification failed");
        }

        localStorage.setItem("token", data.token);
        useAuthStore.getState().setUser(data.user);
        setStatus("success");
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(err.message);
      }
    }

    verifyUser();
  }, [searchParams, navigate]);

  useEffect(() => {
    if (status !== "success") return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, navigate]);

  if (status === "loading") {
    return (
      <div className="m-0 p-0 bg-neutral-100 flex items-center justify-center h-screen">
        <div className="w-full max-w-md rounded-lg bg-white p-10 text-center shadow">
          <div className="text-2xl font-bold mb-6 tracking-tight">
            Finance Tracker
          </div>
          <div className="text-2xl mb-5 font-bold"> ∘ ∘ ∘ ( °ヮ° )</div>
          <h1 className="text-2xl mb-2.5 font-bold">
            Verifying your email address...
          </h1>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="m-0 p-0 bg-neutral-100 flex items-center justify-center h-screen">
        <div className="w-full max-w-md rounded-lg bg-white p-10 text-center shadow">
          <div className="text-2xl font-bold mb-6 tracking-tight">
            Finance Tracker
          </div>
          <div className="text-2xl mb-5 font-bold">(╥﹏╥)</div>
          <h1 className="text-2xl mb-2.5 font-bold">Verification Failed</h1>
          <p className="text-red-500 text-base leading-normal mb-7">
            {errorMessage}
          </p>
          <Button wFull onClick={() => navigate("/login")}>
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="m-0 p-0 bg-neutral-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-md rounded-lg bg-white p-10 text-center shadow">
        <div className="text-2xl font-bold mb-6 tracking-tight">
          Finance Tracker
        </div>
        <div className="text-2xl mb-5 font-bold">ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧</div>
        <h1 className="text-2xl mb-2.5 font-bold">Email Verified!</h1>
        <p className="text-neutral-600 text-base leading-normal mb-7">
          Your email address has been verified. We’re redirecting you
          automatically in {secondsLeft} seconds.
        </p>
        <Button wFull onClick={() => navigate("/")}>
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
