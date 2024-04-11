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
      await element(by.id("add-course")).click().then(function(){
        element(by.id("AddsubjectCode1")).sendKeys("SC301");
        element(by.id("AddsubjectName1")).sendKeys("Better Life");
        element(by.id("AddsubjectSection1")).sendKeys("810001");
        element(by.id("AddsubjectDate1")).sendKeys("Mo.");
        element(by.id("AddsubjectCredit1")).sendKeys("3");
        element(by.id("AddsubjectTeacher1")).sendKeys("Better Teaching");
      });
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
  