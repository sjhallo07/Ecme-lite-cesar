import { motion } from 'framer-motion'
import {
    PiShieldCheckDuotone,
    PiUsersDuotone,
    PiClockDuotone,
    PiThumbsUpDuotone,
    PiLinkedinLogoDuotone,
    PiTwitterLogoDuotone,
} from 'react-icons/pi'

const values = [
    {
        icon: PiShieldCheckDuotone,
        title: 'Quality Guaranteed',
        description: 'All our services come with a satisfaction guarantee and warranty coverage.',
    },
    {
        icon: PiUsersDuotone,
        title: 'Expert Technicians',
        description: 'Our team consists of certified professionals with years of experience.',
    },
    {
        icon: PiClockDuotone,
        title: '24/7 Support',
        description: 'Round-the-clock customer support for emergencies and inquiries.',
    },
    {
        icon: PiThumbsUpDuotone,
        title: 'Fair Pricing',
        description: 'Transparent pricing with no hidden fees. Get quotes before any work begins.',
    },
]

const team = [
    {
        name: 'Michael Torres',
        role: 'CEO & Founder',
        bio: '20+ years in the repair and maintenance industry',
    },
    {
        name: 'Sarah Chen',
        role: 'Operations Director',
        bio: 'Expert in service optimization and quality assurance',
    },
    {
        name: 'David Rodriguez',
        role: 'Technical Lead',
        bio: 'Master electrician with industrial expertise',
    },
    {
        name: 'Emily Johnson',
        role: 'Customer Success Manager',
        bio: 'Dedicated to ensuring exceptional customer experiences',
    },
]

const AboutUs = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.div
                className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 px-6 mb-12 rounded-2xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="absolute inset-0 bg-[url('/img/pattern.svg')] opacity-10" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        About RepairPro
                    </motion.h1>
                    <motion.p
                        className="text-xl text-blue-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Your trusted partner for professional repair services, installation, and parts supply since 2010.
                    </motion.p>
                </div>
            </motion.div>

            {/* Our Story */}
            <div className="max-w-4xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Our Story
                    </h2>
                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
                            RepairPro was founded with a simple mission: to provide reliable, high-quality repair and maintenance services to homes and businesses. What started as a small team of dedicated technicians has grown into a comprehensive service network covering multiple cities.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
                            We specialize in electrical fencing installation, surveillance systems, painting services, air conditioning repair and installation, and preventive maintenance programs. Our commitment to excellence and customer satisfaction has earned us the trust of thousands of clients.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            Today, we continue to expand our services while maintaining the personal touch and attention to detail that our customers have come to expect.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Our Values */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Our Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <value.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {value.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
                    <div>
                        <div className="text-4xl font-bold mb-2">10K+</div>
                        <div className="text-blue-200">Happy Customers</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">50+</div>
                        <div className="text-blue-200">Expert Technicians</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">15+</div>
                        <div className="text-blue-200">Years Experience</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">98%</div>
                        <div className="text-blue-200">Satisfaction Rate</div>
                    </div>
                </div>
            </div>

            {/* Team */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Our Leadership Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {member.name}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
                                {member.role}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {member.bio}
                            </p>
                            <div className="flex justify-center gap-3 mt-4">
                                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                                    <PiLinkedinLogoDuotone className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    <PiTwitterLogoDuotone className="w-5 h-5" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutUs
