import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PiShoppingCartDuotone, PiFunnelDuotone, PiStarFill } from 'react-icons/pi'
import { servicesData } from '@/data/services.data'
import { useCartStore } from '@/store/cartStore'
import { useCurrencyStore } from '@/store/currencyStore'
import Button from '@/components/ui/Button'
import type { Service, ServiceCategory, ServiceSector } from '@/@types/services'

const categoryLabels: Record<ServiceCategory, string> = {
    'electrical-fencing': 'Electric Fencing',
    'surveillance-cameras': 'Surveillance Cameras',
    'painting': 'Painting',
    'air-conditioning': 'Air Conditioning',
    'preventive-maintenance': 'Preventive Maintenance',
    'home-emergency': 'Home Emergency',
    'industrial': 'Industrial',
    'commercial': 'Commercial',
}

const sectorLabels: Record<ServiceSector, string> = {
    home: 'Home',
    industrial: 'Industrial',
    commercial: 'Commercial',
}

const ServiceCard = ({ service }: { service: Service }) => {
    const addItem = useCartStore((state) => state.addItem)
    const formatPrice = useCurrencyStore((state) => state.formatPrice)
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 text-white">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                        {categoryLabels[service.category]}
                    </span>
                </div>
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="absolute inset-0 bg-black/50 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Button
                                variant="solid"
                                icon={<PiShoppingCartDuotone />}
                                onClick={() => addItem(service)}
                            >
                                Add to Cart
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {service.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {service.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                    {service.sector.map((s) => (
                        <span
                            key={s}
                            className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded"
                        >
                            {sectorLabels[s]}
                        </span>
                    ))}
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mb-4 space-y-1">
                    {service.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <PiStarFill className="text-yellow-500 w-3 h-3" />
                            {feature}
                        </li>
                    ))}
                </ul>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {formatPrice(service.basePrice)}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">starting</span>
                    </div>
                    <span className="text-sm text-gray-500">
                        {service.estimatedDuration}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

const Services = () => {
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all')
    const [selectedSector, setSelectedSector] = useState<ServiceSector | 'all'>('all')

    const filteredServices = servicesData.filter((service) => {
        const categoryMatch = selectedCategory === 'all' || service.category === selectedCategory
        const sectorMatch = selectedSector === 'all' || service.sector.includes(selectedSector)
        return categoryMatch && sectorMatch
    })

    const categories = Object.keys(categoryLabels) as ServiceCategory[]
    const sectors = Object.keys(sectorLabels) as ServiceSector[]

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.div
                className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 px-6 mb-8 rounded-2xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="absolute inset-0 bg-[url('/img/pattern.svg')] opacity-10" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        Professional Repair Services
                    </motion.h1>
                    <motion.p
                        className="text-xl text-blue-100 mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Quality installation, maintenance, and repair services for home, industrial, and commercial needs.
                    </motion.p>
                </div>
            </motion.div>

            {/* Filters */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <PiFunnelDuotone className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">Filter Services</span>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Category</label>
                        <select
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value as ServiceCategory | 'all')}
                        >
                            <option value="all">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {categoryLabels[cat]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Sector</label>
                        <select
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            value={selectedSector}
                            onChange={(e) => setSelectedSector(e.target.value as ServiceSector | 'all')}
                        >
                            <option value="all">All Sectors</option>
                            {sectors.map((sector) => (
                                <option key={sector} value={sector}>
                                    {sectorLabels[sector]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>

            {filteredServices.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No services found matching your criteria.</p>
                </div>
            )}
        </div>
    )
}

export default Services
