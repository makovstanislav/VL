 /* function readUserType() {
        const isSellerRef = ref(database, 'user/isSeller')
        onValue(isSellerRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            switchSeller(data)
        })
    } */

/* 
<div class="mb-3">
                        <label for="exampleInputName" class="form-label">First Name</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="exampleInputName" 
                            onChange={handleChange}
                            name="name"
                            value={credentials.name}
                            placeholder='First Name'
                        />
                    </div> */


//                         <label for="exampleInputEmail" class="form-label">Email</label>

/* setItems(() => {
    const fetchedItems = []
    const itemsList = Object.keys(data)
    itemsList.forEach((key) => {
        fetchedItems.push([data[key].name, data[key].description, data[key].price])
    })
    return fetchedItems
}) */



function getSamplesDetails() {
    const productsArr = []
    samplesUids.forEach(uid => {
        const itemsrRef = ref(database, 'products/' + uid)
        onValue(itemsrRef, (snapshot) => {
            const product = snapshot.val()
            console.log(product)
            const attributes = Object.keys(product)
            attributes.forEach(key => {
                productsArr.push([product[key].uid, product[key].title, product[key].type])
            })
        })  
    })
    setSamplesDetails(productsArr)
}