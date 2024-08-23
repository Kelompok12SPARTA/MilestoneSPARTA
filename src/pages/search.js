import { productsTable } from "@/db/schema";
import { useRouter } from "next/router";


const page_size = 2;

const prices = [
    {
        name: 'Below Rp16.000',
        value: '1-16000',
    },
    {
        name: 'Rp16.000 to Rp40.000',
        value: '16001-40000',
    },
    {
        name: 'Rp40.000 to Rp100.000',
        value: '40001-100000',
    },
    {
        name: 'Over Rp100000',
        value: '>100000',
    },
];

const ratings = [1,2,3,4,5];

export default function Search(props)
{

    const router = useRouter();

    const {
        query ='all',
        category = 'all',
        restaurant = 'all',
        price = 'all',
        rating = 'all',
        sort = 'featured',
        page = 1,
    } = router.query;

    const { products, countProducts, categories, restaurants, pages } = props;

    const filterSearch = () => 
    ({
        page,
        category,
        restaurant,
        sort,
        min,
        max,
        searchQuery,
        price,
        rating,
    }) => 
    {
        const { query } = router;
        if (page) query.page = page;
        if (searchQuery) query.searchQuery = searchQuery;
        if (sort) query.sort = sort;
        if (category) query.category = category;
        if (restaurant) query.restaurant = restaurant;
        if (price) query.price = price;
        if (rating) query.rating = rating;
        if (min) query.min ? query.min : query.min === 0 ? 0 : min;
        if (max) query.max ? query.max : query.max === 0 ? 0 : max;

        router.push({
            pathname: router.pathname,
            query: query,
        });
    };
    const categoryHandler = (e) => 
    {
        filterSearch({ category: e.target.value});
    };
    const pageHandler = (e) => 
    {
        filterSearch({ page: e.target.value});
    };
    const restaurantHandler = (e) => 
    {
        filterSearch({ restaurant: e.target.value});
    };
    const sortHandler = (e) => 
    {
        filterSearch({ sort: e.target.value});
    };
    const priceHandler = (e) => 
    {
        filterSearch({ price: e.target.value});
    };
    const ratingHandler = (e) => 
    {
        filterSearch({ rating: e.target.value});
    };
}

export async function getServerSideProps({ query })
{
    const pageSize = query.pageSize || page_size;
    const page = query.page || 1;
    const category = query.category || '';
    const restaurant = query.restaurant || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const sort = query.sort || '';
    const searchQuery = query.searchQuery || '';

    const queryFilter = 
        searchQuery && searchQuery !== 'all'
            ? {
                name :
                {
                    $regex: searchQuery,
                    $options: 'i',
                },
              }
            : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const restaurantFilter = restaurant && restaurant !== 'all' ? { restaurant } : {};
    const ratingFilter =
        rating && rating !== 'all'
            ? {
                rating:
                {
                    $gte: Number(rating),
                },
              }
            : {};
    //1-16000
    const priceFilter = 
    price && price !== 'all'
        ? {
            price:
            {
                $gte: Number(price.split('-')[0]),
                $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const order =
          sort === 'featured'
            ? { isFeatured: -1 }
            : sort === 'lowest'
            ? { price: 1 }
            : sort === 'highest'
            ? { price: -1 }
            : sort === 'toprated'
            ? { rating: -1 }
            : sort === 'newest'
            const categories = await db.query.productsTable.findMany({where: eq(productsTable.category, category)});
            const restaurants = await db.query.productsTable.findMany({where: eq(productsTable.restaurant, restaurant)});
            }))
}