import styled from "@emotion/styled";

export const TimeSortWrapper = styled.div<{
  status: "none" | "asc" | "desc";
}>`
  .heading {
    display: flex;
    gap: 4px;
    cursor: pointer;
    user-select: none;
    min-height: 14px;
  }
  .arrow {
    transition: 0.3s;
    display: ${(props) => (props.status === "none" ? "none" : "flex")};
    align-items: center;
    justify-content: center;
    transform: rotate(
      ${(props) => (props.status === "asc" ? "180deg" : "0deg")}
    );
  }
`;
