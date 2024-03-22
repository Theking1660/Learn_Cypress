///<reference types="Cypress"/>



//Suite de Casos que contiene cada caso
describe('Primer conjunto de caso de pruebas', () => {

  beforeEach(() => {
    cy.visit('http://automationpractice.pl/index.php');

  })
  // Caso de prueba 1
  it('Contabilizar la cantidad de elementos en la seccion de pagina principal', () => {
    //Paso 1
    cy.get('#home-page-tabs > li').contains('Best Sellers').click()
    cy.get('.product-container').should('have.length', 6)

    //Obtener elementos con homefeatured .product-container como un parametro
    cy.get('.product-container').as('ProductosVendidos');

    //usando el parametro
    cy.get('@ProductosVendidos').should('have.length', 6)

  })
  //caso de prueba 2
  it('Agregar el elemento tipo "blouse" al carrito de compras ', () => {
    cy.get('#home-page-tabs > li').contains('Best Sellers').click()
    cy.get('.product-container').as('ProductosVendidos');
    // iteramos para encontrar un producto con nombre x
    cy.get('@ProductosVendidos').find('.product-name')
      .each(($el, index, $list) => {
        cy.get('@ProductosVendidos').eq(index).find('.price').then(($el1) => {
          let precioBc = $el1.text()
          cy.log(precioBc)
          if ($el.attr('title') == 'Printed Summer Dress' && precioBc.includes('31')) {
            cy.log('Se ha encontrado el elemento buscado')
            cy.log('Se ha encontrado el precio buscado')
            cy.get('@ProductosVendidos').eq(index).contains('Add to cart').should('exist')

          }
        })
      })


  })
  // caso de pruebas 3
  it('Verificando que el dropdown de women, tenga los elementos necesarios', () => {
    cy.get('#block_top_menu > ul > li:nth-child(1) > ul ').invoke('attr', 'style', 'display:block');
    cy.get('[title="Tops"]').should('be.visible');
    cy.get('[title="T-shirts"]').should('be.visible');
    cy.get('[title="Blouses"]').should('be.visible');
    cy.get('[title="Dresses"]').should('be.visible');
    cy.get('[title^="Casual "]').should('be.visible');
    cy.get('[title^="Evening "]').should('be.visible');
    cy.get('[title^="Summer "]').should('be.visible');

  })

  //caso de prueba 4
  it('Verificando que los checkboxes estan funcionando', () => {
    cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click();

    cy.get('li[class="nomargin hiddable col-lg-12"]:has(a[href*="categories-casual"]) input').check().should('be.checked');
    cy.get('li[class="nomargin hiddable col-lg-12"]:has(a[href*="categories-evening"]) input').should('not.be.checked');
    cy.get('li[class="nomargin hiddable col-lg-12"]:has(a[href*="categories-summer"]) input').should('not.be.checked')
  })
  //caso de prueba 5
  it('Verificar que los drop down de arreglo esten funcionando', () => {
    cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click();
    cy.get('#selectProductSort').select('In stock').should('have.value', 'names:asc')
    })
  //caso de pruebva 6(Yo solo)
  it.only('Crear una compra desde cero', () => {
    cy.get('#search_query_top').type('Blouse');
    cy.get('#searchbox > button').click();
    cy.get('h5[itemprop="name"]>a').contains("Blouse").should('exist');
    cy.get('.ajax_block_product  .button-container').invoke('attr', 'style', 'display:block');
    cy.get('.button-container > a[title="View"]>span').click();
    cy.get('#color_8').click();
    cy.get('#add_to_cart> button>span').should('be.visible').click();
    cy.wait(1000);
    cy.get('.layer_cart_product >h2').contains('Product successfully added to your shopping cart').should('be.visible');
    cy.get('.button-medium').click();
    

  })
})