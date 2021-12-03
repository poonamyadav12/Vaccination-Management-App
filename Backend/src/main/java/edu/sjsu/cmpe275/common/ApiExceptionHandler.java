package edu.sjsu.cmpe275.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;


@ControllerAdvice
@RequestMapping(produces = "application/json")
@ResponseBody
public class ApiExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseEntity<?> handleValidationError(ConstraintViolationException ex) {
        ArrayList<ConstraintViolation<?>> violations = new ArrayList<>(ex.getConstraintViolations());
        return Error.badRequest(HttpStatus.BAD_REQUEST, violations.get(0).getMessage());
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseEntity<?> handleValidationError(SQLIntegrityConstraintViolationException ex) {
        return Error.badRequest(HttpStatus.BAD_REQUEST, ex.getMessage());
    }
}
