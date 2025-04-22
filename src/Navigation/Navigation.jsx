
import Home from '../Pages/home/Home'
import Cart from '../Pages/Cart/Cart'
import Product from '../Pages/Product/Product'
import GetOrders from '../Pages/GetOrders/GetOrders'
const route1 =[
    {
        name:'Home',
        path:'/Home',
        element:<Home/>
    },
    {
        name:'Cart',
        path:'/Cart',
        element:<Cart/>
    },
    {
        name:'Product',
        path:'/Product',
        element:<Product/>
    },
    {
        name:'GetOrders',
        path:'/GetOrders',
        element: <GetOrders/>
    }

    
]

export {route1}