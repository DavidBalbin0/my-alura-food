import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../../http'
import IRestaurante from '../../../interfaces/IRestaurante'

export default function FormularioRestaurante() {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`v2/restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        console.log('enviar ')
        console.log(nomeRestaurante)
        if (parametros.id) {
            http.put(`v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                })
        } else {
            http.post('v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                })
        }
    }
    return (
        <>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <Typography component='h1' variant="h6">Formulario de Restaurante</Typography>
                <Box component='form' onSubmit={aoSubmeterForm}>
                    <TextField
                        value={nomeRestaurante}
                        onChange={e => setNomeRestaurante(e.target.value)}
                        label='Nome do Restaurante'
                        variant='standard'
                        fullWidth
                        required
                    />
                    <Button sx={{ marginTop: '4px' }} type='submit' fullWidth variant='outlined'>Salvar</Button>
                </Box>
            </Box>
        </>

    )
}
