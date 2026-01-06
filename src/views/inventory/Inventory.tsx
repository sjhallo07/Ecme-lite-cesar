import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    PiPackageDuotone,
    PiWarningDuotone,
    PiMagnifyingGlassDuotone,
    PiPlusDuotone,
    PiPencilDuotone,
    PiTrashDuotone,
    PiArrowsDownUpDuotone,
} from 'react-icons/pi'
import { inventoryData } from '@/data/services.data'
import { useCurrencyStore } from '@/store/currencyStore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const Inventory = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortField, setSortField] = useState<'name' | 'quantity' | 'price'>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const formatPrice = useCurrencyStore((state) => state.formatPrice)

    const filteredInventory = inventoryData
        .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[sortField]
            const bValue = b[sortField]
            const modifier = sortDirection === 'asc' ? 1 : -1

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return aValue.localeCompare(bValue) * modifier
            }
            return ((aValue as number) - (bValue as number)) * modifier
        })

    const lowStockItems = inventoryData.filter((item) => item.quantity <= item.minQuantity)
    const totalValue = inventoryData.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleSort = (field: 'name' | 'quantity' | 'price') => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    return (
        <div className="min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Inventory Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Track parts and supplies for services
                    </p>
                </div>
                <Button variant="solid" icon={<PiPlusDuotone />}>
                    Add Item
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                            <PiPackageDuotone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Items</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {inventoryData.length}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                            <PiPackageDuotone className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(totalValue)}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
                            <PiWarningDuotone className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Low Stock</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {lowStockItems.length}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                            <PiPackageDuotone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {new Set(inventoryData.map((i) => i.category)).size}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Low Stock Alert */}
            {lowStockItems.length > 0 && (
                <motion.div
                    className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-3">
                        <PiWarningDuotone className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        <div>
                            <p className="font-medium text-yellow-800 dark:text-yellow-200">
                                Low Stock Alert
                            </p>
                            <p className="text-sm text-yellow-600 dark:text-yellow-400">
                                {lowStockItems.map((i) => i.name).join(', ')} need restocking
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <PiMagnifyingGlassDuotone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            className="pl-10"
                            placeholder="Search by name, SKU, or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">SKU</th>
                                <th
                                    className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className="flex items-center gap-1">
                                        Item Name
                                        <PiArrowsDownUpDuotone className="w-4 h-4" />
                                    </div>
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
                                <th
                                    className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                                    onClick={() => handleSort('quantity')}
                                >
                                    <div className="flex items-center gap-1">
                                        Quantity
                                        <PiArrowsDownUpDuotone className="w-4 h-4" />
                                    </div>
                                </th>
                                <th
                                    className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                                    onClick={() => handleSort('price')}
                                >
                                    <div className="flex items-center gap-1">
                                        Price
                                        <PiArrowsDownUpDuotone className="w-4 h-4" />
                                    </div>
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Supplier</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="py-4 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                                        {item.sku}
                                    </td>
                                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                                        {item.name}
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span
                                            className={`font-medium ${
                                                item.quantity <= item.minQuantity
                                                    ? 'text-red-600 dark:text-red-400'
                                                    : 'text-gray-900 dark:text-white'
                                            }`}
                                        >
                                            {item.quantity}
                                        </span>
                                        <span className="text-gray-400 text-sm ml-1">
                                            / min {item.minQuantity}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                                        {formatPrice(item.price)}
                                    </td>
                                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                                        {item.supplier}
                                    </td>
                                    <td className="py-4 px-4">
                                        {item.quantity <= item.minQuantity ? (
                                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs font-medium rounded">
                                                Low Stock
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                                                In Stock
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                                                <PiPencilDuotone className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
                                                <PiTrashDuotone className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredInventory.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No items found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Inventory
