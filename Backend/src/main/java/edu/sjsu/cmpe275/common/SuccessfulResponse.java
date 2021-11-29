package edu.sjsu.cmpe275.common;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import javax.xml.bind.annotation.XmlElement;

@JacksonXmlRootElement(localName = "Response")
public class SuccessfulResponse {
    @XmlElement
    String code;
    @XmlElement
    String msg;

    SuccessfulResponse() {
    }

    public SuccessfulResponse(String msg) {
        this.code = "200";
        this.msg = msg;
    }

    public String getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
