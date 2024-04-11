package th.ac.tu.cs.register.repository;

import th.ac.tu.cs.register.model.Student;

import java.util.List;

public interface StudentRepository {

        void addStudent(Student student);

        List<Student> findByStudentId(String id);

        void updateStudent(Student student, String id);

        void deleteById(String id);
}
