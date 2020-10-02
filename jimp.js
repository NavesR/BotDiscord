const jimp = require('jimp')

async function main() {
    
    const fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
    let mask = await jimp.read('mascara.png')
    //let avatar = await jimp.read('Urso_Manso.png')
    let fundo = await jimp.read('fundo.png')
    
    jimp.read('https://cdn.vox-cdn.com/thumbor/mXo5ObKpTbHYi9YslBy6YhfedT4=/95x601:1280x1460/1200x800/filters:focal(538x858:742x1062)/cdn.vox-cdn.com/uploads/chorus_image/image/66699060/mgidarccontentnick.comc008fa9d_d.0.png').then(avatar => {
            avatar.resize(150, 150)
            mask.resize(150, 150)
        
            avatar.mask(mask)
            fundo.print(fonte, 150, 180, 'Jilson Mendes')
        
            fundo.composite(avatar, 10, 40).write('beta.png')
        })
        .catch(err => {
        // Handle an exception.
        });
}

main()