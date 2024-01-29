import { fakerES as faker } from '@faker-js/faker';


export const generateMockProduct = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
        price: faker.commerce.price(),
        stock: faker.number.int({ max: 100 }),
        category: faker.commerce.productAdjective(),
        thumbnail: [faker.image.url(), faker.image.url()], 
        status: true
    }
    return product
}
