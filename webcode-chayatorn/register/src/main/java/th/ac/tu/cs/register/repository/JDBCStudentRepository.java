package th.ac.tu.cs.register.repository;

import org.springframework.dao.IncorrectResultSizeDataAccessException;
import th.ac.tu.cs.register.model.Student;
import th.ac.tu.cs.register.model.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JDBCStudentRepository implements StudentRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void addStudent(Student student) {
        String type = "addSubject";
        String type2 = "withdrawSubject";

        String s1 = "INSERT INTO student (date, studentTitle, studentFirstName, studentLastName, studentId, studentYear, studyField, advisor, addressNumber, moo, tumbol, amphur, province, postalCode, mobilePhone, phone, cause) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        jdbcTemplate.update(s1 , student.getDate(), student.getStudentTitle(), student.getStudentFirstName(), student.getStudentLastName(), student.getStudentId(), student.getStudentYear(), student.getStudyField(), student.getAdvisor(), student.getAddressNumber(), student.getMoo(), student.getTumbol(), student.getAmphur(), student.getProvince(), student.getPostalCode(), student.getMobilePhone(), student.getPhone(), student.getCause());

        for(Subject s : student.getAddSubjectList()){
            String s2 =  "INSERT INTO Subject (studentId, subjectCode,subjectName,subjectSection,subjectDate,subjectCredit,subjectTeacher,subjectTeacherCheck,type)" +
                    "VALUES (?,?,?,?,?,?,?,?,?)";
            jdbcTemplate.update(s2, student.getStudentId(), s.getSubjectCode(), s.getSubjectName(), s.getSubjectSection(), s.getSubjectDate(), s.getSubjectCredit(), s.getSubjectTeacher(), s.getSubjectTeacherCheck(), type);
        }

        for(Subject s : student.getDropSubjectList()){
            String s2 =  "INSERT INTO Subject (studentId, subjectCode,subjectName,subjectSection,subjectDate,subjectCredit,subjectTeacher,subjectTeacherCheck,type)" +
                    "VALUES (?,?,?,?,?,?,?,?,?)";
            jdbcTemplate.update(s2, student.getStudentId(), s.getSubjectCode(), s.getSubjectName(), s.getSubjectSection(), s.getSubjectDate(), s.getSubjectCredit(), s.getSubjectTeacher(), s.getSubjectTeacherCheck(), type2);
        }

    }

    @Override
    public List<Student> findByStudentId(String id) {
        try {
            String sqlStudent = "SELECT * FROM student where studentId = ?";
            List<Student> students = jdbcTemplate.query(sqlStudent, new BeanPropertyRowMapper<>(Student.class), id);
            String sqlSubject = "SELECT * FROM subject where studentId = ?";

            for (Student s : students) {
                List<Subject> addSubjectList = jdbcTemplate.query(sqlSubject, new BeanPropertyRowMapper<>(Subject.class), s.getStudentId());
                s.setAddSubjectList(addSubjectList.toArray(new Subject[0]));
            }
            for(Student s : students) {
                List<Subject> dropSubjectList = jdbcTemplate.query(sqlSubject, new BeanPropertyRowMapper<>(Subject.class), s.getStudentId());
                s.setDropSubjectList(dropSubjectList.toArray(new Subject[0]));
            }

            return students;

        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    @Override
    public void updateStudent(Student student, String id){
        String sqlStudent = "UPDATE student SET date=?, studentTitle=?, studentFirstName=?, studentLastName=?, studentYear=?, studyField=?, advisor=?, addressNumber=?, moo=?, tumbol=?, amphur=?, province=?, postalCode=?, mobilePhone=?, phone=?, cause=? WHERE studentId=?";
        jdbcTemplate.update(sqlStudent, student.getDate(), student.getStudentTitle(), student.getStudentFirstName(), student.getStudentLastName(), student.getStudentYear(), student.getStudyField(), student.getAdvisor(), student.getAddressNumber(), student.getMoo(), student.getTumbol(), student.getAmphur(), student.getProvince(), student.getPostalCode(), student.getMobilePhone(), student.getPhone(), student.getCause(), id);
    }

    @Override
    public void deleteById(String id) {
        String sqlSubject = "DELETE FROM subject WHERE studentId=?";
        String sqlStudent = "DELETE FROM student WHERE studentId=?";
        jdbcTemplate.update(sqlSubject,id);
        jdbcTemplate.update(sqlStudent,id);
    }

}
