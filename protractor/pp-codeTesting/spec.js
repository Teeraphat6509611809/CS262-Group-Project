// spec.js
describe('Protractor Demo App',  function() {
    it('should have a title',  function() {
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:5500/');
      expect(browser.getTitle()).toEqual('Student Registeration Form');
    });
    it('should check format',async function(){
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:5500/');
      await element(by.id("studentId")).sendKeys("111was1111");
      let submit = await element(by.xpath("/html/body/div/form/button"));
      await browser.executeScript('window.scrollTo(0, document.body.scrollHeight);'); // don't delete!!
      browser.sleep(1500);
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


    // it('test calculate 20+105 = 125',async function(){
    //   browser.get('http://juliemr.github.io/protractor-demo');
    //   var size;
    //   await element.all(by.css('body > div > table')).count().then(function(count){
    //     size = count-1;
    //   });

    //     element(by.model('first')).sendKeys('20');
    //     element(by.model('second')).sendKeys('105');
    //     element(by.id('gobutton')).click();
    //     browser.sleep(3500);
       
    //     let result ; 
    //     element(by.tagName('h2')).getText().then(function(text) { 
    //         result = text ;
    //         console.log('Result of Expression (20 + 105):' + text); 
    //         expect(result).toEqual('125');
    //     });
      
    //    let asize;
    //    await element.all(by.css('body > div > table')).count().then(function(count){
    //     asize = count;
    //     console.log("size after process is" , asize);
    //     expect(asize).toEqual(size+1);
    //   });

      
    // });
  });
  