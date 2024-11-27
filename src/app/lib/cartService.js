// وظيفة للحصول على معرف الجلسة
const getSessionId = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('sessionId');
    }
    return null;
};

// وظيفة لحفظ معرف الجلسة
const setSessionId = (sessionId) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('sessionId', sessionId);
    }
};

// وظيفة لإنشاء رؤوس الطلب
const createHeaders = (contentType = true) => {
    const headers = {};
    const sessionId = getSessionId();

    if (sessionId) {
        headers['X-Session-ID'] = sessionId;
    }

    if (contentType) {
        headers['Content-Type'] = 'application/json';
    }

    return headers;
};

export async function addToCart(productId, quantity) {
    try {
        const response = await fetch('https://web-pint.vercel.app/api/v1/cart/add', {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({
                ProductId: productId,
                Quantity: quantity,
            }),
            credentials: 'include',
        });

        // حفظ معرف الجلسة من الرد
        const sessionId = response.headers.get('X-Session-ID');
        if (sessionId) setSessionId(sessionId);

        if (!response.ok) {
            throw new Error(`Failed to add to cart: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error('فشل في إضافة المنتج إلى السلة');
    }
}

export async function getCart() {
    try {
        const response = await fetch('https://web-pint.vercel.app/api/v1/cart/', {
            headers: createHeaders(false),
            credentials: 'include',
        });

        // حفظ معرف الجلسة من الرد
        const sessionId = response.headers.get('X-Session-ID');
        if (sessionId) setSessionId(sessionId);

        if (!response.ok) {
            throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error('فشل في تحميل السلة');
    }
}

export async function clearCart() {
    try {
        const response = await fetch('https://web-pint.vercel.app/api/v1/cart/clear', {
            method: 'DELETE',
            headers: createHeaders(false),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to clear cart: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error('فشل في تفريغ السلة');
    }
}

export async function removeFromCart(cartItemId) {
    try {
        const response = await fetch(`https://web-pint.vercel.app/api/v1/cart/remove/${cartItemId}`, {
            method: 'DELETE',
            headers: createHeaders(false),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to remove item from cart: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error('فشل في حذف المنتج من السلة');
    }
}

export async function checkout(orderData) {
    try {
        const response = await fetch('https://web-pint.vercel.app/api/v1/cart/checkout', {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(orderData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to checkout: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error('فشل في إتمام عملية الشراء');
    }
}

export async function getOrders() {
    try {
        const response = await fetch('https://web-pint.vercel.app/api/v1/cart/my-orders', {
            headers: createHeaders(false),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error('فشل في تحميل الطلبات');
    }
}