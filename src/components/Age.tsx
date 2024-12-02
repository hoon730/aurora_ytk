import styled from "styled-components";

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

const Age = ({ certification }: { certification: string }) => {
  const bgColor: Record<string, string> = {
    All: "##00964b",
    "12": "#eabc00",
    "15": "#dc7317",
    "19": "#d92c35",
  };
  return (
    <Wrapper style={{ background: `${bgColor[certification]}` }}>
      {certification}
    </Wrapper>
  );
};

export default Age;
