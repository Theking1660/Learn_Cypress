/// <reference types="cypress"/>


var dato;
// Suite de casos de pruebas avanzados
describe('Segundo conjunto de casos de pruebas avanzadas', () => {
  before(() => {
    //cargamos los valores del json.
    cy.fixture('example').then(function (datos) {
      dato = datos
    })
    
  })
  beforeEach(() => {
    //Ingresamos a la pagina de formularios
    cy.visit('https://demoqa.com').wait(500)
    cy.get('.category-cards > :nth-child(2)').click();
    cy.get(':nth-child(2) > .element-list > .menu-list > #item-0').click();

  })

  it('Llenamos nuestro primer formulario utilizando data', () => {

    cy.get('#firstName').type(dato.Nombre)
    cy.get('#lastName').type(dato.Apellido)
    cy.get('#userEmail').type(dato.Email)
    cy.get(`input[name = "gender"][value="${dato.Sexo}"]`).check({ force: true }).should('be.checked');
    cy.get('#userNumber').type(dato.Telefono)
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').should('be.visible').select(dato.Nacimiento[0])
    cy.get('.react-datepicker__year-select').should('be.visible').select(dato.Nacimiento[1])
    cy.get(`.react-datepicker__day--0${dato.Nacimiento[2]}`).click();
    cy.get('#dateOfBirthInput').should('contain.value', dato.Nacimiento[0].substring(0, 3))
      .should('contain.value', dato.Nacimiento[1])
      .should('contain.value', dato.Nacimiento[2])

    cy.get('.subjects-auto-complete__value-container').type(dato.Materias)
    cy.get('div[id^="react-select"]').should('contain.text', dato.Materias).click()
    cy.get('.subjects-auto-complete__value-container').type("maths")
    cy.get('div[id^="react-select"]').should('contain.text', 'Maths').click();
    cy.get(`div[class="custom-control custom-checkbox custom-control-inline"]:has(label:contains("${dato.Hobbies[0]}")) input`).check({ force: true }).should('be.checked')
    cy.get(`div[class="custom-control custom-checkbox custom-control-inline"]:has(label:contains("${dato.Hobbies[1]}")) input`).check({ force: true }).should('be.checked')
    /*cy.get('#uploadPicture').then(($el) => {
      //convertir la imagen en un string de base64
      const blob = Cypress.Blob.base64StringToBlob(Image,'image/jpg')
      const file = new File([blob],"images/logo.jpg",{type:'image/jpg'})
      const list = new DataTransfer()
      list.items.add(file)
      const myFileList = list.files

      $el[0].files=myFileList
      $el[0].dispatchEvent(new Event('change',{bubbles: true}))

    })*/
  })



})