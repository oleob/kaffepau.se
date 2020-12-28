import React, { ChangeEventHandler, FC, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Container from "./Container";
import { Copy } from "./icons";

const textColor = "#f6f7f8";

const Text = styled.div`
  margin: 0.25rem;
  padding-bottom: 0.25rem;
`;

const Input = styled.input`
  border: none;
  font-size: 1.5rem;
  border-radius: 0.2rem;
  background-color: #a1ccd9;
  padding: 1rem;
  color: #224853;
  &::placeholder {
    color: #40869c;
  }
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0.5rem;
  font-size: 1.5rem;
  color: ${textColor};
`;

const Button = styled.button`
  border: none;
  border-radius: 0.2rem;
  color: ${textColor};
  background-color: #19231a;
  font-size: 1.5rem;
  padding: 1rem;
  &:disabled {
    opacity: 0.6;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1rem;
  margin: 2rem;
`;

const H1 = styled.h1`
  text-align: center;
  color: ${textColor};
  margin: 1rem;
`;

const P = styled.p`
  text-align: center;
  color: ${textColor};
  margin: 1rem;
`;

type TextFieldProps = {
  label: string;
  placeholder: string;
  type?: "text" | "number";
  value: string | number;
  setValue: ((value: string | number) => void) | ((value: string) => void);
};

const TextField: FC<TextFieldProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  setValue,
}) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <Label>
      <Text>{label}</Text>
      <Input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </Label>
  );
};

const validTime = new RegExp("([01]?[0-9]|2[0-3]):[0-5][0-9]");

const validate = (time: string, length: number | string) => {
  if (!validTime.exec(time)) {
    return "Ugyldig tidspunkt";
  }
  if (Number.isNaN(+length) || +length <= 0) {
    return "Ugyldig lengde";
  }
  return undefined;
};

const CreateBreak: FC = () => {
  const history = useHistory();

  const [time, setTime] = useState("14:00");
  const [length, setLength] = useState<number | string>("15");
  const [error, setError] = useState<string | undefined>(undefined);

  const changeTime = (time: string) => {
    setError(validate(time, length));
    setTime(time);
  };

  const changeLength = (length: string | number) => {
    setError(validate(time, length));
    setLength(length);
  };

  const copyUrl = () => {
    const url = `${window.location.host}/${time}/${length}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <Container type="create">
      <H1>Lag din egen kaffepause</H1>
      <P>
        Sett tidspunkt og lengde, og få en egen url som viser din kaffepause.
      </P>
      <TextField
        label="Tidspunkt"
        placeholder="f.eks. 14:00"
        value={time}
        setValue={changeTime}
      />
      <TextField
        label="Lengde i minutter"
        placeholder="f.eks. 15"
        type="number"
        value={length}
        setValue={changeLength}
      />
      <P>{error ? error : "‎‏‏‎ ‎"}</P>
      <ButtonContainer>
        <Button
          onClick={() => {
            history.push(`/${time}/${length}`);
          }}
          disabled={!!error}
        >
          Test link
        </Button>
        <Button onClick={copyUrl} disabled={!!error}>
          Kopier link <Copy style={{ paddingLeft: "0.5rem", fill: "#fff" }} />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default CreateBreak;
