'use strict'

const { v4: uuidv4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users;',
      { type: Sequelize.QueryTypes.SELECT }
    )

    if (users.length === 0) {
      throw new Error('No users found. Please seed users table first.')
    }

    const adminUserId = users[0].id
    const regularUserId = users.length > 1 ? users[1].id : users[0].id

    await queryInterface.bulkInsert('reports', [
      {
        id: uuidv4(),
        title: 'A Lenda da Loira do Banheiro',
        content: 'Conta-se que nos banheiros das escolas de São Paulo, uma mulher loira de vestido branco aparece quando alguém a chama três vezes em frente ao espelho. Muitos estudantes relatam ter visto sua figura fantasmagórica.',
        origin_location: 'São Paulo - Capital',
        created_by: adminUserId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        title: 'O Lobisomem de Araraquara',
        content: 'Nas noites de lua cheia, moradores da zona rural de Araraquara relatam ter visto uma criatura meio homem, meio lobo, uivando próximo às plantações de cana-de-açúcar.',
        origin_location: 'Araraquara',
        created_by: regularUserId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        title: 'A Mula Sem Cabeça de Ribeirão Preto',
        content: 'Dizem que uma mulher que teve um caso com um padre foi amaldiçoada e se transforma em uma mula que solta fogo pelas narinas todas as quintas-feiras à noite.',
        origin_location: 'Ribeirão Preto',
        created_by: adminUserId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        title: 'O Saci-Pererê do Interior',
        content: 'Nas fazendas do interior paulista, conta-se sobre um menino negro de uma perna só que fuma cachimbo e faz travessuras, escondendo objetos e assustando animais.',
        origin_location: 'São Carlos',
        created_by: regularUserId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        title: 'A Cuca de Campinas',
        content: 'Uma bruxa com cabeça de jacaré que rapta crianças desobedientes. Pais de Campinas contam essa história para fazer os filhos dormirem cedo.',
        origin_location: 'Campinas',
        created_by: adminUserId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        title: 'O Boitatá do Vale do Paraíba',
        content: 'Uma serpente de fogo que protege as matas e campos. Pescadores do Vale do Paraíba juram ter visto seus olhos brilhantes à noite, próximo aos rios.',
        origin_location: 'São José dos Campos',
        created_by: regularUserId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        title: 'A Pisadeira de Sorocaba',
        content: 'Uma velha de unhas compridas que pisa no peito de quem dorme de barriga cheia. Moradores de Sorocaba relatam paralisia do sono após jantares pesados.',
        origin_location: 'Sorocaba',
        created_by: adminUserId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        title: 'O Curupira de Bauru',
        content: 'Um protetor da floresta com pés virados para trás que confunde caçadores. Relatos de Bauru descrevem pegadas misteriosas que levam ao sentido oposto.',
        origin_location: 'Bauru',
        created_by: regularUserId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        title: 'A Iara do Litoral Paulista',
        content: 'Uma sereia que encanta pescadores com seu canto melodioso nas praias de Santos e Guarujá. Muitos dizem ter ouvido sua voz ao amanhecer.',
        origin_location: 'Santos',
        created_by: adminUserId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        title: 'O Negrinho do Pastoreio de Piracicaba',
        content: 'A história de um menino escravo que foi castigado injustamente e depois de morto, aparece ajudando pessoas a encontrarem objetos perdidos.',
        origin_location: 'Piracicaba',
        created_by: regularUserId,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reports', null, {})
  }
}
