import { useFormContext } from "react-hook-form";

export const Review = () => {
  const { watch } = useFormContext();
  const { token, amount, duration } = watch();

  return (
    <div className="space-y-2">
      <p>
        <strong>Token:</strong> {token}
      </p>
      <p>
        <strong>Amount:</strong> {amount}
      </p>
      <p>
        <strong>Duration:</strong> {duration} days
      </p>
      <p className="text-sm text-gray-600">
        Ready to lock this up? Hit that Lock button and let's gooo 🚀
      </p>
    </div>
  );
};
