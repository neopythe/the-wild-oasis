import styled, { css } from "styled-components";

interface DivisionProps {
  $type?: "horizontal" | "vertical";
}

const Division = styled.div<DivisionProps>`
  display: flex;

  ${({ $type }) =>
    $type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${({ $type }) =>
    $type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Division.defaultProps = {
  $type: "horizontal",
};

export default Division;
