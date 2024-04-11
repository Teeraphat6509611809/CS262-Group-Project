package com.tu.cs264.repository;

import com.tu.cs264.model.Student;

import java.util.List;
/*
 * ID 650911858
 * Praphon Khasaard
 * */
public interface StudentRepositoryInterface {
    public void saveStudent(Student student);
    public List<Student> getStudentById(String studentId);
    public boolean updateStudentNameById(String studentId, String studentName);
    public boolean deleteStudentById(String studentId);
}
