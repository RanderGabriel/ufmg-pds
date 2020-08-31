const typeorm = (jest as any).createMockFromModule('typeorm');

typeorm.createConnection = function () {
    return new Promise((resolve, rejects) => {
        resolve({
            close: function(){ }
        })
    })
}

typeorm.PrimaryGeneratedColumn = () => {};  

export default typeorm