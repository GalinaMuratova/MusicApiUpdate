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

    const [artist1,artist2, artist3, artist4] = await Artist.create({
        name: 'Panic! At the disco',
        information:'Американская рок-группа из Лас-Вегаса, штат Невада. На данный момент единственным участником группы является Брендон Ури',
        image:'patd.jpeg',
        isPublished: true,
    },{
        name: 'Pink floyd',
        information:'Британская рок-группа, знаменитая своими продолжительными композициями и объединёнными в тематические сюиты песнями, звуковыми экспериментами, философскими текстами, дизайном обложек альбомов и грандиозными концертными шоу.',
        image:'pinkfloyd.jpeg',
        isPublished:true
    }, {
        name: 'Zemfira',
        information:'Российская рок-певица, музыкант, композитор, продюсер, поэтесса и автор песен. ',
        image:'zemfira.jpg',
        isPublished: true
    }, {
        name: 'My Chemical Romance',
        information:'My Chemical Romance (MCR) - это американская рок-группа, основанная в 2001 году. Группа прославилась своим уникальным стилем, который объединяет элементы панк-рока, эмо и альтернативного рока. Их музыка часто характеризуется глубокими текстами песен, эмоциональным вокалом и инновационным звуком. ',
        image:'mcr.jpg',
        isPublished: false
    });

    const [album1,album2, album3,album4, album5, album6, album7, album8, album9] = await Album.create({
        name: 'Too Weird to Live, Too Rare to Die!',
        image:'tooweirdtolivetooraretodie.jpg',
        artist: artist1._id,
        year: 2013,
        isPublished: true
    }, {
        name: 'A Fever You Can’t Sweat Out',
        image: 'afeveryoucantsweatout.jpeg',
        artist: artist1._id,
        year:2005,
        isPublished: true
    }, {
        name: 'The Wall',
        image:'thewall.jpg',
        artist: artist2._id,
        year: 1979,
        isPublished: true
    }, {
        name: 'The dark side of the moon',
        image: 'thedarksideofthemoon.jpeg',
        artist: artist2._id,
        year:1973,
        isPublished: true
    }, {
        name: 'Прости меня моя любовь',
        image:'pmml.jpg',
        artist: artist3._id,
        year: 2000,
        isPublished: true
    },{
        name: 'Четырнадцать недель тишины',
        image:'14nedel.jpg',
        artist: artist3._id,
        year: 2007,
        isPublished: true
    },{
        name: 'Pray for the Wicked',
        image:'PrayForTheWicked.jpg',
        artist: artist1._id,
        year: 2018,
        isPublished: true
    },{
        name: 'Three Cheers for Sweet Revenge',
        image:'Threecheersforsweetrevenge.jpg',
        artist: artist4._id,
        year: 2004,
        isPublished: false
    },{
        name: 'The Black Parade',
        image:'Theblackparade.jpg',
        artist: artist4._id,
        year: 2008,
        isPublished: false
    });
    await Track.create ({
        name: 'This is Gospel',
        number: 1,
        album: album1._id,
        duration: '3:07',
        isPublished: true
    },{
        name: 'Miss Jackson',
        number: 2,
        album: album1._id,
        duration: '3:24',
        isPublished: true
    },{
        name: 'Far Too Young to Die',
        number: 3,
        album: album1._id,
        duration: '3:17',
        isPublished: true
    },{
        name: 'Girl That You Love',
        number: 4,
        album: album1._id,
        duration: '3:26',
        isPublished: true
    },{
        name: 'Casual Affair',
        number: 5,
        album: album1._id,
        duration: '4:12',
        isPublished: true
    },{
        name: 'London Beckoned Songs About Money Written by Machines',
        number: 1,
        album: album2._id,
        duration: '3:07',
        isPublished: true
    },{
        name: 'Nails for Breakfast, Tacks for Snacks',
        number: 2,
        album: album2._id,
        duration: '3:24',
        isPublished: true
    },{
        name: 'I Write Sins Not Tragedies',
        number: 3,
        album: album2._id,
        duration: '3:17',
        isPublished: true
    },{
        name: 'There’s a Good Reason These Tables Are Numbered Honey, You Just Haven’t Thought of It Yet',
        number: 4,
        album: album2._id,
        duration: '3:26',
        isPublished: true
    },{
        name: 'I Constantly Thank God for Esteban',
        number: 5,
        album: album2._id,
        duration: '4:12',
        isPublished: true
    },{
        name: 'Breathe (In the Air)',
        number: 1,
        album: album3._id,
        duration: '3:07',
        isPublished: true
    },{
        name: 'On the Run',
        number: 2,
        album: album3._id,
        duration: '3:24',
        isPublished: true
    },{
        name: 'The Great Gig in the Sky',
        number: 3,
        album: album3._id,
        duration: '3:17',
        isPublished: true
    },{
        name: 'Any Colour You Like',
        number: 4,
        album: album3._id,
        duration: '3:26',
        isPublished: true
    },{
        name: 'Eclipse',
        number: 5,
        album: album3._id,
        duration: '4:12',
        isPublished: true
    },{
        name: 'Another Brick in the Wall',
        number: 1,
        album: album4._id,
        duration: '3:07',
        isPublished: true
    },{
        name: 'Mother',
        number: 2,
        album: album4._id,
        duration: '3:24',
        isPublished: true
    },{
        name: 'Goodbye Blue Sky',
        number: 3,
        album: album4._id,
        duration: '3:17',
        isPublished: true
    },{
        name: 'Empty Spaces',
        number: 4,
        album: album4._id,
        duration: '3:26',
        isPublished: true
    },{
        name: 'Don’t Leave Me Now',
        number: 5,
        album: album4._id,
        duration: '4:12',
        isPublished: true
    },{
        name: 'Хочешь?',
        number: 1,
        album: album5._id,
        duration: '3:07',
        isPublished: true
    },{
        name: 'Ненавижу',
        number: 2,
        album: album5._id,
        duration: '3:24',
        isPublished: true
    },{
        name: 'Доказано',
        number: 3,
        album: album5._id,
        duration: '3:17',
        isPublished: true
    },{
        name: 'П.М.М.Л.',
        number: 4,
        album: album5._id,
        duration: '3:26',
        isPublished: true
    },{
        name: 'Не отпускай',
        number: 5,
        album: album5._id,
        duration: '4:12',
        isPublished: false
    },{
        name: 'Лондон',
        number: 6,
        album: album5._id,
        duration: '4:12',
        isPublished: false
    },{
        name: '∞',
        number: 1,
        album: album6._id,
        duration: '3:07',
        isPublished: true
    },{
        name: 'Кто?',
        number: 2,
        album: album6._id,
        duration: '3:24',
        isPublished: true
    },{
        name: 'Паранойя',
        number: 3,
        album: album6._id,
        duration: '3:17',
        isPublished: true
    },{
        name: 'Главное',
        number: 4,
        album: album6._id,
        duration: '3:26',
        isPublished: false
    },{
        name: 'Ощущенья',
        number: 5,
        album: album6._id,
        duration: '4:12',
        isPublished: false
    },{
        name:'(Fuck A) Silver Lining',
        number:1,
        album:album7._id,
        duration:'3:12',
        isPublished: true
    } ,{
        name:'Say Amen (Saturday Night)',
        number:2,
        album:album7._id,
        duration:'3:11',
        isPublished: true
    },{
        name:'Hey Look Ma, I Made It',
        number:3,
        album:album7._id,
        duration:'2:49',
        isPublished: true
    },{
        name:'High Hopes',
        number:4,
        album:album7._id,
        duration:'3:12',
        isPublished: true
    },{
        name:'Dancing`s Not a Crime',
        number:5,
        album:album7._id,
        duration:'3:25',
        isPublished: true
    },{
        name:'One of the Drunks',
        number:6,
        album:album7._id,
        duration:'3:39',
        isPublished: true
    },{
        name:'Helena',
        number:1,
        album:album8._id,
        duration:'3:22',
        isPublished: false
    } ,{
        name:'I’m Not Okay (I Promise)',
        number:2,
        album:album8._id,
        duration:'3:11',
        isPublished: false
    },{
        name:'The Ghost of You',
        number:3,
        album:album8._id,
        duration:'2:49',
        isPublished: false
    },{
        name:'Welcome to the Black Parade',
        number:1,
        album:album9._id,
        duration:'3:22',
        isPublished: false
    } ,{
        name:`I Dont Love You`,
        number:2,
        album:album9._id,
        duration:'3:11',
        isPublished: false
    },{
        name:'Teenagers',
        number:3,
        album:album9._id,
        duration:'3:49',
        isPublished: false
    },);
    await User.create({
        username:'Anna',
        password:'123',
        token: crypto.randomUUID(),
        role:'admin',
        displayName:'Anna Gavalda',
    },{
        username:'Sam',
        password:'456',
        token: crypto.randomUUID(),
        role:'user',
        displayName:'Sam Smith'
    });
    await db.close();
};
run().catch(console.error);