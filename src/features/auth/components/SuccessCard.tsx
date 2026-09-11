interface SuccessCardProps {
  email: string;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ email }) => {
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-10 text-center shadow flex flex-col gap-2">
      <div className="text-2xl mb-5 font-bold">ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧</div>
      <h1 className="text-2xl mb-2.5 font-bold">You’re almost in!</h1>
      <p className="text-neutral-600 text-base leading-normal mb-7">
        We just sent a confirmation email to <b>{email}.</b> Tap the link inside
        so we know it’s really you, and we’ll get you started right away.
      </p>

      <p className="text-neutral-600 text-base leading-normal mb-7">
        Didn’t receive the email? Check your spam folder!
      </p>
    </div>
  );
};
export default SuccessCard;
