package th.ac.tu.cs.register.model;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class Student {
    private String date;
    private String studentTitle;
    private String studentFirstName;
    private String studentLastName;
    private String studentId;
    private Integer studentYear;
    private String studyField;
    private String advisor;
    private String addressNumber;
    private String moo;
    private String tumbol;
    private String amphur;
    private String province;
    private String postalCode;
    private String mobilePhone;
    private String phone;
    private String cause;
    private Subject[] addSubjectList;
    private Subject[] dropSubjectList;
}

