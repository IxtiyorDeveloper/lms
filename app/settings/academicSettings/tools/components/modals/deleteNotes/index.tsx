import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ActionModal, DeleteSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useToolsDeleteGroupNotes } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";

const DeleteNotes = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (router.query.deleteNote === "true") {
      setOpen(true);
    }
  }, [router.query?.deleteNote]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      const query = router.query;
      delete query.deleteNote;
      delete query.notes;
      router.replace({
        pathname: router.pathname,
        query: query,
      });
    }, 100);
  };

  const save = useToolsDeleteGroupNotes({
    onSuccess: () => {
      handleClose();
      toast.success("Notes deleted");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onDeleteSubmit = () => {
    save.mutate({});
  };

  return (
    <ActionModal
      control={control}
      handleSubmit={handleSubmit}
      handleClose={() => handleClose()}
      open={open}
      width={448}
      onSubmit={onDeleteSubmit}
      blurColor={bgColors.pop}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<DeleteSvg width={50} height={50} />}
      text={
        <div>
          <p>Are you sure?</p>
          <p>This property will be deleted for everyone</p>
        </div>
      }
      errors={errors}
      vertical={true}
    />
  );
};

export default DeleteNotes;
