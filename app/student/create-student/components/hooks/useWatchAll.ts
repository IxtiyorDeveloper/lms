import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";

interface IProps {
  watch: UseFormWatch<{ root: any }>;
  clearErrors: (name: any) => void;
  setLevelIdWatch: any;
  setValue: any;
  selects: any;
  setError: any;
}

export const useWatchAll = ({
  watch,
  clearErrors,
  setLevelIdWatch,
  setValue,
  selects,
}: IProps) =>
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        clearErrors(name);
      }
      if (name === "root.level_id") {
        setLevelIdWatch(value?.root?.level_id);
        if (type === "change") {
          setValue("root.sub_level_id", undefined);
        }
      }
      if (name === "root.dob" && !!selects?.ageDiff) {
        clearErrors("root.dob");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
