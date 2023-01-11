import { Button, Paper, TableContainer, Link } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useEffect, useState } from "react"
import { Link as RouterLink} from 'react-router-dom'
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"


export default function AdministracaoRestaurantes() {
    
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get('v2/restaurantes/')
        .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const excluir = (restauranteAhSerExcluido: IRestaurante) => {
        http.delete(`v2/restaurantes/${restauranteAhSerExcluido.id}/`)
        .then(() => {
            const listaRestaurantes = restaurantes.filter(restaurantes => restaurantes.id !== restauranteAhSerExcluido.id)
            setRestaurantes([...listaRestaurantes])
        })
    }

  return (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Nome
                    </TableCell>
                    <TableCell>
                        Editar
                    </TableCell>
                    <TableCell>
                        Excluir
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {restaurantes.map(restaurante => 
                <TableRow key={restaurante.id}>
                    <TableCell>
                        {restaurante.nome}
                    </TableCell>
                    <TableCell>
                        <Link component={RouterLink} to={`/admin/restaurantes/${restaurante.id}`}>
                                <Button variant='outlined' sx={{ color: 'blue' }}>
                                    editar
                                </Button>
                        </Link>
                    </TableCell>
                    <TableCell>
                        <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                            Excluir
                        </Button>
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>
  )
}
