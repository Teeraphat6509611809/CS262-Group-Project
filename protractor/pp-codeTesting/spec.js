// spec.js
describe('Protractor Demo App',  function() {
    it('should have a title',  function() {
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:5500/');
      expect(browser.getTitle()).toEqual('Student Registeration Form');
    });
    
    it('should pass',async function(){
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:5500/');
      await element(by.id('studentTitle')).click().then(function(){
        let select = element(by.cssContainingText('option', 'นางสาว'));
        select.click();
      });
      element(by.id("studentFirstName")).sendKeys("Nataya");
      element(by.id("studentLastName")).sendKeys("Maimee");
      element(by.id("studentId")).sendKeys("6969696969");
      element(by.id("studentYear")).sendKeys("1");
      element(by.id("studyField")).sendKeys("CS");
      element(by.id("advisorName")).sendKeys("Pornpan");
      element(by.id("cause")).sendKeys("Yes");
      element(by.id("addressNumber")).sendKeys("112/114");
      element(by.id("moo")).sendKeys("1");
      element(by.id("tumbol")).sendKeys("Kum");
      element(by.id("amphur")).sendKeys("Takum");
      element(by.id("province")).sendKeys("Kumkum");
      element(by.id("postalCode")).sendKeys("69420");
      element(by.id("mobilePhone")).sendKeys("0969696969");
      element(by.id("phone")).sendKeys("026969696");

      let addsubjlist = ['AB001', 'EF002', 'IJ003', 'MN004', 'QR005', 'UV006', 'YZ007', 'CD008', 'GH009', 'KL010'];
      let addsubjectNamesList = [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English Literature",
        "History",
        "Computer Science",
        "Economics",
        "Psychology",
        "Sociology"
      ];
      let addsectionCodesList = [
        '1234567',
        '2345678',
        '3456789',
        '4567890',
        '5678901',
        '6789012',
        '7890123',
        '8901234',
        '9012345',
        '6969420'
      ];
      let addsubjDateList = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ];
      let addSubjTeacherList = [
        "Liam",
        "Olivia",
        "Noah",
        "Emma",
        "William",
        "Ava",
        "James",
        "Isabella",
        "Oliver",
        "Sophia"
      ];
      let withdrawsubjectCodeList = [
        "AB123",
        "CD456",
        "EF789",
        "GH012",
        "IJ345",
        "KL678",
        "MN901",
        "OP234",
        "QR567",
        "ST890"
      ];
      let withdrawsubjectnameList = [
        "Computer Science 2",
        "Biology 2",
        "Physics 2",
        "Literature 2",
        "Mathematics 2",
        "Chemistry 2",
        "History 2",
        "Economics 2",
        "Psychology 2",
        "Sociology 2"
      ];
      let withdrawsectionCodesList = [
        '7654321',
        '8765432',
        '9876543',
        '0987654',
        '1098765',
        '2109876',
        '3210987',
        '4321098',
        '5432109',
        '4206969'
      ];
      let withdrawsubjDateList = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ];
      let withdrawSubjTeacherList = [
        "Ethan",
        "Mia",
        "Lucas",
        "Charlotte",
        "Benjamin",
        "Amelia",
        "Alexander",
        "Harper",
        "Mason",
        "Evelyn"
      ];

      let addbutton = element(by.id("add-course"));
      await browser.executeScript("arguments[0].scrollIntoView(true);", addbutton.getWebElement());
      browser.sleep(800); //important do not delete or it go kaboom
      for(let i = 0 ; i < 10 ; i++){
        await addbutton.click();
      }
      for(let i = 1 ; i <= 10 ; i++){
          element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(addsubjlist[i-1]);
          element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(addsubjectNamesList[i-1]);
          element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(addsectionCodesList[i-1]);
          element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(addsubjDateList[i-1]);
          element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("3");
          element(by.css(`div.course-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(6) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(addSubjTeacherList[i-1]);
        
      }
      let wdbutton = element(by.id("withdraw-course"));
      await browser.executeScript("arguments[0].scrollIntoView(true);", wdbutton.getWebElement());
      browser.sleep(800);
      for(let i = 0 ; i < 10 ; i++){
        await wdbutton.click();
      }
      for(let i = 1 ; i <= 10 ; i++){
          element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(withdrawsubjectCodeList[i-1]);
          element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(withdrawsubjectnameList[i-1]);
          element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(withdrawsectionCodesList[i-1]);
          element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(withdrawsubjDateList[i-1]);
          element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > input:nth-child(2)`)).sendKeys("3");
          element(by.css(`div.withdraw-field:nth-child(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(6) > div:nth-child(1) > input:nth-child(2)`)).sendKeys(withdrawSubjTeacherList[i-1]);
      }
      let sendbutton = element(by.css("button.btn:nth-child(14)"));
      await browser.executeScript("arguments[0].scrollIntoView(true);", sendbutton.getWebElement());
      browser.sleep(800);
      sendbutton.click();
      browser.sleep(1500);
    });
    it('should check format',async function(){
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:5500/');
      await element(by.id("studentId")).sendKeys("111was1111");
      let submit = await element(by.css("button.btn:nth-child(14)"));
      await browser.executeScript("arguments[0].scrollIntoView(true);", submit.getWebElement()); // don't delete!!
      browser.sleep(800);
      await submit.click();
      var alertDialog = browser.switchTo().alert();

      // Get the text of the prompt dialog
      alertDialog.getText().then(function(alertText) {
        // Assert or perform actions based on the text of the prompt dialog
        expect(alertText).toEqual('กรุณากรอกข้อมูลเพิ่ม / ถอน อย่างน้อย 1 รายการ');
      });
      alertDialog.accept();
      await element(by.xpath("/html/body/div/form/div[2]/div[1]/div[2]")).getText().then(function(warnText){
        expect(warnText).toEqual("Invalid student ID format. It must be 10 digits.");
      });
    });
  });
  