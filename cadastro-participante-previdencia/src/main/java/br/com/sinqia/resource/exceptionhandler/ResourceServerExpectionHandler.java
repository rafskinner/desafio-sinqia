package br.com.sinqia.resource.exceptionhandler;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.core.NestedRuntimeException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class ResourceServerExpectionHandler {

    @ExceptionHandler({ResponseStatusException.class, HttpMessageNotReadableException.class})
    protected ResponseEntity<ResponseException> handle(NestedRuntimeException e) {
        ResponseException re;
        if (e instanceof ResponseStatusException) {
            ResponseStatusException ex = (ResponseStatusException) e;
            re = new ResponseException(ex.getStatus().value(), ex.getStatus(), ex.getReason(), ex.getMessage());
        } else {
            HttpMessageNotReadableException ex = (HttpMessageNotReadableException) e;
            System.out.println(ex.getMessage());
            re = new ResponseException(400, HttpStatus.BAD_REQUEST, "JSON da requisicao apresenta algum erro.", ex.getMessage());
        }
        return ResponseEntity.badRequest().body(re);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    protected ResponseEntity<ResponseException> handle(MethodArgumentNotValidException ex) {
        String error = String.format("Erro de validacao no objeto '%s', no campo '%s'. O campo %s",
                ex.getParameter().getParameterName(), ex.getFieldError().getField(), ex.getFieldError().getDefaultMessage());
        return ResponseEntity.badRequest()
                .body(new ResponseException(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, error, ex.getMessage()));
    }
}

@Data
@AllArgsConstructor
class ResponseException {
    int status;
    HttpStatus motivo;
    String mensagem;
    String trace;
}
