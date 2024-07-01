interface IProps {
  ok?: boolean;
  status_code?: number;
  description?: string;
  result?: any;
  error?: any;
}

export const responseMaker = ({
  description = "",
  status_code = 200,
  error,
  result,
  ok = true,
}: IProps) => {
  return {
    ok,
    status_code,
    description,
    result,
    error,
  };
};
