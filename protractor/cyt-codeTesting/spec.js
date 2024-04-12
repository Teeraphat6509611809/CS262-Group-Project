// spec.js
describe('Protractor Demo App',  function() {
    // it('should have a title',   function() {
    //   browser.ignoreSynchronization = true;
    //   browser.get('http://localhost:5500/');
    //   expect(browser.getTitle()).toEqual('คำร้องเพิ่ม-ถอน รายวิชา');
    // });
    // it('should warn after add more than 10 subjects (Exclusion)' , async function(){
    //   browser.ignoreSynchronization = true;
    //   browser.get('http://localhost:5500/');
    //   for(let i = 0 ; i < 10 ; i++){
    //     await element(by.id("add-course")).click();
    //   }
    //   var EC = protractor.ExpectedConditions;
    
    //  await element(by.id("withdraw-course")).click();
    //   browser.wait(EC.not(EC.alertIsPresent()), 1500, "it's not excluding limit of withdraw course from add course"); // should not alert at 10 add and 1 withdraw
    //   await element(by.id("add-course")).click();
    //   var alertDialog = browser.switchTo().alert();
    //   alertDialog.getText().then(function(alertText) {
    //     // Assert or perform actions based on the text of the prompt dialog
    //     expect(alertText).toEqual('สามารถใส่ได้ 10 วิชาเท่านั้น');
    //   });
    //   alertDialog.accept();

    //   for(let i = 0 ; i < 9 ; i++){
    //     await element(by.id("withdraw-course")).click();
    //   }
    //   await element(by.id("withdraw-course")).click();
    //   alertDialog.getText().then(function(alertText) {
    //     // Assert or perform actions based on the text of the prompt dialog
    //     expect(alertText).toEqual('สามารถใส่ได้ 10 วิชาเท่านั้น');
    //   });
    //   alertDialog.accept();
    // });

    // it('should alert after submit incomplete form',async function(){
    //   browser.ignoreSynchronization = true;
    //   browser.get('http://localhost:5500/');
    //   await element(by.id("studentFirstName")).sendKeys("Songsak");
    //   await element(by.id("submit")).click();
    //   var EC = protractor.ExpectedConditions;
    //   browser.wait(EC.alertIsPresent(), 10000, "alert time out");
    //   var alertDialog = browser.switchTo().alert();
    //   alertDialog.getText().then(function(alertText) {
    //     expect(alertText).toEqual('บันทึกรายวิชาไม่สำเร็จ');
    //   });
    //   alertDialog.accept();
    // });
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
      let addsubjlist = ['ABCD01', 'EFGH02', 'IJKL03', 'MNOP04', 'QRST05', 'UVWX06', 'YZAB07', 'CDEF08', 'GHIJ09', 'KLMN10'];
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
        element(by.id("AddsubjectCode"+i)).sendKeys(addsubjlist[i-1]);
        element(by.id("AddsubjectName"+i)).sendKeys(addsubjectNamesList[i-1]);
        element(by.id("AddsubjectSection"+i)).sendKeys(addsectionCodesList[i-1]);
        element(by.id("AddsubjectDate"+i)).sendKeys(addsubjDateList[i-1]);
        element(by.id("AddsubjectCredit"+i)).sendKeys("3");
        element(by.id("AddsubjectTeacher"+i)).sendKeys(addSubjTeacherList[i-1]);
      });
      }
      
      await element(by.id("withdraw-course")).click().then(function(){
        element(by.id("WithdrawsubjectCode1")).sendKeys("CS368");
        element(by.id("WithdrawsubjectName1")).sendKeys("Good subj bad teacher");
        element(by.id("WithdrawsubjectSection1")).sendKeys("810001");
        element(by.id("WithdrawsubjectDate1")).sendKeys("Mo.");
        element(by.id("WithdrawsubjectCredit1")).sendKeys("3");
        element(by.id("WithdrawsubjectTeacher1")).sendKeys("WTF fuck off!");
      });
      await element(by.id("submit")).click();
      browser.sleep(2000);
      element(by.css("body > h1:nth-child(1)")).getText().then(function(Text){
        expect(Text).toEqual("บันทึกสำเร็จ");
      });
    });

  });
  