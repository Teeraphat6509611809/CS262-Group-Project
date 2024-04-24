CREATE TABLE `student` (
  `UUID` varchar(64) NOT NULL,
  `timestamp` varchar(45) DEFAULT NULL,
  `studentId` varchar(15) NOT NULL,
  `studentTitle` varchar(255) NOT NULL,
  `studentFirstName` varchar(255) NOT NULL,
  `studentLastName` varchar(255) NOT NULL,
  `studentYear` varchar(4) NOT NULL,
  `studyField` varchar(255) NOT NULL,
  `advisorName` varchar(255) NOT NULL,
  `cause` varchar(255) NOT NULL,
  `addressNumber` varchar(255) NOT NULL,
  `moo` varchar(255) NOT NULL,
  `tumbol` varchar(255) NOT NULL,
  `amphur` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `postalCode` varchar(10) NOT NULL,
  `mobilePhone` varchar(15) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `subject` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UUID` varchar(45) NOT NULL,
  `subjectCode` varchar(45) NOT NULL,
  `subjectName` varchar(45) NOT NULL,
  `subjectSection` varchar(45) NOT NULL,
  `subjectDate` varchar(45) NOT NULL,
  `subjectCredit` varchar(45) NOT NULL,
  `subjectTeacher` varchar(45) NOT NULL,
  `subjectTeacherCheck` tinyint DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci