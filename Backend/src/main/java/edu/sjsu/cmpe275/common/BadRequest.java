package edu.sjsu.cmpe275.common;

import javax.xml.bind.annotation.XmlElement;

public class BadRequest {
    @XmlElement
    String code;
    @XmlElement
    String msg;

    BadRequest() {
    }

    public BadRequest(String code, String errorMessage) {
        this.code = code;
        this.msg = errorMessage;
    }

    public String getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
