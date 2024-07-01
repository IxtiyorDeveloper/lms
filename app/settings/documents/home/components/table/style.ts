import styled from "@emotion/styled";
import Link from "next/link";

export const NameWrapper = styled.div`
  display: flex;
  padding: 5px 0 5px 20px;
`;

export const TypeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Download = styled(Link)`
  cursor: pointer;
  padding: 4px;
`;
