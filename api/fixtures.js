const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const Place = require("./models/Place");
const Review = require("./models/Review");
const Image = require("./models/Image");
const {nanoid} = require("nanoid");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user1, user2, admin] = await User.create(
        {
            email: 'user@final.com',
            password: '123',
            displayName: 'User 1',
            token: nanoid(),
            role: 'user'
        },
        {
            email: 'user2@final.com',
            password: '123',
            displayName: 'User 2',
            token: nanoid(),
            role: 'user'
        },
        {
            email: 'admin@final.com',
            password: '123',
            displayName: 'Admin ',
            token: nanoid(),
            role: 'admin'
        }
    );

    const [pishpek, lamaison, oblako] = await Place.create(
        {
            user: user1,
            title: 'Ресторан Пишпек',
            description: 'Европейская, Азиатская, Центральноазиатская, Узбекская',
            image: 'pishpek.jpg'
        },
        {
            user: user1,
            title: 'La Maison',
            description: 'Подходит для вегетарианцев, Для веганов, Безглютеновые блюда',
            image: 'lamaison.jpg'
        },
        {
            user: user2,
            title: 'Облако 53',
            description: 'Европейская, Бар, Суши, Мексиканская, Стейк-хаус, Средиземноморская, Паб, Русская, Восточноевропейская, Бары с рестораном',
            image: 'oblako.jpg'
        }
    );

    await Review.create(
        {
            user: user2,
            place: pishpek,
            text: 'Ооочень вкусно!',
            foodRate: 5,
            serviceRate: 5,
            interiorRate: 5,
        },
        {
            user: user2,
            place: lamaison,
            text: 'Ужасное обслуживание!',
            foodRate: 3,
            serviceRate: 1,
            interiorRate: 3,
        },
        {
            user: user1,
            place: oblako,
            text: 'Классное место с видом на город',
            foodRate: 5,
            serviceRate: 5,
            interiorRate: 5,
        },

    );

    await Image.create(
        {
            user: user1,
            place: pishpek,
            image: 'pishpek-1.jpg'
        },
        {
            user: user1,
            place: pishpek,
            image: 'pishpek-2.jpg'
        },
        {
            user: user1,
            place: lamaison,
            image: 'lamaison-1.jpg'
        },
        {
            user: user1,
            place: user2,
            image: 'lamaison-2.jpg'
        },
        {
            user: user2,
            place: oblako,
            image: 'oblako-1.jpg'
        },
        {
            user: user2,
            place: oblako,
            image: 'oblako-2.jpg'
        }
    );


    await mongoose.connection.close();
};

run().catch(e => console.error(e));