package com.tu.cs264.controller;

import com.tu.cs264.model.Student;
import com.tu.cs264.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/*
 * ID 650911858
 * Praphon Khasaard
 * */
@RestController
@CrossOrigin
@RequestMapping("/api/students")
public class RegisterPageController {
    @Autowired
    StudentRepository studentRepository;

    @PostMapping("/add")
    public void addStudent(@RequestBody Student student) {
         studentRepository.saveStudent(student);
    }

    @GetMapping("/queryBystudentId")
    public List<Student> reqStudent(@RequestParam (name = "studentId", required = true) String studentId){
        return studentRepository.getStudentById(studentId);
    }

    @GetMapping("/updateStudentname")
    public boolean updateStudentName(@RequestParam (name = "studentId", required = true) String studentId ,
                                     @RequestParam (name = "studentName", required = true) String updateStudentname) {
        return studentRepository.updateStudentNameById(studentId, updateStudentname);
    }

    @DeleteMapping("/deleteByStudentId")
    public boolean deleteStudentByid(@RequestParam (name = "studentId") String studentId) {
        return studentRepository.deleteStudentById(studentId);
    }

}
