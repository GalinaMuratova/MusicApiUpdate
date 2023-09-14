import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (e) {
        console.log('Collection were not present');
    }

    const [artist1,artist2] = await Artist.create({
        name: 'Panic! At the disco',
        information:'Американская рок-группа из Лас-Вегаса, штат Невада. На данный момент единственным участником группы является Брендон Ури',
        image:'fixtures/patd.jpeg'
    },{
        name: 'Pink floyd',
        information:'Британская рок-группа, знаменитая своими продолжительными композициями и объединёнными в тематические сюиты песнями, звуковыми экспериментами, философскими текстами, дизайном обложек альбомов и грандиозными концертными шоу.',
        image:'fixtures/pinkfloyd.jpeg'
    });

    const [album1,album2, album3,album4] = await Album.create({
        name: 'Too Weird to Live, Too Rare to Die!',
        image:'fixtures/tooweirdtolivetooraretodie.jpg',
        artist: artist1._id,
        year: 2013
    }, {
        name: 'A Fever You Can’t Sweat Out',
        image: 'fixtures/afeveryoucantsweatout.jpeg',
        artist: artist1._id,
        year:2005
    }, {
        name: 'The Wall',
        image:'fixtures/thewall.jpg',
        artist: artist2._id,
        year: 1979
    }, {
        name: 'The dark side of the moon',
        image: 'fixtures/thedarksideofthemoon.jpeg',
        artist: artist2._id,
        year:1973
    });
    await Track.create ({
        name: 'This is Gospel',
        number: 1,
        album: album1._id,
        duration: '3:07'
    },{
        name: 'Miss Jackson',
        number: 2,
        album: album1._id,
        duration: '3:24'
    },{
        name: 'Far Too Young to Die',
        number: 3,
        album: album1._id,
        duration: '3:17'
    },{
        name: 'Girl That You Love',
        number: 4,
        album: album1._id,
        duration: '3:26'
    },{
        name: 'Casual Affair',
        number: 5,
        album: album1._id,
        duration: '4:12'
    },{
        name: 'London Beckoned Songs About Money Written by Machines',
        number: 1,
        album: album2._id,
        duration: '3:07'
    },{
        name: 'Nails for Breakfast, Tacks for Snacks',
        number: 2,
        album: album2._id,
        duration: '3:24'
    },{
        name: 'I Write Sins Not Tragedies',
        number: 3,
        album: album2._id,
        duration: '3:17'
    },{
        name: 'There’s a Good Reason These Tables Are Numbered Honey, You Just Haven’t Thought of It Yet',
        number: 4,
        album: album2._id,
        duration: '3:26'
    },{
        name: 'I Constantly Thank God for Esteban',
        number: 5,
        album: album2._id,
        duration: '4:12'
    },{
        name: 'Breathe (In the Air)',
        number: 1,
        album: album3._id,
        duration: '3:07'
    },{
        name: 'On the Run',
        number: 2,
        album: album3._id,
        duration: '3:24'
    },{
        name: 'The Great Gig in the Sky',
        number: 3,
        album: album3._id,
        duration: '3:17'
    },{
        name: 'Any Colour You Like',
        number: 4,
        album: album3._id,
        duration: '3:26'
    },{
        name: 'Eclipse',
        number: 5,
        album: album3._id,
        duration: '4:12'
    },{
        name: 'Another Brick in the Wall',
        number: 1,
        album: album4._id,
        duration: '3:07'
    },{
        name: 'Mother',
        number: 2,
        album: album4._id,
        duration: '3:24'
    },{
        name: 'Goodbye Blue Sky',
        number: 3,
        album: album4._id,
        duration: '3:17'
    },{
        name: 'Empty Spaces',
        number: 4,
        album: album4._id,
        duration: '3:26'
    },{
        name: 'Don’t Leave Me Now',
        number: 5,
        album: album4._id,
        duration: '4:12'
    });
    await db.close();
};
run().catch(console.error);