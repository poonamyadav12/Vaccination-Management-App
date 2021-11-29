package edu.sjsu.cmpe275.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Error {
    @XmlElement(name = "BadRequest")
    private BadRequest badRequest;

    Error() {
    }

    private Error(BadRequest badRequest) {
        this.badRequest = badRequest;
    }

    public static ResponseEntity<Error> badRequest(HttpStatus httpStatus, String msg, Object... args) {
        return new ResponseEntity<>(new Error(new BadRequest(String.valueOf(httpStatus.value()), String.format(msg, args))), httpStatus);
    }

    @JsonProperty("BadRequest")
    public BadRequest getBadRequest() {
        return badRequest;
    }
}
