import { Link } from 'react-router-dom'
import { PiShoppingCartDuotone } from 'react-icons/pi'
import { useCartStore } from '@/store/cartStore'

const CartButton = () => {
    const itemCount = useCartStore((state) => state.getItemCount())

    return (
        <Link
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
            <PiShoppingCartDuotone className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                </span>
            )}
        </Link>
    )
}

export default CartButton
