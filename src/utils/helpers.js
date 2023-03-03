export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD'
    }).format(number / 100)
   
}

export const getUniqueValues = (data,type) => {
    let unique = data.map((item)=>item[type])
    if(type === 'colors'){
        unique = unique.flat()
    }


    return ['all',...new Set(unique)]
}

export const addCartToLocalStorage =(cart)=>{
    localStorage.setItem('cart',JSON.stringify(cart));
    return  cart
}
export const getLocalStorage = () =>{
    const result = localStorage.getItem('cart');
    const cart = result ? JSON.parse(result) : []
    return cart;
}

export const getUser = () =>{
    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null
    return user;
}