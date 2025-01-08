import { createSlice } from "@reduxjs/toolkit";

const loadItemsFromLocalStorage = () => {
    const items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
};


const initialState = {
    items : loadItemsFromLocalStorage()
}

export const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers :{
        addItem : (state,action) =>{
            const alreadyInCart = state.items.some((item)=> item.id === action.payload.id)
            if(!alreadyInCart){
                state.items.push(action.payload)
                localStorage.setItem('items', JSON.stringify(state.items))
            }
        },
        removeItem : (state,action) =>{
            const id = action.payload
            state.items = state.items.filter(item =>{
                return item.id != id;
            })
            localStorage.setItem('items', JSON.stringify(state.items))
        },
        updateItemSize: (state, action) => {
            const { id, value } = action.payload;
            console.log(value,id)
            
            state.items = state.items.map(item => 
              item.id === id 
                ? { ...item, selectedSize: value } 
                : item
            );
            localStorage.setItem('items', JSON.stringify(state.items));
          },
          
          updateItemQty: (state, action) => {
            const { id, value } = action.payload;
          
            state.items = state.items.map(item => 
              item.id === id 
                ? { ...item, selectedQty: value } 
                : item
            );
          
            localStorage.setItem('items', JSON.stringify(state.items));
          },
          clearCart : (state,action) =>{
            state.items = []
            localStorage.setItem('items',JSON.stringify(state.items))
          }
    }
})

export const {addItem,removeItem,updateItemQty,updateItemSize,clearCart} = cartSlice.actions

export default cartSlice.reducer