import { useNavigate } from "react-router-dom";

interface SuccessCardProps {
  email: string;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ email }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mx-auto flex flex-col max-w-md outline rounded-xl gap-3 p-3">
        We've sent a confirmation email to {email}. Please open the email and
        click the verification link to activate your account. Once your email is
        confirmed, you can sign in.
        <button className="cursor-pointer" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    </>
  );
};
export default SuccessCard;
