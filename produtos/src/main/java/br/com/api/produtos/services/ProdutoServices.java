package br.com.api.produtos.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.models.ProdutoModel;
import br.com.api.produtos.models.RespostaModel;
import br.com.api.produtos.repository.ProdutoRepository;

@Service
public class ProdutoServices {
 
    @Autowired
    private ProdutoRepository pr;

    @Autowired
    private RespostaModel rm;

    //Listar
    public Iterable<ProdutoModel> listar(){
        return pr.findAll();
    } 
 
    // Criar e Editar
    public ResponseEntity<?> cadastrarAlterar(ProdutoModel pm, String acao){
        if (pm.getNome().equals("")) {
            rm.setMensagem("O nome do produto é obrigatório");
            return new ResponseEntity<RespostaModel>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getMarca().equals("")){
            rm.setMensagem("O nome da marca é obrigatório");
            return new ResponseEntity<RespostaModel>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<ProdutoModel>(pr.save(pm), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<ProdutoModel>(pr.save(pm), HttpStatus.OK);
            }
        }
    } 
 
    // Apagar
    public ResponseEntity<RespostaModel> remover(long codigo){
        
        pr.deleteById(codigo);
        
        rm.setMensagem("O Produto foi removido com sucesso"); 
        return new ResponseEntity<RespostaModel>(rm, HttpStatus.BAD_REQUEST);

    } 
}