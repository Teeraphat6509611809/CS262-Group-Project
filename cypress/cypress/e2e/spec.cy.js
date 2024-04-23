describe('Localhost Website Test', () => {
  it('Visits the homepage', () => {
      cy.visit('http://localhost:8080'); // Replace with your localhost URL
      cy.title().should('include', 'คำร้องเพิ่ม-ถอน รายวิชา'); // Replace with the expected page title
  });
  it('TC-001', ()=>{
      cy.visit('http://localhost:8080'); // Replace with your localhost URL
      cy.get('#date').type('01/09/2001');
      cy.get('#studentTitle').select('Mr');
      cy.get('#studentFirstName').type('วรชาติ');
      cy.get('#studentLastName').type('ติวงค์');
      cy.get('#studentId').type('6501234567');
      cy.get('#studentYear').type('2');
      cy.get('#studyField').type('วิทยาการคอมพิวเตอร์');
      cy.get('#addressNumber').type('126/4');
      cy.get('#moo').type('10');
      cy.get('#tumbol').type('หนองปรือ');
      cy.get('#amphur').type('บางละมุง');
      cy.get('#province').type('ชลบุรี');
      cy.get('#postalCode').type('20150');
      cy.get('#mobilePhone').type('0888888888');
      cy.get('#phone').type('0333333333'); 
      cy.get('#advisor').type('อ.ทรงศักดิ์');
      cy.get("#add-course").click().then(()=>{
        cy.get(`#AddsubjectCode1`).type("CS213");
        cy.get(`#AddsubjectName1`).type("Data structure");
        cy.get(`#AddsubjectSection1`).type("650008");
        cy.get(`#AddsubjectDate1`).type("จ,ศ 9.30-11.00");
        cy.get(`#AddsubjectCredit1`).type("3");
        cy.get(`#AddsubjectTeacher1`).type("อ.ฐาปนา");
        cy.get(`#AddsubjectTeacherCheck1`).click();
        
      });
      cy.get('#cause').type('credit ไม่ถึง');
      cy.get('#submit').click();
      cy.wait(500);
      cy.on('window:alert', (str) => {
        expect(str).to.equal("บันทึกรายวิชาสำเร็จ");
        cy.on('window:confirm',() => true);
      });
      cy.get('h1').invoke('text').then((text)=>{
        cy.wait(10000);
        expect(text).to.equal("บันทึกสำเร็จ");
      });
      const param = {
        studentId : "6501234567"
      }
      cy.request({
        method :'GET',
        url :'http://localhost:8080/api/students/id',
        qs : param }).then((response) => {
       
        expect(response.status).to.equal(200);
  
  
        const fetchedData = response.body;
          const std = fetchedData[0];
          expect(std.studentId).to.equal("6501234567");
          
        });
        
        cy.request({
          method:'DELETE',
          url : 'http://localhost:8080/api/students/delete',
          qs : param
        })
        // Assert that the fetched data matches the expected data
        //expect(fetchedData).to.deep.equal(expectedData);
      });
      
    });    

  // it('should fetch data',()=>{
  //   const param = {
  //     studentId : "1234567890"
  //   }
  //   cy.request({
  //     method :'GET',
  //     url :'http://localhost:8080/api/students/id',
  //   qs : param }).then((response) => {
     
  //     expect(response.status).to.equal(200);


  //     const fetchedData = response.body;

  //     const expectedData = [
     
  //     ];
  //     fetchedData.forEach((data)=>{
  //       cy.log(JSON.stringify(data));
  //     });
      
  //     // Assert that the fetched data matches the expected data
  //     //expect(fetchedData).to.deep.equal(expectedData);
  //   });
  // });
//   it('should pass', ()=>{
//     cy.visit('http://localhost:8080');
//     cy.get('#date').type('23/07/2023');
// cy.get('#studentFirstName').type('kkk');
// cy.get('#studentLastName').type('kk');
// cy.get('#studentId').type('1234567890');
// cy.get('#studentYear').type('1');
// cy.get('#studyField').type('cs');
// cy.get('#advisor').type('lol');
// cy.get('#mobilePhone').type('0987654321');
// cy.get('#phone').type('1234567890');
// cy.get('#addressNumber').type('69/69');
// cy.get('#moo').type('69');
// cy.get('#tumbol').type('บ้านคำ');
// cy.get('#amphur').type('ตะคำ');
// cy.get('#province').type('คำคำ');
// cy.get('#postalCode').type('11111');
// cy.get('#cause').type('lmao');
// let addsubjlist = ['AB001', 'EF002', 'IJ003', 'MN004', 'QR005', 'UV006', 'YZ007', 'CD008', 'GH009', 'KL010'];
// let addsubjectNamesList = [
//   "Mathematics",
//   "Physics",
//   "Chemistry",
//   "Biology",
//   "English Literature",
//   "History",
//   "Computer Science",
//   "Economics",
//   "Psychology",
//   "Sociology"
// ];
// let addsectionCodesList = [
//   '123456',
//   '234567',
//   '345678',
//   '456789',
//   '567890',
//   '678901',
//   '789012',
//   '890123',
//   '901234',
//   '696942'
// ];
// let addsubjDateList = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday"
// ];
// let addSubjTeacherList = [
//   "Liam",
//   "Olivia",
//   "Noah",
//   "Emma",
//   "William",
//   "Ava",
//   "James",
//   "Isabella",
//   "Oliver",
//   "Sophia"
// ];
// for(let i = 1 ; i <= 10 ; i++){
//   cy.get('#add-course').click();
// }
// for (let i = 1; i <= 10; i++) {
  // cy.get(`#AddsubjectCode${i}`).type(addsubjlist[i - 1]);
  // cy.get(`#AddsubjectName${i}`).type(addsubjectNamesList[i - 1]);
  // cy.get(`#AddsubjectSection${i}`).type(addsectionCodesList[i - 1]);
  // cy.get(`#AddsubjectDate${i}`).type(addsubjDateList[i - 1]);
  // cy.get(`#AddsubjectCredit${i}`).type("3");
  // cy.get(`#AddsubjectTeacher${i}`).type(addSubjTeacherList[i - 1]);
  // if (Math.random() > 0.5) {
  //   cy.get(`#AddsubjectTeacherCheck${i}`).click();
  // }
// }
// cy.wait(1000); // Wait for 1000 milliseconds (1 second)

// cy.get('#submit').click(); // Click the element with the ID "submit"

//   });
  
// });
