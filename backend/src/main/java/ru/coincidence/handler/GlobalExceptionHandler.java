package ru.coincidence.handler;


import org.postgresql.util.PSQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PSQLException.class)
    public ResponseEntity<String> handlePSQLException(PSQLException e) {
        String error = e.getMessage();

        HttpStatus status = HttpStatus.BAD_REQUEST;
        if (error.contains("unique constraint")) {
            status = HttpStatus.CONFLICT;
        }
        return ResponseEntity.status(status).body(e.getSQLState());
    }

}
