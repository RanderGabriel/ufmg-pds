const typeorm = jest.createMockFromModule('typeorm');

function createConnection(){
    return new Promise((resolve, rejects) => {
        resolve({
            close: function(){

            }
        })
    })
}

export default typeorm