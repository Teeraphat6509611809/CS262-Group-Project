var courseId;
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const forms = document.querySelectorAll("form");

    forms.forEach(function (form) {
      form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      });
    });

    // Form Submission
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      if (courseId>=1) {
        if (form.checkValidity()) {
          const formData = collectFormData(form);
  
          submitFormData(formData)
            .then((data) => {
              console.log("Form submitted successfully", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      } else {
        alert("กรุณากรอกข้อมูลเพิ่ม / ถอน อย่างน้อย 1 รายการ")
      }
    });

    // Function to collect form data
    function collectFormData(form) {
      const formData = {
        studentId: getInputValue("studentId"),
        studentTitle: getInputValue("studentTitle"),
        studentFirstName: getInputValue("studentFirstName"),
        studentLastName: getInputValue("studentLastName"),
        studentYear: getInputValue("studentYear"),
        studyField: getInputValue("studyField"),
        advisorName: getInputValue("advisorName"),
        cause: getInputValue("cause"),
        addressNumber: getInputValue("addressNumber"),
        moo: getInputValue("moo"),
        tumbol: getInputValue("tumbol"),
        amphur: getInputValue("amphur"),
        province: getInputValue("province"),
        postalCode: getInputValue("postalCode"),
        mobilePhone: getInputValue("mobilePhone"),
        phone: getInputValue("phone"),
        registerSubject: collectSubjects(".course-field"),
        registerWithdraw: collectSubjects(".withdraw-field"),
      };
      return formData;
    }

    // Function to get the value of an input element by its ID
    function getInputValue(inputId) {
      return form.querySelector(`#${inputId}`).value;
    }

    // Function to collect subject data
    function collectSubjects(selector) {
      const subjectFields = form.querySelectorAll(selector);
      console.log(subjectFields);
			const subjectData = [];
			
      subjectFields.forEach(function (field) {
        const subject = {
          subjectCode: getFieldInputValue(field, "subjectCode"),
          subjectName: getFieldInputValue(field, "subjectName"),
          subjectSection: getFieldInputValue(field, "subjectSection"),
          subjectDate: getFieldInputValue(field, "subjectDate"),
          subjectCredit: getFieldInputValue(field, "subjectCredit"),
          subjectTeacher: getFieldInputValue(field, "subjectTeacher"),
          subjectTeacherCheck: getFieldInputChecked(
            field,
            "subjectTeacherCheck"
          ),
        };
        subjectData.push(subject);
				console.log(subjectData);
      });
      return subjectData;
    }

    // Function to get the value of an element by its class within a field
    function getFieldInputValue(field, className) {
      return field.querySelector(`#${className}`).value;
    }

    // Function to get the checked status of an element by its class within a field
    function getFieldInputChecked(field, className) {
      return field.querySelector(`#${className}`).checked;
    }

    // Function to submit form data to the server
    function submitFormData(formData) {
      const endpointURL = "http://localhost:8080/api/students/add";
      if (!formData) {
        return Promise.reject(new Error("Form data is not valid."));
      }
      console.log(JSON.stringify(formData));
      return fetch(endpointURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to submit the form");
        }
      });
    }
  });
})();

function createCourseField(containerId, title , className) {
  const courseFieldsContainer = document.getElementById(containerId);
  courseId = courseFieldsContainer.childElementCount;
  console.log(courseFieldsContainer);

  if (courseId > 10) {
    alert("You can only add up to 10 courses.");
    return;
  }

  const courseField = document.createElement("div");
  courseField.classList.add(className);
  courseField.innerHTML = `
	  <div class="card p-3 rounded my-4">
		<h4 class="my-3">${title}</h4>
		<div class="row">
		  <div class="col-md-4">
			<div class="form-group">
			  <label for="subjectCode">Subject Code</label>
			  <input type="text" id="subjectCode" name="subjectCode" class="form-control" required />
			</div>
		  </div>
		  <div class="col-md-4">
			<div class="form-group">
			  <label for="subjectName">Subject Name</label>
			  <input type="text" id="subjectName" name="subjectName" class="form-control" required />
			</div>
		  </div>
		  <div class="col-md-4">
			<div class="form-group">
			  <label for="subjectSection">Subject Section</label>
			  <input type="text" id="subjectSection" name="subjectSection" class="form-control" required />
			</div>
		  </div>
		  <div class="col-md-4">
			<div class="form-group">
			  <label for="subjectDate">Subject Date & Time</label>
			  <input type="text" id="subjectDate" name="subjectDate" class="form-control" required />
			</div>
		  </div>
		  <div class="col-md-4">
			<div class="form-group">
			  <label for="subjectCredit">Subject Credit</label>
			  <input type="text" id="subjectCredit" name="subjectCredit" class="form-control" required />
			</div>
		  </div>
		  <div class="col-md-4">
			<div class="form-group">
			  <label for="subjectTeacher">Subject Teacher</label>
			  <input type="text" id="subjectTeacher" name="subjectTeacher" class="form-control" required />
			</div>
		  </div>
		  <div class="col-md-4">
			<div class="form-check">
			  <input type="checkbox" id="subjectTeacherCheck" name="subjectTeacherCheck" class="form-check-input" value="false" />
			  <label for="subjectTeacherCheck" class="form-check-label">Subject Teacher Check</label>
			</div>
		  </div>
		</div>
		<button class="btn btn-danger remove-course mt-3" type="button">Remove</button>
	  </div>
	`;

  const removeButton = courseField.querySelector(".remove-course");
  removeButton.addEventListener("click", function () {
    courseFieldsContainer.removeChild(courseField);
  });

  courseFieldsContainer.appendChild(courseField);
}

function addCourseField() {
  createCourseField("course-fields-container", "การเพิ่มรายวิชา" , "course-field");
}

function withDrawCourseField() {
  createCourseField("course-fields-container-withdraw", "การถอนรายวิชา" , "withdraw-field");
}

//Validation Phone Number
function updatePattern(inputElement) {
  const value = inputElement.value;

  // Define a regular expression pattern for a valid phone number
  let pattern = "";

  if (value === "") {
    // No pattern required if the field is empty
    pattern = ".*";
  } else {
    // Set a pattern for a valid phone number
    pattern = "^[0-9]{10}$"; // Change this pattern to match your phone number format
  }

  // Set the pattern attribute of the input element
  inputElement.setAttribute("pattern", pattern);
}
