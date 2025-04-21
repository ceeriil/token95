import { useFormContext } from "react-hook-form";

export const Recipients = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-2">
      <label>Amount</label>
      <input
        {...register("amount")}
        className="border border-black p-1 w-full"
        placeholder="e.g. 100"
      />

      <label>Lock Duration (in days)</label>
      <input
        {...register("duration")}
        className="border border-black p-1 w-full"
        placeholder="e.g. 30"
      />
    </div>
  );
};
