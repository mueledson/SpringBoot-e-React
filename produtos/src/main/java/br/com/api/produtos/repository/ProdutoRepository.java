package br.com.api.produtos.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.api.produtos.models.ProdutoModel;

public interface ProdutoRepository extends CrudRepository<ProdutoModel, Long>{

}