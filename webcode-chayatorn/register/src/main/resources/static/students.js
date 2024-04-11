var courseId;  

function createCourseField(containerType, title, className) {
    const courseContainer = document.getElementById(containerType);
    courseId = courseContainer.childElementCount;

    if (courseId > 10) {
        alert("สามารถใส่ได้ 10 วิชาเท่านั้น");
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
                <label for="${className}subjectCode${courseId}">รหัสวิชา</label>
                <input type="text" id ="${className}subjectCode${courseId}" name="subjectCode" class="form-control" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="${className}subjectName${courseId}">ชื่อวิชา</label>
                <input type="text" id="${className}subjectName${courseId}" name="subjectName" class="form-control" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="${className}subjectSection${courseId}">เซคชั่น</label>
                <input type="text" id="${className}subjectSection${courseId}" name="subjectSection" class="form-control" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="${className}subjectDate${courseId}">วันและเวลาที่เรียน</label>
                <input type="text" id="${className}subjectDate${courseId}" name="subjectDate" class="form-control" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="${className}subjectCredit${courseId}">เครดิต</label>
                <input type="text" id="${className}subjectCredit${courseId}" name="subjectCredit" class="form-control" pattern="[1-3]{1}" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="${className}subjectTeacher${courseId}">อาจารย์ผู้สอน</label>
                <input type="text" id="${className}subjectTeacher${courseId}" name="subjectTeacher" class="form-control" required />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-check">
                <label for="{className}subjectTeacherCheck${courseId}" class="form-check-label">อาจารย์อนุญาต</label>
                <input type="checkbox" id="${className}subjectTeacherCheck${courseId}" name="subjectTeacherCheck" class="form-check-input" value="false" />
              </div>
            </div>
          </div>
          <button class="btn btn-danger remove-course mt-3" type="button">นำออก</button>
        </div>
      `;
  
    const removeButton = courseField.querySelector(".remove-course");
    removeButton.addEventListener("click", function () {
      courseContainer.removeChild(courseField);
    });
  
    courseContainer.appendChild(courseField);
}
function addCourseField() {
  createCourseField("course-fields-container", "การเพิ่มรายวิชา" , "Add");
}

function withDrawCourseField() {
  createCourseField("course-fields-container-withdraw", "การถอนรายวิชา" , "Withdraw");
}

var jsData;

function submitData(){
    collectData();
}

function collectData() {

  const data = {
    date: document.getElementById("date").value,
    studentTitle: document.getElementById("studentTitle").value,
    studentFirstName: document.getElementById("studentFirstName").value,
    studentLastName: document.getElementById("studentLastName").value,
    studentId: document.getElementById("studentId").value,
    studentYear: document.getElementById("studentYear").value,
    studyField: document.getElementById("studyField").value,
    advisor: document.getElementById("advisor").value,
    addressNumber: document.getElementById("addressNumber").value,
    moo: document.getElementById("moo").value,
    tumbol: document.getElementById("tumbol").value,
    amphur: document.getElementById("amphur").value,
    province: document.getElementById("province").value,
    postalCode: document.getElementById("postalCode").value,
    mobilePhone: document.getElementById("mobilePhone").value,
    phone: document.getElementById("phone").value,
    cause: document.getElementById("cause").value,
    addSubjectList: [
       
    ],
    dropSubjectList: [
        
    ]
  };
  let addcount = document.getElementById("course-fields-container").childElementCount;
  let wdcount= document.getElementById("course-fields-container-withdraw").childElementCount;

  for(let i = 1 ; i < addcount ; i++){
  let subjectCode = document.getElementById(`AddsubjectCode${i}`).value;
  let subjectName = document.getElementById(`AddsubjectName${i}`).value;
  let subjectSection = document.getElementById(`AddsubjectSection${i}`).value;
  let subjectDate = document.getElementById(`AddsubjectDate${i}`).value;
  let subjectCredit = document.getElementById(`AddsubjectCredit${i}`).value;
  let subjectTeacher = document.getElementById(`AddsubjectTeacher${i}`).value;
  let subjectTeacherCheck = document.getElementById(`AddsubjectTeacherCheck${i}`).checked;

    let subjectAdd = {
          subjectCode: subjectCode,
            subjectName: subjectName,
            subjectSection: subjectSection,
            subjectDate: subjectDate,
            subjectCredit: subjectCredit,
            subjectTeacher: subjectTeacher,
            subjectTeacherCheck: subjectTeacherCheck
    };
  data.addSubjectList.push(subjectAdd);


  }
  for(let i = 1 ; i < wdcount ; i++){
   
    let subjectCode = document.getElementById(`DropsubjectCode${i}`).value;
    let subjectName = document.getElementById(`DropsubjectName${i}`).value;
    let subjectSection = document.getElementById(`DropsubjectSection${i}`).value;
    let subjectDate = document.getElementById(`DropsubjectDate${i}`).value;
    let subjectCredit = document.getElementById(`DropsubjectCredit${i}`).value;
    let subjectTeacher = document.getElementById(`DropsubjectTeacher${i}`).value;
    let subjectTeacherCheck = document.getElementById(`DropSubjectTeacherCheck${i}`).checked;

    const subjectWithdraw = {
          subjectCode: subjectCode,
            subjectName: subjectName,
            subjectSection: subjectSection,
            subjectDate: subjectDate,
            subjectCredit: subjectCredit,
            subjectTeacher: subjectTeacher,
            subjectTeacherCheck: subjectTeacherCheck
    };
  data.dropSubjectList.push(subjectWithdraw);

  }
    
  jsData = JSON.stringify(data);
  console.log(jsData);
  console.log(data);
  
  fetch('http://localhost:8080/api/students/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsData

        })

        .then(response => {
            if (response.ok) {
                // Request was successful
                alert("บันทึกรายวิชาสำเร็จ");
            } else {
                // Handle errors
                alert("กรอกข้อมูลไม่ถูกต้อง");
            }
        })
        .catch(error => {
            alert("บันทึกรายวิชาไม่สำเร็จ");
        });
}

document.getElementById('mobilePhone').addEventListener('input', function (e) {
  let x = e.target.value.replace(/\D/g, '');
  e.target.value = x;
});