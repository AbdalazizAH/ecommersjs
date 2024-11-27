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

export async function clearCart() {
    try {
        const response = await fetch('https://web-pint.vercel.app/api/v1/cart/clear', {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to clear cart');
        }

        return await response.json();
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
}

export async function removeFromCart(cartItemId) {
    try {
        const response = await fetch(`https://web-pint.vercel.app/api/v1/cart/remove/${cartItemId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to remove item from cart');
        }

        return await response.json();
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
}

export async function checkout(orderData) {
    try {
        const response = await fetch('https://web-pint.vercel.app/api/v1/cart/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to checkout');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during checkout:', error);
        throw error;
    }
}

export async function getOrders() {
    try {
        const response = await fetch('https://web-pint.vercel.app/api/v1/cart/my-orders', {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}