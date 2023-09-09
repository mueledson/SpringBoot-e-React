import { useEffect, useState } from 'react'
import './App.css'

function App() {

  // Objeto produto
  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true)
  const [produtos, setProdutos] = useState([])
  const [objProduto, setObjtProduto] = useState(produto)

  // UseEffect
  useEffect(() => {
    fetch('http://localhost:8080/list')
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido))
  }, [])

  // Obtendo os Dados do Formulário

  const aoDigitar = (e) => {
    setObjtProduto({...objProduto, [e.target.name]:e.target.value})
    setObjtProduto({...objProduto, [e.target.name]:e.target.value})
  }

  // Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers:{
        'Content-type': 'application/json',
        'Acept': 'application/json'
      }
    })

    .then(retorno => retorno.json())

    .then(retorno_convertido => {
      
      if (retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem)
      }else{
        setProdutos([...produtos, retorno_convertido])
        alert('Produto cadastrado com sucesso!')
        limpaForm()
      }
    })
  }

  // Remover produto
  const remover = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo, {
      method: 'delete',
      headers:{
        'Content-type': 'application/json',
        'Acept': 'application/json'
      }
    })

    .then(retorno => retorno.json())

    .then(retorno_convertido => {
      
      // Mensagem 
      alert(retorno_convertido.mensagem)

      // Cópia do vetor de Produtos
      let vetorTemp = [...produtos]

      // índice
      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo
      })

      // Remover produto do vetorTemp
      vetorTemp.splice(indice, 1)

      //Atualizar o vetor de Produtos
      setProdutos(vetorTemp)

      // Limpar Form
      limpaForm()
    })
  }

  // Alterar produto
  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'put',
      body: JSON.stringify(objProduto),
      headers:{
        'Content-type': 'application/json',
        'Acept': 'application/json'
      }
    })

    .then(retorno => retorno.json())

    .then(retorno_convertido => {
      
      if (retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem)
      }else{
        //Mensagem
        alert('Produto alterado com sucesso!')

        // Cópia do vetor de Produtos
        let vetorTemp = [...produtos]

        // índice
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo
        })

        // Altera produto do vetorTemp
        vetorTemp[indice] = objProduto

        //Atualizar o vetor de Produtos
        setProdutos(vetorTemp)        

        //Limpa Formulário
        limpaForm()
      }
    })
  }

  // Limpa o FORM
    const limpaForm = () => {
      setObjtProduto(produto)
      setBtnCadastrar(true)
    }

  // Seleciona o produto
  const selecionarProduto = (indice) => {
    setObjtProduto(produtos[indice])
    setBtnCadastrar(false)
  }

  // Retorno
  return (
    <div className="App">
      {/* FORM */}

      <form>
            <input type='text' value={objProduto.nome} onChange={aoDigitar} name="nome" placeholder="Nome Do Produto" className="form-control"/>
            <input type='text' value={objProduto.marca} onChange={aoDigitar} name="marca" placeholder="Marca Do Produto" className="form-control"/>
            
            {
                btnCadastrar
                ?
                <button onClick={cadastrar} type="button" className="btn btn-primary">Cadastrar</button>
                :
                <div> 
                    <button onClick={alterar} type="button" className="btn btn-warning">Alterar</button>
                    <button onClick={remover} type="button" className="btn btn-danger">Remover</button>
                    <button onClick={limpaForm} type="button" className="btn btn-secondary">Cancelar</button>
                </div>
            }

        </form>

      {/* TABLE */}
      <h1>Lista de Produtos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Marca</th>
                        <th>Selecionar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    produtos.map((item, indice) => (
                        <tr key={indice}>
                            <td className="text-center">{item.codigo}</td>
                            <td>{item.nome}</td>
                            <td>{item.marca}</td>
                            <td> <button className="btn btn-success" onClick={() => {selecionarProduto(indice)}}>Selecionar</button> </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
    </div>
  )
}

export default App