import { motion } from 'framer-motion'
import {
    PiBuildingsDuotone,
    PiChartLineDuotone,
    PiUsersDuotone,
    PiClipboardTextDuotone,
    PiCalendarDuotone,
    PiLockKeyDuotone,
} from 'react-icons/pi'
import Button from '@/components/ui/Button'

const features = [
    {
        icon: PiChartLineDuotone,
        title: 'Advanced Analytics',
        description: 'Comprehensive dashboards with real-time insights on service utilization, costs, and performance metrics.',
        status: 'coming-soon',
    },
    {
        icon: PiUsersDuotone,
        title: 'Multi-User Management',
        description: 'Manage multiple users and departments with role-based access control and permissions.',
        status: 'coming-soon',
    },
    {
        icon: PiClipboardTextDuotone,
        title: 'Bulk Service Requests',
        description: 'Submit and manage multiple service requests across different locations simultaneously.',
        status: 'coming-soon',
    },
    {
        icon: PiCalendarDuotone,
        title: 'Preventive Maintenance Scheduling',
        description: 'Automated scheduling and reminders for regular maintenance across all your properties.',
        status: 'coming-soon',
    },
    {
        icon: PiBuildingsDuotone,
        title: 'Multi-Location Support',
        description: 'Centralized management for all your business locations with location-specific reporting.',
        status: 'coming-soon',
    },
    {
        icon: PiLockKeyDuotone,
        title: 'Priority Support',
        description: 'Dedicated account manager and priority response times for all your service needs.',
        status: 'coming-soon',
    },
]

const EnterpriseDashboard = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.div
                className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-16 px-8 mb-12 rounded-2xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="absolute inset-0 bg-[url('/img/pattern.svg')] opacity-10" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <PiBuildingsDuotone className="w-5 h-5" />
                        Enterprise Solutions
                    </motion.div>
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        Enterprise Dashboard
                    </motion.h1>
                    <motion.p
                        className="text-xl text-purple-100 mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Powerful tools for business partners to manage services at scale.
                        Coming soon with advanced features tailored for enterprise needs.
                    </motion.p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button
                            variant="solid"
                            className="bg-white text-purple-600 hover:bg-purple-50"
                        >
                            Join Waitlist
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Features Grid */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Upcoming Enterprise Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="absolute top-4 right-4">
                                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-xs font-medium rounded">
                                    Coming Soon
                                </span>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <motion.div
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Interested in Enterprise Solutions?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                    Contact our business team to learn more about custom solutions for your organization.
                    We offer tailored packages for businesses of all sizes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="solid">
                        Contact Sales
                    </Button>
                    <Button variant="default">
                        Schedule a Demo
                    </Button>
                </div>
            </motion.div>

            {/* Integration Preview */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Future Integrations
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['PayPal SDK', 'Mercado Libre API', 'Stripe', 'QuickBooks'].map((integration, index) => (
                        <motion.div
                            key={integration}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mx-auto mb-3 flex items-center justify-center">
                                <PiLockKeyDuotone className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="font-medium text-gray-900 dark:text-white">{integration}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Coming Soon</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EnterpriseDashboard
