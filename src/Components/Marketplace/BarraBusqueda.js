import { TextInput, UnstyledButton } from "@mantine/core";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";

export default function BarraBusqueda() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [search, setSearch] = useState(searchParams.get("palabra"));
  useEffect(() => {
    console.log({ search });
  }, [search]);
  return (
    <TextInput
      value={search}
      onChange={({ currentTarget: { value } }) => {
        setSearch(value);
      }}
      rightSection={
        <UnstyledButton
          onClick={() => {
            setSearchParams((x) => {
              x.set("palabra", search);
              return x
            });
          }}
        >
          <AiOutlineSearch />
        </UnstyledButton>
      }
    />
  );
}
