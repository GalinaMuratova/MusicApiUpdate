import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import * as crypto from "crypto";
const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collection were not present');
    }

    const [artist1,artist2, artist3] = await Artist.create({
        name: 'Panic! At the disco',
        information:'Американская рок-группа из Лас-Вегаса, штат Невада. На данный момент единственным участником группы является Брендон Ури',
        image:'fixtures/patd.jpeg'
    },{
        name: 'Pink floyd',
        information:'Британская рок-группа, знаменитая своими продолжительными композициями и объединёнными в тематические сюиты песнями, звуковыми экспериментами, философскими текстами, дизайном обложек альбомов и грандиозными концертными шоу.',
        image:'fixtures/pinkfloyd.jpeg'
    }, {
        name: 'Zemfira',
        information:'Российская рок-певица, музыкант, композитор, продюсер, поэтесса и автор песен. ',
        image:'fixtures/zemfira.jpg'
    });

    const [album1,album2, album3,album4, album5, album6, album7] = await Album.create({
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
    }, {
        name: 'Прости меня моя любовь',
        image:'fixtures/pmml.jpg',
        artist: artist3._id,
        year: 2000
    },{
        name: 'Четырнадцать недель тишины',
        image:'fixtures/14nedel.jpg',
        artist: artist3._id,
        year: 2007
    },{
        name: 'Pray for the Wicked',
        image:'fixtures/PrayForTheWicked.jpg',
        artist: artist1._id,
        year: 2018
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
    },{
        name: 'Хочешь?',
        number: 1,
        album: album5._id,
        duration: '3:07'
    },{
        name: 'Ненавижу',
        number: 2,
        album: album5._id,
        duration: '3:24'
    },{
        name: 'Доказано',
        number: 3,
        album: album5._id,
        duration: '3:17'
    },{
        name: 'П.М.М.Л.',
        number: 4,
        album: album5._id,
        duration: '3:26'
    },{
        name: 'Не отпускай',
        number: 5,
        album: album5._id,
        duration: '4:12'
    },{
        name: 'Лондон',
        number: 6,
        album: album5._id,
        duration: '4:12'
    },{
        name: '∞',
        number: 1,
        album: album6._id,
        duration: '3:07'
    },{
        name: 'Кто?',
        number: 2,
        album: album6._id,
        duration: '3:24'
    },{
        name: 'Паранойя',
        number: 3,
        album: album6._id,
        duration: '3:17'
    },{
        name: 'Главное',
        number: 4,
        album: album6._id,
        duration: '3:26'
    },{
        name: 'Ощущенья',
        number: 5,
        album: album6._id,
        duration: '4:12'
    },{
        name:'(Fuck A) Silver Lining',
        number:1,
        album:album7._id,
        duration:'3:12'
    } ,{
        name:'Say Amen (Saturday Night)',
        number:2,
        album:album7._id,
        duration:'3:11'
    },{
        name:'Hey Look Ma, I Made It',
        number:3,
        album:album7._id,
        duration:'2:49'
    },{
        name:'High Hopes',
        number:4,
        album:album7._id,
        duration:'3:12'
    },{
        name:'Dancing`s Not a Crime',
        number:5,
        album:album7._id,
        duration:'3:25'
    },{
        name:'One of the Drunks',
        number:6,
        album:album7._id,
        duration:'3:39'
    });
    await User.create({
        username:'Anna',
        password:'lala',
        token: crypto.randomUUID()
    },{
        username:'Sam',
        password:'123',
        token: crypto.randomUUID()
    });
    await db.close();
};
run().catch(console.error);