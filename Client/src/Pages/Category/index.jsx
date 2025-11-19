import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getData } from '../../utils/api';
import ProductsItem from '../../components/ProductsItem';

const CategoryPage = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const resCat = await getData(`/api/v1/category/${id}`);
                if (resCat && resCat.data) setCategory(resCat.data);

                const resProd = await getData(`/api/v1/product/category/${id}`);
                if (resProd && resProd.data) setProducts(resProd.data);
            } catch (err) {
                console.error('Failed to load category or products', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) load();
    }, [id]);

    return (
        <section className="py-6">
            <div className="container">
                <div className="mb-4">
                    <Link to="/">Home</Link> / <span className="font-bold">{category?.name || 'Category'}</span>
                </div>

                <div className="mb-4">
                    <h2 className="text-2xl font-semibold">{category?.name || 'Category'}</h2>
                    <p className="text-sm text-gray-600">{category?.description || ''}</p>
                </div>

                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : products.length === 0 ? (
                        <p>No products found in this category</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {products.map(p => <ProductsItem key={p._id} {...p} />)}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CategoryPage;
