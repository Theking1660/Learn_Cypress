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
    cy.visit('https://demoqa.com/')
    cy.get('.category-cards > :nth-child(2)').click();
    cy.get(':nth-child(2) > .element-list > .menu-list > #item-0').click();
  })

  it('Llenamos nuestro primer formulario utilizando data', () => {
   cy.get('#firstName').type(dato.Nombre)
  })



})