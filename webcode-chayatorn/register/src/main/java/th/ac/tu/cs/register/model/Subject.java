package th.ac.tu.cs.register.model;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Subject {
    private String subjectCode;
    private String subjectName;
    private String subjectSection;
    private String subjectDate;
    private String subjectCredit;
    private String subjectTeacher;
    private Boolean subjectTeacherCheck;
    private String type;
}
