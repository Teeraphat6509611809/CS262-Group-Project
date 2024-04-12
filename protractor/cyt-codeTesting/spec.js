// spec.js
describe('Protractor Demo App',  function() {
    it('should have a title',   function() {
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:5500/');
      expect(browser.getTitle()).toEqual('คำร้องเพิ่ม-ถอน รายวิชา');
    });
    it('should warn after add more than 10 subjects (Exclusion)' , async function(){
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:5500/');
      for(let i = 0 ; i < 10 ; i++){
        await element(by.id("add-course")).click();
      }
      var EC = protractor.ExpectedConditions;
    
     await element(by.id("withdraw-course")).click();
      browser.wait(EC.not(EC.alertIsPresent()), 1500, "it's not excluding limit of withdraw course from add course"); // should not alert at 10 add and 1 withdraw
      await element(by.id("add-course")).click();
      var alertDialog = browser.switchTo().alert();
      alertDialog.getText().then(function(alertText) {
        // Assert or perform actions based on the text of the prompt dialog
        expect(alertText).toEqual('สามารถใส่ได้ 10 วิชาเท่านั้น');
      });
      alertDialog.accept();

      for(let i = 0 ; i < 9 ; i++){
        await element(by.id("withdraw-course")).click();
      }
      await element(by.id("withdraw-course")).click();
      alertDialog.getText().then(function(alertText) {
        // Assert or perform actions based on the text of the prompt dialog
        expect(alertText).toEqual('สามารถใส่ได้ 10 วิชาเท่านั้น');
      });
      alertDialog.accept();
    });

    it('should alert after submit incomplete form',async function(){
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:5500/');
      await element(by.id("studentFirstName")).sendKeys("Songsak");
      await element(by.id("submit")).click();
      var EC = protractor.ExpectedConditions;
      browser.wait(EC.alertIsPresent(), 10000, "alert time out");
      var alertDialog = browser.switchTo().alert();
      alertDialog.getText().then(function(alertText) {
        expect(alertText).toEqual('บันทึกรายวิชาไม่สำเร็จ');
      });
      alertDialog.accept();
    });
    it('should pass after everything ok',async function(){
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:5500/');
      element(by.id("date")).sendKeys("12/3/69");
      element(by.id("studentFirstName")).sendKeys("kkk");
      element(by.id("studentLastName")).sendKeys("kk");
      element(by.id("studentId")).sendKeys("1234567890");
      element(by.id("studentYear")).sendKeys("1");
      element(by.id("studyField")).sendKeys("cs");
      element(by.id("advisor")).sendKeys("lol");
      element(by.id("mobilePhone")).sendKeys("0987654321");
      element(by.id("phone")).sendKeys("0211111111");
      element(by.id("addressNumber")).sendKeys("69/69");
      element(by.id("moo")).sendKeys("69");
      element(by.id("tumbol")).sendKeys("บ้านคำ");
      element(by.id("amphur")).sendKeys("ตะคำ");
      element(by.id("province")).sendKeys("คำคำ");
      element(by.id("postalCode")).sendKeys("11111");
      element(by.id("cause")).sendKeys("lmao");
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
      for(let i = 1 ; i <= 10 ; i++){
        await element(by.id("add-course")).click().then(function(){
        element(by.id(`AddsubjectCode${i}`)).sendKeys(addsubjlist[i-1]);
        element(by.id(`AddsubjectName${i}`)).sendKeys(addsubjectNamesList[i-1]);
        element(by.id(`AddsubjectSection${i}`)).sendKeys(addsectionCodesList[i-1]);
        element(by.id(`AddsubjectDate${i}`)).sendKeys(addsubjDateList[i-1]);
        element(by.id(`AddsubjectCredit${i}`)).sendKeys("3");
        element(by.id(`AddsubjectTeacher${i}`)).sendKeys(addSubjTeacherList[i-1]);
        let check = Math.random() > 0.5;
        if(check){
          element(by.id(`AddsubjectTeacherCheck${i}`)).click();
        }
      });
      }
      
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
      for(let i = 1 ; i <= 10 ; i++){
        await element(by.id("withdraw-course")).click().then(function(){
        element(by.id(`WithdrawsubjectCode${i}`)).sendKeys(withdrawsubjectCodeList[i-1]);
        element(by.id(`WithdrawsubjectName${i}`)).sendKeys(withdrawsubjectnameList[i-1]);
        element(by.id(`WithdrawsubjectSection${i}`)).sendKeys(withdrawsectionCodesList[i-1]);
        element(by.id(`WithdrawsubjectDate${i}`)).sendKeys(withdrawsubjDateList[i-1]);
        element(by.id(`WithdrawsubjectCredit${i}`)).sendKeys("3");
        element(by.id(`WithdrawsubjectTeacher${i}`)).sendKeys(withdrawSubjTeacherList[i-1]);
        let check = Math.random() > 0.5;
        if(check){
          element(by.id(`WithdrawsubjectTeacherCheck${i}`)).click();
        }
        
      });
      }
      browser.sleep(10000);
      await element(by.id("submit")).click();
      browser.sleep(2000);
      element(by.css("body > h1:nth-child(1)")).getText().then(function(Text){
        expect(Text).toEqual("บันทึกสำเร็จ");
      });
    });
    it('should exist 2nd add subj after delete and create one',async function(){
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:5500/');
      for(let i = 0 ; i < 3 ; i++){
        await element(by.id("add-course")).click();
      }
      await element(by.xpath("/html/body/form/div[5]/div/div[2]/div/button")).click();
      await element(by.id("add-course")).click();
      element(by.id("AddsubjectCode2")).isPresent().then(function(present){
        expect(present).toBe(true);
      });
    });
    it('should response alert after sending unfinised form in 1 second',async function(){
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:5500/');
      await element(by.id("studentFirstName")).sendKeys("Songsak");
      await element(by.id("submit")).click();
      var EC = protractor.ExpectedConditions;
      browser.wait(EC.alertIsPresent(), 1000, "alert time out");
      var alertDialog = browser.switchTo().alert();
      alertDialog.getText().then(function(alertText) {
        expect(alertText).toEqual('บันทึกรายวิชาไม่สำเร็จ');
      });
      alertDialog.accept();
    });


  });
  