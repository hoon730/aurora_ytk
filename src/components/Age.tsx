import styled from "styled-components";
import { certificationInfo } from "../utils";

const Wrapper = styled.span`
  width: 30px;
  height: 30px;
  background: #b5b5b5;
  border-radius: 5px;
  font-weight: bold;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Age = ({ certification }: { certification: string | undefined }) => {
  return (
    <Wrapper
      style={{ background: `${certificationInfo(certification).color}` }}
    >
      {certificationInfo(certification).age}
    </Wrapper>
  );
};

export default Age;
