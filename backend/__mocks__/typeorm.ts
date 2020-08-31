const typeorm = jest.createMockFromModule('typeorm');

typeorm.createConnection = function (){
    return new Promise((resolve, rejects) => {
        resolve({
            close: function(){
            }
        })
    })
}

export default typeorm