import React, { FC, useEffect, useRef } from "react";
import { IStore, toggleModal } from "store";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper, WrapperA } from "./style";
import { iframeTest } from "components/printD";

const PrintDebtorsModal: FC = () => {
  const dispatch = useDispatch();
  const checkRef = useRef(null);

  const {
    debtorsListModal: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "debtorsListModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const handlePrint = () => {
    iframeTest(checkRef);
    handleClose();
  };

  useEffect(() => {
    if (open) handlePrint();
  }, [data]);

  return (
    <Wrapper>
      <WrapperA id="form1" ref={checkRef}>
        <table
          style={{
            width: "100%",
            border: "1px solid gray",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                borderCollapse: "collapse",
                padding: "5px 2px",
                border: "1px solid gray",
              }}
            >
              <th
                style={{
                  padding: "5px",
                  border: "1px solid gray",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "5px 2px",
                  border: "1px solid gray",
                }}
              >
                Room
              </th>
              {/*<th*/}
              {/*  style={{*/}
              {/*    padding: "5px",*/}
              {/*    border: "1px solid gray",*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Teacher*/}
              {/*</th>*/}
              {/*<th*/}
              {/*  style={{*/}
              {/*    padding: "5px",*/}
              {/*    border: "1px solid gray",*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Time*/}
              {/*</th>*/}
            </tr>
          </thead>
          <tbody>
            {data?.groups?.list?.map((student: any) => {
              return (
                <tr
                  key={student.id}
                  style={{
                    borderCollapse: "collapse",
                    border: "1px solid gray",
                  }}
                >
                  <td
                    style={{
                      padding: "5px 2px",
                      border: "1px solid gray",
                    }}
                  >
                    {student?.user?.userProfile?.firstname}{" "}
                    {student?.user?.userProfile?.lastname}
                  </td>
                  <td
                    style={{
                      padding: "5px 2px",
                      border: "1px solid gray",
                    }}
                  >
                    {student?.group?.room?.name}
                  </td>
                  {/*<td*/}
                  {/*  style={{*/}
                  {/*    padding: "5px",*/}
                  {/*    border: "1px solid gray",*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  {student?.group?.teacher?.user?.userProfile?.firstname}{" "}*/}
                  {/*  {student?.group?.teacher?.user?.userProfile?.lastname}*/}
                  {/*</td>*/}
                  {/*<td*/}
                  {/*  style={{*/}
                  {/*    padding: "5px",*/}
                  {/*    border: "1px solid gray",*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  {student?.group?.lessonTime?.time?.slice(0, 5)}*/}
                  {/*</td>*/}
                </tr>
              );
            })}
          </tbody>
        </table>
      </WrapperA>
    </Wrapper>
  );
};

export default PrintDebtorsModal;
