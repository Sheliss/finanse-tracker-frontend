type OwnProps = {
  title: string;
  subtitle?: string;
  value: string | number;
  big?: boolean;
};

const StatCard: React.FC<OwnProps> = ({ title, subtitle, value, big }) => {
  return (
    <div className={`h-full flex flex-col  justify-center`}>
      <div
        className={`text-neutral-600  ${big ? "text-base" : "text-sm"} mb-1 dark:text-neutral-200`}
      >
        {title}
      </div>
      {subtitle && (
        <div
          className={`text-neutral-600 ${big ? "text-base" : "text-sm"} mb-1 dark:text-neutral-200`}
        >
          {subtitle}
        </div>
      )}
      <div
        className={`${big ? "text-5xl" : "text-2xl"} font-bold dark:text-white`}
      >
        {value}
      </div>
    </div>
  );
};
export default StatCard;
