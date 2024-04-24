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
   
    it('should have a title',  function() {
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:8080/');
      expect(browser.getTitle()).toEqual('Student Registeration Form');
    });

    it('should pull data',async function(){
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:8080/');
      element(by.id("studentTitle")).click().then(()=>{
        
        element(by.css("#studentTitle > option:nth-child(1)")).click();
      });

      element(by.id("studentFirstName")).sendKeys("วรชาติ");
      element(by.id("studentLastName")).sendKeys("ติวงศ์");
      element(by.id("studentId")).sendKeys("6501234567");
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
        const std = await fetchDataFromDatabase('SELECT * FROM student WHERE studentId = 6501234567');
        console.log(std[0]);
        const uid = std[0].UUID;
        const subj = await fetchDataFromDatabase('SELECT * FROM subject WHERE UUID = ? AND subjectCode = ?', [uid, 'CS213']);
        expect(std[0].studentId).toEqual("6501234567");
        console.log(subj);
        expect(subj[0].subjectCode).toEqual("CS213");
      await connection.query(`DELETE FROM student`);
      await connection.query(`DELETE FROM subject`);

    });
    it('should warn after input nothing',async function(){
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:8080/');
      let sendbutton = element(by.css("button.btn:nth-child(14)"));
        await browser.executeScript("arguments[0].scrollIntoView(true);", sendbutton.getWebElement());
        browser.sleep(800);
        await sendbutton.click();
        browser.sleep(100);
      
      // Get the text of the prompt dialog
      var alertDialog = browser.switchTo().alert();
      await alertDialog.getText().then(function(alertText) {
        // Assert or perform actions based on the text of the prompt dialog
        expect(alertText).toEqual('กรุณากรอกข้อมูลเพิ่ม / ถอน อย่างน้อย 1 รายการ');
        alertDialog.accept();
      });
      var elements = element.all(by.className('invalid-feedback'));

      await elements.then(function(arr) {
        warning = arr;
        // Now 'arr' is an array of ElementFinders.
        arr.forEach(function(elm,index) {
          // Do something with each element
          elm.getText().then(function(text) {
            let warning = ["This field is required.",
      "This field is required.",
      "Invalid student ID format. It must be 10 digits.",
      "Invalid student year. It must be between 1 and 7.",
      "This field is required.",
      "This field is required.",
      "This field is required.",
      "This field is required.",
      "This field is required.",
      "This field is required.",
      "This field is required.",
      "This field is required.",
      "Invalid Postcode Number. The number must have 5 digit.",
      "Invalid mobile phone number. The number must have 10 digit.",
      ""
    ];
    let block = [
      "ชื่อ",
      "สกุล",
      "เลขทะเบียน",
      "ชั้นปีที่",
      "สาขาวิชา",
      "ชื่อนามสกุลอาจารย์ที่ปรึกษา",
      "เหตุผลการเพิ่มถอน",
      "บ้านเลขที่",
      "หมู่",
      "ตำบล",
      "อำเภอ",
      "จังหวัด",
      "รหัสไปรษณีย์",
      "เบอร์โทรศัพท์มือถือ",
      "เบอร์บ้าน"
    ];
            console.log(block[index] , "is warn :",text);
            console.log("Required warn text :" ,warning[index], "\n");
            expect(text).toEqual(warning[index]);
          });
        });
      });
    });
    it('should warn studentId',async function(){
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
  it('should warn year > 7', async () => {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8080/');
    element(by.id("studentTitle")).click().then(()=>{
      
      element(by.css("#studentTitle > option:nth-child(1)")).click();
    });
    element(by.id("studentFirstName")).sendKeys("วรชาติ");
    element(by.id("studentLastName")).sendKeys("ติวงศ์");
    element(by.id("studentId")).sendKeys("6501234567");
    element(by.id("studentYear")).sendKeys("10");
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
      element(by.css('div.row:nth-child(2) > div:nth-child(2) > div:nth-child(4)')).getText().then((text)=>{
        expect(text).toEqual("Invalid student year. It must be between 1 and 7.");}
    )
  });

  it('should warn postalcode wrong format', async () => {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8080/');
    element(by.id("studentTitle")).click().then(()=>{
      
      element(by.css("#studentTitle > option:nth-child(1)")).click();
    });
    element(by.id("studentFirstName")).sendKeys("วรชาติ");
    element(by.id("studentLastName")).sendKeys("ติวงศ์");
    element(by.id("studentId")).sendKeys("6501234567");
    element(by.id("studentYear")).sendKeys("10");
    element(by.id("studyField")).sendKeys("วิทยาการคอมพิวเตอร์");
    element(by.id("addressNumber")).sendKeys("126/4");
    element(by.id("moo")).sendKeys("7");
    element(by.id("tumbol")).sendKeys("หนองปรือ");
    element(by.id("amphur")).sendKeys("บางละมุง");
    element(by.id("province")).sendKeys("ชลบุรี");
    element(by.id("postalCode")).sendKeys("201505");
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
      element(by.css('div.form-group:nth-child(6) > div:nth-child(4)')).getText().then((text)=>{
        expect(text).toEqual("Invalid Postcode Number. The number must have 5 digit.");}
    )
  });

  it('should warn wrong mobile phone format', async () => {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8080/');
    element(by.id("studentTitle")).click().then(()=>{
      
      element(by.css("#studentTitle > option:nth-child(1)")).click();
    });
    element(by.id("studentFirstName")).sendKeys("วรชาติ");
    element(by.id("studentLastName")).sendKeys("ติวงศ์");
    element(by.id("studentId")).sendKeys("6501234567");
    element(by.id("studentYear")).sendKeys("2");
    element(by.id("studyField")).sendKeys("วิทยาการคอมพิวเตอร์");
    element(by.id("addressNumber")).sendKeys("126/4");
    element(by.id("moo")).sendKeys("10");
    element(by.id("tumbol")).sendKeys("หนองปรือ");
    element(by.id("amphur")).sendKeys("บางละมุง");
    element(by.id("province")).sendKeys("ชลบุรี");
    element(by.id("postalCode")).sendKeys("20150");
    element(by.id("mobilePhone")).sendKeys("08888888889");
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
      element(by.css('div.form-group:nth-child(7) > div:nth-child(4)')).getText().then((text)=>{
        expect(text).toEqual("Invalid mobile phone number. The number must have 10 digit.");}
    )
  });

  it('should warn phone number wrong format', async () => {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8080/');
    element(by.id("studentTitle")).click().then(()=>{
      
      element(by.css("#studentTitle > option:nth-child(1)")).click();
    });
    element(by.id("studentFirstName")).sendKeys("วรชาติ");
    element(by.id("studentLastName")).sendKeys("ติวงศ์");
    element(by.id("studentId")).sendKeys("6501234567");
    element(by.id("studentYear")).sendKeys("2");
    element(by.id("studyField")).sendKeys("วิทยาการคอมพิวเตอร์");
    element(by.id("addressNumber")).sendKeys("126/4");
    element(by.id("moo")).sendKeys("10");
    element(by.id("tumbol")).sendKeys("หนองปรือ");
    element(by.id("amphur")).sendKeys("บางละมุง");
    element(by.id("province")).sendKeys("ชลบุรี");
    element(by.id("postalCode")).sendKeys("20150");
    element(by.id("mobilePhone")).sendKeys("0888888888");
    element(by.id("phone")).sendKeys("03333333334");
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
      element(by.css('div.invalid-feedback:nth-child(3)')).getText().then((text)=>{
        expect(text).toEqual("Invalid phoneNumber. The number must have 10 digit.");}
    )
  });
  
  it('should warn after didn\'t add any course', async () => {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8080/');
    element(by.id("studentTitle")).click().then(()=>{
      
      element(by.css("#studentTitle > option:nth-child(1)")).click();
    });
    element(by.id("studentFirstName")).sendKeys("วรชาติ");
    element(by.id("studentLastName")).sendKeys("ติวงศ์");
    element(by.id("studentId")).sendKeys("6501234567");
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
      element(by.id("cause")).sendKeys("credit ไม่ถึง");
      let sendbutton = element(by.css("button.btn:nth-child(14)"));
      await browser.executeScript("arguments[0].scrollIntoView(true);", sendbutton.getWebElement());
      browser.sleep(800);
      await sendbutton.click();
      browser.sleep(100);
      var alertDialog = browser.switchTo().alert();
      await alertDialog.getText().then(function(alertText) {
        // Assert or perform actions based on the text of the prompt dialog
        expect(alertText).toEqual('กรุณากรอกข้อมูลเพิ่ม / ถอน อย่างน้อย 1 รายการ');
        alertDialog.accept();
      });
      
  });
  it('should warn after try to add more than 10 course', async () => {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8080/');
    element(by.id("studentTitle")).click().then(()=>{
      
      element(by.css("#studentTitle > option:nth-child(1)")).click();
    });
    element(by.id("studentFirstName")).sendKeys("วรชาติ");
    element(by.id("studentLastName")).sendKeys("ติวงศ์");
    element(by.id("studentId")).sendKeys("6501234567");
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
    element(by.id("cause")).sendKeys("credit ไม่ถึง");
    let addbutton = element(by.id("add-course"));
    await browser.executeScript("arguments[0].scrollIntoView(true);", addbutton.getWebElement());
    browser.sleep(800); //important do not delete or it go kaboom
    for(let i = 0 ; i < 10 ; i++){
      await addbutton.click();
    }
    addbutton.click().then(async ()=>{
      var alertDialog = browser.switchTo().alert();
      await alertDialog.getText().then(function(alertText) {
        // Assert or perform actions based on the text of the prompt dialog
        expect(alertText).toEqual('You can only add up to 10 courses.');
        alertDialog.accept();
      });
    });
    
  });
   
    
   
  });
  