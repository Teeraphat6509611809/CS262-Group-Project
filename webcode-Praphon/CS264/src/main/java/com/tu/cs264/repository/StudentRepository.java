package com.tu.cs264.repository;
/*
* ID 650911858
* Praphon Khasaard
* */

import com.tu.cs264.model.Student;
import com.tu.cs264.model.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public class StudentRepository implements StudentRepositoryInterface {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    UUID u;
    public StudentRepository() {
        u = UUID.randomUUID();
    }


    public void saveStudent(Student student) {
        String uuid = u.toString();
        String sql = "INSERT INTO Student (studentId, studentTitle, studentFirstName, studentLastName, studentYear, studyField, advisorName, cause, addressNumber, moo, tumbol, amphur, province, postalCode, mobilePhone, phone ,uuid , timestamp) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)";
        jdbcTemplate.update(sql, student.getStudentId(), student.getStudentTitle(), student.getStudentFirstName(),
                student.getStudentLastName(), student.getStudentYear(), student.getStudyField(),
                student.getAdvisorName(), student.getCause(), student.getAddressNumber(),
                student.getMoo(), student.getTumbol(), student.getAmphur(), student.getProvince(),
                student.getPostalCode(), student.getMobilePhone(), student.getPhone(), uuid ,  new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(new Date()));

        String sql_2 = "INSERT INTO subject (subjectCode, subjectName, subjectSection, subjectDate, subjectCredit, subjectTeacher , uuid  , type , subjectTeacherCheck)" +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        for (Subject s: student.getRegisterSubject()) {
            jdbcTemplate.update(sql_2, s.getSubjectCode(),s.getSubjectName() , s.getSubjectSection() , s.getSubjectDate(),s.getSubjectCredit() , s.getSubjectTeacher(), uuid , "Register" ,s.getSubjectTeacherCheck());
        }
        for (Subject s: student.getRegisterWithdraw()) {
            jdbcTemplate.update(sql_2, s.getSubjectCode(),s.getSubjectName() , s.getSubjectSection() , s.getSubjectDate() , s.getSubjectCredit() , s.getSubjectTeacher() ,uuid , "Withdraw" , s.getSubjectTeacherCheck());
        }

        u = UUID.randomUUID();
    }

    public List<Student> getStudentById(String studentId) {
        String sql = "SELECT *  FROM student WHERE student.studentId = ?";
        List<Student> st;
        st =  jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Student.class) , studentId);

        String sql_2 = "SELECT *  FROM subject WHERE UUID = ? AND Type = ?";
        for (Student s: st) {
            List<Subject> subJ = jdbcTemplate.query(sql_2, new BeanPropertyRowMapper<>(Subject.class) , s.getUUID() , "Register");
            s.setRegisterSubject(subJ.toArray(new Subject[0]));
        }
        for (Student s: st) {
            List<Subject> subJ = jdbcTemplate.query(sql_2, new BeanPropertyRowMapper<>(Subject.class) , s.getUUID() , "Withdraw") ;
            s.setRegisterWithdraw(subJ.toArray(new Subject[0]));
        }

        return st;
    }

    @Override
    public boolean updateStudentNameById(String studentId, String studentName) {
        String sql = "UPDATE STUDENT SET studentFirstName = ? WHERE studentId = ?";
        jdbcTemplate.update(sql, studentName , studentId);
        return true;
    }

    @Override
    public boolean deleteStudentById(String studentId) {
        String sqlDeleteSubjectByUUID = "DELETE FROM subject WHERE UUID = ?";
        String sqlDeleteStudentByStudentId = "DELETE FROM student WHERE studentId = ?";
        List<Student> arr = getStudentById(studentId);
        for (Student s : arr) {
            jdbcTemplate.update(sqlDeleteSubjectByUUID, s.getUUID());
        }
        jdbcTemplate.update(sqlDeleteStudentByStudentId, studentId);
        return true;
    }
}
