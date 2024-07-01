import styled from "@emotion/styled";

export const NameWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & > div {
    display: flex;
  }
`;

export const ExpandWrapper = styled.div`
  padding: 20px;
  gap: 16px;
  display: grid;
  grid-column: 2;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
`;

export const BranchCard = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #e6e8ec80;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.12);
  border-radius: 14px;

  .img-side {
    width: 100%;
  }

  .img-side img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 14px 0 0 14px;
  }

  .text-side {
    padding: 12px;
    width: 100%;

    .branch-head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .icons {
        display: flex;
        gap: 8px;
        align-items: center;
        cursor: pointer;
      }
    }
  }

  ul {
    list-style: none !important;
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      display: flex;
      align-items: center;
      gap: 14px;
      font-weight: 600;
    }
  }
`;
