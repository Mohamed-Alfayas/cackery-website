import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProduct, editProduct, setProduct } from '../../redux/reducers/ChildReducer/ProductReducer'

const Product = () => {

    const dispatch = useDispatch()

    const ProductList = [
        { id: 1, name: 'a', price: '1000' },
        { id: 2, name: 'b', price: '2000' },
        { id: 3, name: 'c', price: '3000' },
        { id: 4, name: 'd', price: '4000' },
    ]

    useEffect(() => {
        dispatch(setProduct(ProductList))
    }, []);

    const initialData = useMemo(() => {
        return {
            id: 0,
            name: "",
            price: '0'
        }
    }, [])

    const [productFormData, setProductFormData] = useState(initialData);

    const { product_data } = useSelector(state => state.ProductReducer);

    console.log("Product Data = ", product_data);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductFormData({
            ...productFormData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(productFormData.id === 0){
            let newId = product_data.length ? product_data[product_data.length -1].id + 1 : 1
            productFormData['id'] = newId
            dispatch(addProduct(productFormData))
        }
        else{
            dispatch(editProduct(productFormData))
        }

        setProductFormData(initialData)

        console.log("Product Form Data = ", productFormData);
    }

    const handleDelete = (id) =>{
        console.log(id);
        dispatch(deleteProduct(id))
    }

    return (
        <div>
            <h2>Product</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name='name'
                    value={productFormData.name || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    name='price'
                    value={productFormData.price || ""}
                    onChange={handleInputChange}
                />
                <button type='submit'>Submit</button>
            </form>

            {product_data.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product_data.map((obj, idx) => (
                            <tr key={idx}>
                                <td>{obj.id}</td>
                                <td>{obj.name}</td>
                                <td>{obj.price}</td>
                                <td>
                                    <button onClick={() => setProductFormData(obj)}>Edit</button>
                                    <button onClick={() => handleDelete(obj.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No Data</p>
            )}

        </div>
    )
}

export default Product
