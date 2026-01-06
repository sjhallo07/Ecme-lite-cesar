import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    PiTrashDuotone,
    PiMinusDuotone,
    PiPlusDuotone,
    PiShoppingCartDuotone,
    PiArrowRightDuotone,
} from 'react-icons/pi'
import { useCartStore } from '@/store/cartStore'
import { useCurrencyStore } from '@/store/currencyStore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const Cart = () => {
    const { items, removeItem, updateQuantity, updateNotes, clearCart, getTotalPrice, getItemCount } = useCartStore()
    const formatPrice = useCurrencyStore((state) => state.formatPrice)

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-gray-400 mb-6"
                >
                    <PiShoppingCartDuotone className="w-24 h-24" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Browse our services and add them to your cart
                </p>
                <Link to="/services">
                    <Button variant="solid">Browse Services</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Shopping Cart
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {getItemCount()} item{getItemCount() !== 1 ? 's' : ''} in your cart
                        </p>
                    </div>
                    <Button variant="plain" className="text-red-500" onClick={clearCart}>
                        Clear Cart
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.service.id}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {item.service.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {item.service.estimatedDuration}
                                                </p>
                                            </div>
                                            <button
                                                className="text-red-500 hover:text-red-600 p-2"
                                                onClick={() => removeItem(item.service.id)}
                                            >
                                                <PiTrashDuotone className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                                    onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                                                >
                                                    <PiMinusDuotone className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                                    onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                                                >
                                                    <PiPlusDuotone className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                                {formatPrice(item.service.basePrice * item.quantity)}
                                            </span>
                                        </div>

                                        <div className="mt-4">
                                            <Input
                                                placeholder="Add notes for this service..."
                                                value={item.notes || ''}
                                                className="text-sm"
                                                onChange={(e) => updateNotes(item.service.id, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm sticky top-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(getTotalPrice())}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Service Fee</span>
                                    <span>{formatPrice(getTotalPrice() * 0.05)}</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                                        <span>Total</span>
                                        <span>{formatPrice(getTotalPrice() * 1.05)}</span>
                                    </div>
                                </div>
                            </div>

                            <Link to="/quote" className="block">
                                <Button
                                    variant="solid"
                                    className="w-full"
                                    icon={<PiArrowRightDuotone />}
                                >
                                    Request Quote
                                </Button>
                            </Link>

                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                                Final price may vary based on inspection
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Cart
