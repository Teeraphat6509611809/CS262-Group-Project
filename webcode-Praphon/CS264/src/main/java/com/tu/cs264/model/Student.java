package com.tu.cs264.model;
/*
 * ID 650911858
 * Praphon Khasaard
 * */
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class Student {
    private String UUID;
    private String studentTitle;
    private String studentFirstName;
    private String studentLastName;
    private String studentId;
    private String studentYear;
    private String studyField;
    private String advisorName;
    private String cause;
    private String addressNumber;
    private String moo;
    private String tumbol;
    private String amphur;
    private String province;
    private String postalCode;
    private String mobilePhone;
    private String phone;
    private Subject[] registerSubject;
    private Subject[] registerWithdraw;
}
