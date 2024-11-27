export async function addToCart(productId, quantity) {
    try {
        const response = await fetch('https://web-pint.vercel.app/api/v1/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ProductId: productId,
                Quantity: quantity,
            }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to add to cart');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}

export async function getCart() {
    try {
        const response = await fetch('https://web-pint.vercel.app/api/v1/cart/', {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
} 