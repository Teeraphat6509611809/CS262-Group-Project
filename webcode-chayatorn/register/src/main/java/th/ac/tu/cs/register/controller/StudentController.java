package th.ac.tu.cs.register.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import th.ac.tu.cs.register.model.Student;
import th.ac.tu.cs.register.repository.StudentRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/add")
    public void addStudent(@RequestBody Student student) {

        try {
            studentRepository.addStudent(student);

        } catch (Exception e) {
            System.err.println(e);
        }
    }

    @GetMapping("/id")
    public List<Student> findByStudentId(@RequestParam(name = "studentId", required = true) String studentId) {
        return studentRepository.findByStudentId(studentId);
    }

    @PostMapping("/update")
    public void updateStudent(
            @RequestParam(name = "studentId") String studentId,
            @RequestBody Student student) {
        studentRepository.updateStudent(student, studentId);
    }

    @DeleteMapping("/delete")
    public void deleteStudent(@RequestParam(name = "studentId", required = true) String studentId) {
        studentRepository.deleteById(studentId);
    }
}
