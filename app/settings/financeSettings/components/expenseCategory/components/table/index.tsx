import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  TableWrapper,
  ExpenseCategoryTableHeader,
  ActionContainer,
  ActionContainerItem,
  ItemColor,
} from "./style";
import {
  ActionModal,
  Button,
  Cell,
  DeleteSvg,
  DraggableTable,
  EditSvg,
  PlusSvg,
} from "components";
import {
  useDeleteExpenseCategories,
  useExpenseCategoryList,
  useReorderExpenseCategories,
  useSaveExpenseCategories,
  useUpdateExpenseCategories,
} from "hooks";
import { useRouter } from "next/router";
import { bgColors } from "styles/theme";
import ExpenseCategoryModal from "../modals/expenseCategoryModal";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Columns from "./columns";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

interface ITableData {
  id: any;
  name: string;
  color: string;
  category: any;
  open: boolean;
}

const TableSite: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [modals, setModals] = useState<{
    [key: string]: { isOpen: boolean; data: any };
  }>({});

  const rowsChild = useMemo(() => {
    return [
      {
        accessor: "name",
        Footer: "name",
        Header: <></>,
        Cell: (props: any) => (
          <Cell
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ItemColor color={props.row.original?.color || bgColors.primary} />
            {props.value}
          </Cell>
        ),
      },
      {
        accessor: "open",
        Footer: "id",
        Header: <></>,
        Cell: (props: any) => {
          return (
            <ActionContainer>
              <ActionContainerItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen({ ...props.row.original, type: "update" });
                }}
              >
                <EditSvg width={15} height={15} />
              </ActionContainerItem>
              <ActionContainerItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDeleteModal(props.row.original);
                }}
              >
                <DeleteSvg width={15} height={15} />
              </ActionContainerItem>
            </ActionContainer>
          );
        },
      },
    ];
  }, [tableData]);

  const onClickCollapse = (index: number) => {
    const a = tableData.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          open: !e.open,
        };
      } else {
        return {
          ...e,
          open: false,
        };
      }
    });
    setTableData(a);
  };
  const { data: listExpense, isLoading } = useExpenseCategoryList({
    page: 1,
    pageSize: 100,
    expand: "children",
  });

  const onChangeChildRowOrder = (parent: any, data: any) => {
    setTableData(
      tableData.map((e) => {
        if (e.id === parent.id) {
          return {
            ...e,
            category: (
              <div className="abc">
                <DraggableTable
                  columns={rowsChild}
                  data={data.map((e: ITableData) => {
                    return {
                      id: e.id,
                      name: e.name,
                      color: e.color,
                    };
                  })}
                  setData={(data: any) => onChangeChildRowOrder(e, data)}
                  bottomBorderColor={bgColors.white}
                  // rowColors={}
                />
              </div>
            ),
          };
        } else {
          return e;
        }
      })
    );
    reorder(
      data.map((e: any) => e.id),
      true
    );
  };

  useEffect(() => {
    if (!!listExpense) {
      setTableData(
        listExpense.list.map((e) => {
          return {
            open: false,
            name: e.name,
            color: e.color,
            id: e.id,
            category: (
              <div className="abc">
                <DraggableTable
                  columns={rowsChild}
                  data={e.children.map((e) => {
                    return {
                      id: e.id,
                      name: e.name,
                      color: e.color,
                    };
                  })}
                  setData={(data: any) => onChangeChildRowOrder(e, data)}
                  bottomBorderColor={bgColors.white}
                  // rowColors={}
                />
              </div>
            ),
          };
        })
      );
    }
  }, [listExpense]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm();

  const handleClose = () => {
    reset();
    setModals({
      ...modals,
      addTab: {
        isOpen: false,
        data: null,
      },
    });
  };

  const handleOpen = (data?: any) => {
    setModals({
      ...modals,
      addTab: {
        isOpen: true,
        data: data,
      },
    });
  };

  const reorderMutate = useReorderExpenseCategories({
    onSuccess: () => {
      toast.success("Reordered");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin_finance_expense_category_index],
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin_finance_expense_category_index],
      });
    },
  });
  const saveMutate = useSaveExpenseCategories({
    onSuccess: () => {
      toast.success("Saved");
      queryClient.invalidateQueries([
        queryKeys.admin_finance_expense_category_index,
      ]);
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err, setError, showToast: false });
    },
  });
  const updateMutate = useUpdateExpenseCategories({
    onSuccess: () => {
      toast.success("Updated");
      queryClient.invalidateQueries([
        queryKeys.admin_finance_expense_category_index,
      ]);
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err, setError, showToast: false });
    },
  });

  const handleChangeOrder = (e: any[]) => {
    setTableData(e);
    reorder(
      e.map((e) => {
        return e.id;
      })
    );
  };

  const reorder = useCallback(
    debounce((ids: number[], is_child?: boolean) => {
      reorderMutate.mutate({ ids, is_child });
    }, 300),
    []
  );

  const onSubmit = (data: any) => {
    if (modals.addTab.data.type === "update") {
      updateMutate.mutate({
        ...data,
        key: 700,
        parent_id: modals.addTab?.data?.parent_id,
        id: modals.addTab?.data?.id,
      });
    } else {
      saveMutate.mutate({
        ...data,
        key: 700,
        parent_id: modals.addTab?.data?.id,
      });
    }
  };

  const deleteStudent = useDeleteExpenseCategories({
    onSuccess: () => {
      reset();
      toast.info("Deleted");
      queryClient.invalidateQueries([
        queryKeys.admin_finance_expense_category_index,
      ]);
      handleCloseDeleteModal();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const {
    control: deleteControl,
    handleSubmit: deleteHandleSubmit,
    formState: { errors: deleteErrors },
    reset: deleteReset,
  } = useForm();
  const handleCloseDeleteModal = (data?: any) => {
    deleteReset();
    setModals({
      ...modals,
      deleteModal: {
        isOpen: false,
        data: data,
      },
    });
  };

  const handleOpenDeleteModal = (data?: any) => {
    setModals({
      ...modals,
      deleteModal: {
        isOpen: true,
        data: data,
      },
    });
  };
  const onDeleteSubmit = (formData: { comment: string }) => {
    deleteStudent.mutate({ id: modals.deleteModal?.data?.id });
  };

  return (
    <TableWrapper>
      <ExpenseCategoryTableHeader>
        <Button style={{ padding: "12px 12px" }} onClick={handleOpen}>
          <PlusSvg height={20} width={20} />
          Category
        </Button>
      </ExpenseCategoryTableHeader>
      <DraggableTable
        columns={Columns({ handleOpen, handleOpenDeleteModal, tableData })}
        data={tableData}
        setData={handleChangeOrder}
        isCollapsable={true}
        isOpenKeyName="open"
        onClickCollapse={onClickCollapse}
        collapseContainerKeyName="category"
        isLoading={isLoading}
        paddingRow={0}
      />
      <ExpenseCategoryModal
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        control={control}
        onSubmit={onSubmit}
        open={modals.addTab?.isOpen}
        data={modals.addTab?.data}
        errors={errors}
        type={modals.addTab?.data?.type}
        setValue={setValue}
        isLoading={saveMutate.isLoading}
      />
      <ActionModal
        control={deleteControl}
        handleSubmit={deleteHandleSubmit}
        handleClose={() => handleCloseDeleteModal()}
        open={modals.deleteModal?.isOpen}
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
        errors={deleteErrors}
      />
    </TableWrapper>
  );
};

export default TableSite;
