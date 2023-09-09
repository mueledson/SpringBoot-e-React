package br.com.api.produtos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.models.ProdutoModel;
import br.com.api.produtos.models.RespostaModel;
import br.com.api.produtos.services.ProdutoServices;

@RestController
@CrossOrigin(origins = "*")
public class ProdutoController {
    
    @Autowired
    private ProdutoServices ps;

    @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<RespostaModel> excluir(@PathVariable long codigo){
        return ps.remover(codigo);
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody ProdutoModel pm){
        return ps.cadastrarAlterar(pm, "alterar");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> criar(@RequestBody ProdutoModel pm){
        return ps.cadastrarAlterar(pm, "cadastrar");
    }

    @GetMapping("/list")
    public Iterable<ProdutoModel> listar(){
        return ps.listar();
    }

    @GetMapping("/")
    public String rota(){
        return "Alguma coisa";
    }
}