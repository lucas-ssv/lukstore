export function formatPrice(formatPrice) {
    return new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
    }).format(formatPrice);
}
