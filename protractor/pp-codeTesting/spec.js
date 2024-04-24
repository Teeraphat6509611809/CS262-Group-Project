// spec.js

// Install the node-mysql package
// npm install mysql

const mysql = require('mysql');
const { beforeEach, afterEach } = require('node:test');

// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  port : 3306 ,
  user: 'root',
  password: '12345678',
  database: 'cs262_testing'
});

// Connect to the database
connection.connect();

// Example function to fetch data from the database
function fetchDataFromDatabase(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


describe('Protractor Demo App',  function() {
   
    // it('should have a title',  function() {
    //   browser.ignoreSynchronization = true;
    //   browser.get('http://localhost:8080/');
    //   expect(browser.getTitle()).toEqual('Student Registeration Form');
    // });

    // it('should pull data',async function(){
    //   browser.ignoreSynchronization = true;
    //   browser.get('http://localhost:8080/');
    //   element(by.id("studentTitle")).click().then(()=>{
        
    //     element(by.css("#studentTitle > option:nth-child(1)")).click();
    //   });

    //   element(by.id("studentFirstName")).sendKeys("วรชาติ");
    //   element(by.id("studentLastName")).sendKeys("ติวงศ์");
    //   element(by.id("studentId")).sendKeys("6501234567");
    //   element(by.id("studentYear")).sendKeys("2");
    //   element(by.id("studyField")).sendKeys("วิทยาการคอมพิวเตอร์");
    //   element(by.id("addressNumber")).sendKeys("126/4");
    //   element(by.id("moo")).sendKeys("10");
    //   element(by.id("tumbol")).sendKeys("หนองปรือ");
    //   element(by.id("amphur")).sendKeys("บางละมุง");
    //   element(by.id("province")).sendKeys("ชลบุรี");
    //   element(by.id("postalCode")).sendKeys("20150");
    //   element(by.id("mobilePhone")).sendKeys("0888888888");
    //   element(by.id("phone")).sendKeys("0333333333");
    //   element(by.id("advisorName")).sendKeys("อ.ทรงศักดิ์");
    //   let addbutton = element(by.id("add-course"));
    //   await browser.executeScript("arguments[0].scrollIntoView(true);", addbutton.getWebElement());
    //   browser.sleep(800); //important do not delete or it go kaboom
     
    //     await addbutton.click().then(function(){
    //       element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("CS213"); //subjcode
    //     element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("Data structure"); //subjname
    //     element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("650008"); //subjsection
    //     element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("จ, ศ 9.30-11.00"); //subjdate
    //     element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("3"); // subjcredit
    //     element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(6) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("อ.ฐาปนา"); //subjteacher
    //     element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(7) > div:nth-child(1) > input:nth-child(1)`)).click();
    //     });
       
    //     element(by.id("cause")).sendKeys("credit ไม่ถึง");
    //     let sendbutton = element(by.css("button.btn:nth-child(14)"));
    //     await browser.executeScript("arguments[0].scrollIntoView(true);", sendbutton.getWebElement());
    //     browser.sleep(800);
    //     await sendbutton.click();
    //     const std = await fetchDataFromDatabase('SELECT * FROM student WHERE studentId = 6501234567');
    //     console.log(std[0]);
    //     const uid = std[0].UUID;
    //     const subj = await fetchDataFromDatabase('SELECT * FROM subject WHERE UUID = ? AND subjectCode = ?', [uid, 'CS213']);
    //     expect(std[0].studentId).toEqual("6501234567");
    //     console.log(subj);
    //     expect(subj[0].subjectCode).toEqual("CS213");
        
  
    //   await connection.query(`DELETE FROM student`);
    //   await connection.query(`DELETE FROM subject`);

    // });
    // it('should warn after input nothing',async function(){
    //   browser.ignoreSynchronization = true;
    //   browser.get('http://localhost:8080/');
    //   let sendbutton = element(by.css("button.btn:nth-child(14)"));
    //     await browser.executeScript("arguments[0].scrollIntoView(true);", sendbutton.getWebElement());
    //     browser.sleep(800);
    //     await sendbutton.click();
    //     browser.sleep(100);
      
    //   // Get the text of the prompt dialog
    //   var alertDialog = browser.switchTo().alert();
    //   await alertDialog.getText().then(function(alertText) {
    //     // Assert or perform actions based on the text of the prompt dialog
    //     expect(alertText).toEqual('กรุณากรอกข้อมูลเพิ่ม / ถอน อย่างน้อย 1 รายการ');
    //     alertDialog.accept();
    //   });
    //   var elements = element.all(by.className('invalid-feedback'));

    //   await elements.then(function(arr) {
    //     warning = arr;
    //     // Now 'arr' is an array of ElementFinders.
    //     arr.forEach(function(elm,index) {
    //       // Do something with each element
    //       elm.getText().then(function(text) {
    //         let warning = ["This field is required.",
    //   "This field is required.",
    //   "Invalid student ID format. It must be 10 digits.",
    //   "Invalid student year. It must be between 1 and 7.",
    //   "This field is required.",
    //   "This field is required.",
    //   "This field is required.",
    //   "This field is required.",
    //   "This field is required.",
    //   "This field is required.",
    //   "This field is required.",
    //   "This field is required.",
    //   "Invalid Postcode Number. The number must have 5 digit.",
    //   "Invalid mobile phone number. The number must have 10 digit.",
    //   ""
    // ];
    // let block = [
    //   "ชื่อ",
    //   "สกุล",
    //   "เลขทะเบียน",
    //   "ชั้นปีที่",
    //   "สาขาวิชา",
    //   "ชื่อนามสกุลอาจารย์ที่ปรึกษา",
    //   "เหตุผลการเพิ่มถอน",
    //   "บ้านเลขที่",
    //   "หมู่",
    //   "ตำบล",
    //   "อำเภอ",
    //   "จังหวัด",
    //   "รหัสไปรษณีย์",
    //   "เบอร์โทรศัพท์มือถือ",
    //   "เบอร์บ้าน"
    // ];
    //         console.log(block[index] , "is warn :",text);
    //         console.log("Required warn text :" ,warning[index], "\n");
    //         expect(text).toEqual(warning[index]);
    //       });
    //     });
    //   });
    // });
    it('should pull data',async function(){
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:8080/');
      element(by.id("studentTitle")).click().then(()=>{
        
        element(by.css("#studentTitle > option:nth-child(1)")).click();
      });

      element(by.id("studentFirstName")).sendKeys("วรชาติ");
      element(by.id("studentLastName")).sendKeys("ติวงศ์");
      element(by.id("studentId")).sendKeys("6501234567201254");
      element(by.id("studentYear")).sendKeys("2");
      element(by.id("studyField")).sendKeys("วิทยาการคอมพิวเตอร์");
      element(by.id("addressNumber")).sendKeys("126/4");
      element(by.id("moo")).sendKeys("10");
      element(by.id("tumbol")).sendKeys("หนองปรือ");
      element(by.id("amphur")).sendKeys("บางละมุง");
      element(by.id("province")).sendKeys("ชลบุรี");
      element(by.id("postalCode")).sendKeys("20150");
      element(by.id("mobilePhone")).sendKeys("0888888888");
      element(by.id("phone")).sendKeys("0333333333");
      element(by.id("advisorName")).sendKeys("อ.ทรงศักดิ์");
      let addbutton = element(by.id("add-course"));
      await browser.executeScript("arguments[0].scrollIntoView(true);", addbutton.getWebElement());
      browser.sleep(800); //important do not delete or it go kaboom
     
        await addbutton.click().then(function(){
          element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("CS213"); //subjcode
        element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("Data structure"); //subjname
        element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("650008"); //subjsection
        element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("จ, ศ 9.30-11.00"); //subjdate
        element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("3"); // subjcredit
        element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(6) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("อ.ฐาปนา"); //subjteacher
        element(by.css(`div.course-field:nth-child(${2}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(7) > div:nth-child(1) > input:nth-child(1)`)).click();
        });
       
        element(by.id("cause")).sendKeys("credit ไม่ถึง");
        let sendbutton = element(by.css("button.btn:nth-child(14)"));
        await browser.executeScript("arguments[0].scrollIntoView(true);", sendbutton.getWebElement());
        browser.sleep(800);
        await sendbutton.click();
        browser.sleep(100);
        element(by.xpath('/html/body/div/form/div[2]/div[1]/div[2]')).getText().then((text)=>{
          expect(text).toEqual("Invalid student ID format. It must be 10 digits.");}
      )
    });

   
    
    // it('should pass',async function(){
    //   browser.ignoreSynchronization = true;
    //   browser.get('http://localhost:8080/');
    //   await element(by.id('studentTitle')).click().then(function(){
    //     let select = element(by.cssContainingText('option', 'นางสาว'));
    //     select.click();
    //   });
      // element(by.id("studentFirstName")).sendKeys("Nataya");
      // element(by.id("studentLastName")).sendKeys("Maimee");
      // element(by.id("studentId")).sendKeys("6969696969");
      // element(by.id("studentYear")).sendKeys("1");
      // element(by.id("studyField")).sendKeys("CS");
      // element(by.id("advisorName")).sendKeys("Pornpan");
      // element(by.id("cause")).sendKeys("Yes");
      // element(by.id("addressNumber")).sendKeys("112/114");
      // element(by.id("moo")).sendKeys("1");
      // element(by.id("tumbol")).sendKeys("Kum");
      // element(by.id("amphur")).sendKeys("Takum");
      // element(by.id("province")).sendKeys("Kumkum");
      // element(by.id("postalCode")).sendKeys("69420");
      // element(by.id("mobilePhone")).sendKeys("0969696969");
      // element(by.id("phone")).sendKeys("026969696");

    //   let addsubjlist = ['AB001', 'EF002', 'IJ003', 'MN004', 'QR005', 'UV006', 'YZ007', 'CD008', 'GH009', 'KL010'];
    //   let addsubjectNamesList = [
    //     "Mathematics",
    //     "Physics",
    //     "Chemistry",
    //     "Biology",
    //     "English Literature",
    //     "History",
    //     "Computer Science",
    //     "Economics",
    //     "Psychology",
    //     "Sociology"
    //   ];
    //   let addsectionCodesList = [
    //     '1234567',
    //     '2345678',
    //     '3456789',
    //     '4567890',
    //     '5678901',
    //     '6789012',
    //     '7890123',
    //     '8901234',
    //     '9012345',
    //     '6969420'
    //   ];
    //   let addsubjDateList = [
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday",
    //     "Thursday",
    //     "Friday",
    //     "Saturday",
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday",
    //     "Thursday"
    //   ];
    //   let addSubjTeacherList = [
    //     "Liam",
    //     "Olivia",
    //     "Noah",
    //     "Emma",
    //     "William",
    //     "Ava",
    //     "James",
    //     "Isabella",
    //     "Oliver",
    //     "Sophia"
    //   ];
    //   let withdrawsubjectCodeList = [
    //     "AB123",
    //     "CD456",
    //     "EF789",
    //     "GH012",
    //     "IJ345",
    //     "KL678",
    //     "MN901",
    //     "OP234",
    //     "QR567",
    //     "ST890"
    //   ];
    //   let withdrawsubjectnameList = [
    //     "Computer Science 2",
    //     "Biology 2",
    //     "Physics 2",
    //     "Literature 2",
    //     "Mathematics 2",
    //     "Chemistry 2",
    //     "History 2",
    //     "Economics 2",
    //     "Psychology 2",
    //     "Sociology 2"
    //   ];
    //   let withdrawsectionCodesList = [
    //     '7654321',
    //     '8765432',
    //     '9876543',
    //     '0987654',
    //     '1098765',
    //     '2109876',
    //     '3210987',
    //     '4321098',
    //     '5432109',
    //     '4206969'
    //   ];
    //   let withdrawsubjDateList = [
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday",
    //     "Thursday",
    //     "Friday",
    //     "Saturday",
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday",
    //     "Thursday"
    //   ];
    //   let withdrawSubjTeacherList = [
    //     "Ethan",
    //     "Mia",
    //     "Lucas",
    //     "Charlotte",
    //     "Benjamin",
    //     "Amelia",
    //     "Alexander",
    //     "Harper",
    //     "Mason",
    //     "Evelyn"
    //   ];

      // let addbutton = element(by.id("add-course"));
      // await browser.executeScript("arguments[0].scrollIntoView(true);", addbutton.getWebElement());
      // browser.sleep(800); //important do not delete or it go kaboom
      // for(let i = 0 ; i < 10 ; i++){
      //   await addbutton.click();
      // }
      // for(let i = 1 ; i <= 10 ; i++){
      //     element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(addsubjlist[i-1]);
      //     element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(addsubjectNamesList[i-1]);
      //     element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(addsectionCodesList[i-1]);
      //     element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(addsubjDateList[i-1]);
      //     element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("3");
      //     element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(6) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(addSubjTeacherList[i-1]);
        
      // }
    //   let wdbutton = element(by.id("withdraw-course"));
    //   await browser.executeScript("arguments[0].scrollIntoView(true);", wdbutton.getWebElement());
    //   browser.sleep(800);
    //   for(let i = 0 ; i < 10 ; i++){
    //     await wdbutton.click();
    //   }
    //   for(let i = 1 ; i <= 10 ; i++){
    //       element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(withdrawsubjectCodeList[i-1]);
    //       element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(withdrawsubjectnameList[i-1]);
    //       element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(withdrawsectionCodesList[i-1]);
    //       element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(withdrawsubjDateList[i-1]);
    //       element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("3");
    //       element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(6) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(withdrawSubjTeacherList[i-1]);
    //   }
      // let sendbutton = element(by.css("button.btn:nth-child(14)"));
      // await browser.executeScript("arguments[0].scrollIntoView(true);", sendbutton.getWebElement());
      // browser.sleep(800);
      // sendbutton.click();
    //   browser.sleep(1500);
    // });
    // it('should check format',async function(){
    //   browser.ignoreSynchronization = true;
    //   browser.get('http://localhost:8080/');
    //   await element(by.id("studentId")).sendKeys("111was1111");
    //   let submit = await element(by.css("button.btn:nth-child(14)"));
      // await browser.executeScript("arguments[0].scrollIntoView(true);", submit.getWebElement()); // don't delete!!
      // browser.sleep(800);
      // await submit.click();
      // var alertDialog = browser.switchTo().alert();

      // // Get the text of the prompt dialog
      // alertDialog.getText().then(function(alertText) {
      //   // Assert or perform actions based on the text of the prompt dialog
      //   expect(alertText).toEqual('กรุณากรอกข้อมูลเพิ่ม / ถอน อย่างน้อย 1 รายการ');
      // });
      // alertDialog.accept();
    //   await element(by.xpath("/html/body/div/form/div[2]/div[1]/div[2]")).getText().then(function(warnText){
    //     expect(warnText).toEqual("Invalid student ID format. It must be 10 digits.");
    //   });
    // });
  });
  