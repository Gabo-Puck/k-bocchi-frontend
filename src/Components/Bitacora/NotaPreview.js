import {Paper, Title } from "@mantine/core";

export default function NotaPreview({nota}){
    return (
        <>
            <Paper>
                <Title order={3}>{nota.titulo}</Title>
                <Title order={3}>{nota.titulo}</Title>

            </Paper>
        </>
    )
}